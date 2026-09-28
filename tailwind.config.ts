import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#101828",
          900: "#111827",
          850: "#1F2937",
          800: "#344054",
          700: "#475467"
        },
        signal: {
          cyan: "#0891B2",
          teal: "#0F766E",
          warm: "#B7791F"
        }
      },
      boxShadow: {
        glow: "0 18px 42px rgba(8, 145, 178, 0.14)",
        panel: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      borderRadius: {
        card: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
