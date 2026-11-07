import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        semaforo: {
          verde: "#1FA96B",
          amarillo: "#F0A020",
          rojo: "#E5484D",
        },
      },
    },
  },
  plugins: [],
};

export default config;
