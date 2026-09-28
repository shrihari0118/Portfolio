import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import WebSocket from "ws";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3100";
const browserPort = process.env.SMOKE_BROWSER_PORT
  ? Number(process.env.SMOKE_BROWSER_PORT)
  : 9300 + Math.floor(Math.random() * 700);
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browserPath = existsSync(chromePath) ? chromePath : edgePath;

assert.ok(existsSync(browserPath), "No local Edge or Chrome executable found for runtime smoke test.");

await assertHttpOk(baseUrl);
await assertHttpStatus(`${baseUrl}/projects/invalid-project`, 404);

const userDataDir = mkdtempSync(join(tmpdir(), "shri-portfolio-smoke-"));
const browser = spawn(browserPath, [
  "--headless",
  `--remote-debugging-port=${browserPort}`,
  `--user-data-dir=${userDataDir}`,
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-allow-origins=*",
  "about:blank"
], {
  stdio: "ignore"
});

try {
  const browserInfo = await waitForBrowser(browserPort);
  const browserCdp = await connectCdp(browserInfo.webSocketDebuggerUrl);
  const { targetId } = await browserCdp.send("Target.createTarget", { url: "about:blank" });
  const pageInfo = await findPageTarget(browserPort, targetId);
  const cdp = await connectCdp(pageInfo.webSocketDebuggerUrl);

  const widths = [320, 375, 425, 768, 1024, 1280, 1440, 1920];
  for (const width of widths) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: width < 768
    });
    await navigate(cdp, `${baseUrl}/`);
    const result = await evaluate(cdp, pageAuditExpression(width));
    assert.equal(result.missingIds.length, 0, `Missing section ids at ${width}px: ${result.missingIds.join(", ")}`);
    assert.equal(result.invalidAnchors.length, 0, `Invalid nav anchors at ${width}px: ${result.invalidAnchors.join(", ")}`);
    assert.ok(result.scrollWidth <= result.clientWidth + 1, `Horizontal overflow at ${width}px: ${result.scrollWidth} > ${result.clientWidth}`);
    assert.ok(result.heroNameFits, `Hero name overflows viewport at ${width}px`);
    assert.ok(result.heroPanelFits, `Hero panel overflows viewport at ${width}px`);
    assert.equal(result.heroPortraitAlt, "Shri Harihara Suthan M", `Hero portrait alt text missing at ${width}px`);
    assert.equal(result.heroPortraitLoaded, true, `Hero portrait did not load as a valid image at ${width}px`);
    assert.ok(result.heroPortraitWidth > 0 && result.heroPortraitWidth <= 430, `Hero portrait width is out of range at ${width}px: ${result.heroPortraitWidth}`);
    assert.equal(result.requiredProjectCards, 3, `Expected 3 project cards at ${width}px`);
    assert.ok(result.contactSingleColumn || width >= 1024, `Contact should stack before desktop at ${width}px`);
  }

  const routeContracts = [
    {
      path: "/projects/ai-personal-study-assistant",
      title: "AI Personal Study Assistant",
      github: "https://github.com/shrihari0118/AI-PERSONAL-STUDY-ASSISTANT",
      liveDisabled: true,
      githubDisabled: false
    },
    {
      path: "/projects/tripzy-ai-trip-planner",
      title: "Tripzy - AI Trip Planner",
      github: "https://github.com/shrihari0118/TRIPZY-AI",
      liveDisabled: true,
      githubDisabled: false
    },
    {
      path: "/projects/forest-fire-prediction",
      title: "Forest Fire Prediction & Simulation",
      github: "",
      liveDisabled: true,
      githubDisabled: true
    }
  ];

  for (const route of routeContracts) {
    await assertHttpOk(`${baseUrl}${route.path}`);
    await navigate(cdp, `${baseUrl}${route.path}`);
    const detailAudit = await evaluate(cdp, detailAuditExpression());
    assert.equal(detailAudit.title, route.title, `Wrong title at ${route.path}`);
    assert.equal(detailAudit.backLink, "/#projects", `Back link should target /#projects at ${route.path}`);
    assert.equal(detailAudit.hasWorkflowItems, true, `Workflow panel missing items at ${route.path}`);
    assert.equal(detailAudit.hasSummary, true, `Project summary missing at ${route.path}`);
    assert.equal(detailAudit.liveDisabled, route.liveDisabled, `Live Website disabled state mismatch at ${route.path}`);
    assert.equal(detailAudit.githubDisabled, route.githubDisabled, `GitHub disabled state mismatch at ${route.path}`);
    if (route.github) {
      assert.equal(detailAudit.githubHref, route.github, `GitHub href mismatch at ${route.path}`);
    } else {
      assert.equal(detailAudit.githubHref, "", `Empty GitHub project should not expose a fallback href at ${route.path}`);
    }
    assert.ok(detailAudit.scrollWidth <= detailAudit.clientWidth + 1, `Project detail overflow at ${route.path}`);
  }

  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: true
  });
  await navigate(cdp, `${baseUrl}/`);
  const mobileMenu = await evaluate(cdp, `(async () => {
    const button = document.querySelector('button[aria-controls="mobile-navigation"]');
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 80));
    const opened = button.getAttribute('aria-expanded') === 'true';
    document.querySelector('#mobile-navigation a[href="#about"]').click();
    await new Promise((resolve) => setTimeout(resolve, 80));
    const closed = button.getAttribute('aria-expanded') === 'false';
    return { opened, closed, hash: window.location.hash };
  })()`);
  assert.deepEqual(mobileMenu, { opened: true, closed: true, hash: "#about" }, "Mobile menu did not open, navigate, and close correctly.");

  await navigate(cdp, `${baseUrl}/`);
  const interactionAudit = await evaluate(cdp, `(() => {
    const firstProject = document.querySelector('a[href="/projects/ai-personal-study-assistant"]');
    const tripzyProject = document.querySelector('a[href="/projects/tripzy-ai-trip-planner"]');
    const fireProject = document.querySelector('a[href="/projects/forest-fire-prediction"]');
    const githubLinks = [...document.querySelectorAll('a[target="_blank"]')].map((link) => link.href);
    const disabledButtons = [...document.querySelectorAll('button[aria-disabled="true"]')].map((button) => button.textContent.trim());
    const githubNestedInCard = [...document.querySelectorAll('a[href*="github.com/shrihari0118"]')].some((link) => link.closest('a[href^="/projects/"]'));
    return {
      firstProject: firstProject?.getAttribute('href'),
      tripzyProject: tripzyProject?.getAttribute('href'),
      fireProject: fireProject?.getAttribute('href'),
      hasMailto: Boolean(document.querySelector('a[href="mailto:shrihari.m2006@gmail.com"]')),
      hasLinkedIn: githubLinks.includes('https://www.linkedin.com/in/shri-harihara-suthan-2423b8282/'),
      hasGitHubProfile: githubLinks.includes('https://github.com/shrihari0118'),
      hasStudyRepo: githubLinks.includes('https://github.com/shrihari0118/AI-PERSONAL-STUDY-ASSISTANT'),
      hasTripzyRepo: githubLinks.includes('https://github.com/shrihari0118/TRIPZY-AI'),
      forestDisabled: disabledButtons.includes('GitHub unavailable'),
      certificatesDisabled: disabledButtons.filter((text) => text === 'View Certificate').length,
      githubNestedInCard
    };
  })()`);
  assert.equal(interactionAudit.firstProject, "/projects/ai-personal-study-assistant");
  assert.equal(interactionAudit.tripzyProject, "/projects/tripzy-ai-trip-planner");
  assert.equal(interactionAudit.fireProject, "/projects/forest-fire-prediction");
  assert.equal(interactionAudit.hasMailto, true);
  assert.equal(interactionAudit.hasLinkedIn, true);
  assert.equal(interactionAudit.hasGitHubProfile, true);
  assert.equal(interactionAudit.hasStudyRepo, true);
  assert.equal(interactionAudit.hasTripzyRepo, true);
  assert.equal(interactionAudit.forestDisabled, true);
  assert.equal(interactionAudit.certificatesDisabled, 3);
  assert.equal(interactionAudit.githubNestedInCard, false, "GitHub links must not be nested inside internal project links.");

  const formAudit = await evaluate(cdp, `(async () => {
    const form = document.querySelector('form');
    const name = document.querySelector('#contact-name');
    const email = document.querySelector('#contact-email');
    const subject = document.querySelector('#contact-subject');
    const message = document.querySelector('#contact-message');
    const button = form.querySelector('button[type="submit"]');
    const setInputValue = (element, value) => {
      const proto = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(element, value);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const emptyInvalid = form.checkValidity() === false;
    setInputValue(email, 'not-an-email');
    const badEmailInvalid = form.checkValidity() === false;
    setInputValue(name, 'Runtime Tester');
    setInputValue(email, 'runtime@example.com');
    setInputValue(subject, 'Smoke test');
    setInputValue(message, 'Please keep this message when provider key is missing.');
    const validBeforeSubmit = form.checkValidity();
    form.requestSubmit();
    await new Promise((resolve) => setTimeout(resolve, 120));
    return {
      emptyInvalid,
      badEmailInvalid,
      validBeforeSubmit,
      protectedDuringSubmission: button.disabled || button.textContent.includes('Send Message'),
      statusText: document.querySelector('[role="status"]').textContent,
      messageValue: message.value
    };
  })()`);
  assert.equal(formAudit.emptyInvalid, true, "Required fields did not invalidate an empty form.");
  assert.equal(formAudit.badEmailInvalid, true, "Invalid email did not fail native validation.");
  assert.equal(formAudit.validBeforeSubmit, true, "Filled form should be valid before provider submission.");
  assert.match(formAudit.statusText, /not configured|not sent/i, "Missing-key/error path was not shown.");
  assert.equal(
    formAudit.messageValue,
    "Please keep this message when provider key is missing.",
    "Failed submission erased the message field."
  );

  await cdp.close();
  await browserCdp.close();
} finally {
  browser.kill();
  await waitForExit(browser);
  rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
}

