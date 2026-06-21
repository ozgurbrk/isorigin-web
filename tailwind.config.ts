import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0a0a0b",
          800: "#121214",
          700: "#1a1a1e",
          600: "#26262c",
        },
        gold: {
          300: "#f5d98b",
          400: "#e9c46a",
          500: "#d4a92c",
          600: "#b8860b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(8vw, 6vh) scale(1.15)" },
          "66%": { transform: "translate(-6vw, 10vh) scale(0.9)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-10vw, -8vh) scale(1.2)" },
        },
        float3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(10vw, -6vh) scale(1.1)" },
          "75%": { transform: "translate(-4vw, 8vh) scale(0.95)" },
        },
        auroraShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gridDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 -48px" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 1.6s ease-in-out infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
        float1: "float1 22s ease-in-out infinite",
        float2: "float2 26s ease-in-out infinite",
        float3: "float3 30s ease-in-out infinite",
        auroraShift: "auroraShift 18s ease-in-out infinite",
        gridDrift: "gridDrift 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
