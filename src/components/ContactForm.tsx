"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type ContactFormState = "idle" | "sending" | "success" | "error";

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFields: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type ContactFormProps = {
  recipientEmail: string;
};

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [status, setStatus] = useState<ContactFormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("Sending your message...");

    if (!accessKey) {
      setStatus("error");
      setStatusMessage(
        `Message delivery is not configured yet. Please email ${recipientEmail} directly.`
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: fields.message,
          to: recipientEmail,
          from_name: "Shri Portfolio Contact Form"
        })
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to send message.");
      }

      setFields(initialFields);
      setStatus("success");
      setStatusMessage("Message sent successfully. Thank you for reaching out.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? `Message was not sent: ${error.message}`
          : "Message was not sent. Please try again or email directly."
      );
    }
  }

  return (
    <form className="panel grid gap-4 p-5 sm:p-6" onSubmit={handleSubmit} noValidate={false}>
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-ink-900">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="input-light"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="input-light"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium text-ink-900">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          value={fields.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="input-light"
          placeholder="Opportunity, project, or collaboration"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink-900">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="input-light min-h-36 resize-y"
          placeholder="Tell me what you would like to build."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} aria-hidden="true" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      <p
        className={status === "error" ? "text-sm text-red-700" : "text-sm text-slate-600"}
        aria-live="polite"
        role="status"
      >
        {statusMessage || "Form delivery uses Web3Forms when the environment key is configured."}
      </p>
    </form>
  );
}