async function assertHttpOk(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, `${url} did not return HTTP 200`);
}

async function assertHttpStatus(url, status) {
  const response = await fetch(url);
  assert.equal(response.status, status, `${url} did not return HTTP ${status}`);
}

async function waitForBrowser(port) {
  const started = Date.now();
  while (Date.now() - started < 10000) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Timed out waiting for headless browser.");
}

async function waitForExit(child) {
  if (child.exitCode !== null) return;
  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 2000);
    child.once("exit", () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

async function findPageTarget(port, targetId) {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`);
  assert.equal(response.status, 200, "Could not list browser targets.");
  const targets = await response.json();
  const target = targets.find((item) => item.id === targetId);
  assert.ok(target?.webSocketDebuggerUrl, "Could not find page target WebSocket URL.");
  return target;
}

async function connectCdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl, {
    headers: {
      Origin: `http://127.0.0.1:${browserPort}`
    }
  });
  const callbacks = new Map();
  let id = 0;

  socket.on("message", (data) => {
    const raw = readSocketData(data);
    const message = JSON.parse(raw);
    if (message.id && callbacks.has(message.id)) {
      const { resolve, reject } = callbacks.get(message.id);
      callbacks.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });

  socket.on("error", (error) => {
    for (const { reject } of callbacks.values()) {
      reject(error);
    }
    callbacks.clear();
  });

  socket.on("close", (code, reason) => {
    const closeReason = reason?.length ? reason.toString() : "no reason";
    for (const { reject, method } of callbacks.values()) {
      reject(new Error(`CDP WebSocket closed before command completed: ${method}; code ${code}; ${closeReason}`));
    }
    callbacks.clear();
  });

  await new Promise((resolve, reject) => {
    socket.once("open", resolve);
    socket.once("error", reject);
  });

  return {
    send(method, params = {}, sessionId) {
      const messageId = ++id;
      socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
      return new Promise((resolve, reject) => callbacks.set(messageId, { resolve, reject, method }));
    },
    close() {
      socket.close();
    }
  };
}

function readSocketData(data) {
  if (typeof data === "string") return data;
  if (Buffer.isBuffer(data)) return data.toString("utf8");
  if (data instanceof ArrayBuffer) return Buffer.from(data).toString("utf8");
  if (ArrayBuffer.isView(data)) return Buffer.from(data.buffer).toString("utf8");
  return String(data);
}

async function navigate(cdp, url, sessionId) {
  await cdp.send("Page.navigate", { url }, sessionId);
  await new Promise((resolve) => setTimeout(resolve, 450));
}

async function evaluate(cdp, expression, sessionId) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  }, sessionId);

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed.");
  }

  return result.result.value;
}

function pageAuditExpression(width) {
  return `(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'education', 'contact'];
    const missingIds = ids.filter((id) => !document.getElementById(id));
    const invalidAnchors = [...document.querySelectorAll('nav a[href^="#"]')]
      .map((link) => link.getAttribute('href'))
      .filter((href) => !document.querySelector(href));
    const heroName = document.querySelector('h1');
    const heroPanel = document.querySelector('#hero aside');
    const heroPortrait = document.querySelector('#hero img[alt="Shri Harihara Suthan M"]');
    const contact = document.querySelector('#contact > div');
    const contactStyle = getComputedStyle(contact);
    return {
      width: ${width},
      missingIds,
      invalidAnchors,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      heroNameFits: heroName.getBoundingClientRect().right <= document.documentElement.clientWidth + 1,
      heroPanelFits: heroPanel.getBoundingClientRect().right <= document.documentElement.clientWidth + 1,
      heroPortraitAlt: heroPortrait?.getAttribute('alt') ?? '',
      heroPortraitLoaded: Boolean(heroPortrait?.complete && heroPortrait.naturalWidth > 0),
      heroPortraitWidth: heroPortrait?.getBoundingClientRect().width ?? 0,
      requiredProjectCards: document.querySelectorAll('#projects article').length,
      contactSingleColumn: contactStyle.gridTemplateColumns.split(' ').length === 1
    };
  })()`;
}

function detailAuditExpression() {
  return `(() => {
    const githubLink = document.querySelector('a[href^="https://github.com/shrihari0118/"]');
    const githubButton = [...document.querySelectorAll('button[aria-disabled="true"]')]
      .find((button) => button.textContent.includes('GitHub Repository'));
    const liveButton = [...document.querySelectorAll('button[aria-disabled="true"]')]
      .find((button) => button.textContent.includes('Live Website'));
    return {
      title: document.querySelector('h1')?.textContent?.trim() ?? '',
      backLink: document.querySelector('a[href="/#projects"]')?.getAttribute('href') ?? '',
      hasWorkflowItems: document.querySelectorAll('aside div.rounded-lg').length >= 6,
      hasSummary: Boolean(document.querySelector('section p')),
      githubHref: githubLink?.href ?? '',
      githubDisabled: Boolean(githubButton),
      liveDisabled: Boolean(liveButton),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    };
  })()`;
}
