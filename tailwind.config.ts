import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#6f00be",
        "surface-container-low": "#1d1a23",
        "on-secondary-fixed-variant": "#6900b3",
        "surface-bright": "#3c3741",
        "on-tertiary-fixed-variant": "#584400",
        "on-secondary-fixed": "#2c0051",
        "tertiary-container": "#d0a61e",
        "inverse-surface": "#e8e0ec",
        "primary-fixed": "#ffd9e0",
        "tertiary-fixed": "#ffe08f",
        "on-tertiary-fixed": "#241a00",
        "secondary-fixed-dim": "#ddb7ff",
        "tertiary-fixed-dim": "#eec13c",
        "secondary-fixed": "#f0dbff",
        "primary": "#ffb1c3",
        "tertiary": "#eec13c",
        "surface-dim": "#15121a",
        "secondary": "#ddb7ff",
        "error-container": "#93000a",
        "on-background": "#e8e0ec",
        "surface-tint": "#ffb1c3",
        "on-primary": "#66002d",
        "on-surface-variant": "#e0bec4",
        "surface": "#15121a",
        "on-secondary-container": "#d6a9ff",
        "surface-container-high": "#2c2831",
        "on-secondary": "#490080",
        "on-error": "#690005",
        "on-surface": "#e8e0ec",
        "inverse-on-surface": "#332f38",
        "on-error-container": "#ffdad6",
        "inverse-primary": "#b80f58",
        "surface-container-lowest": "#100d15",
        "on-primary-container": "#5c0027",
        "primary-fixed-dim": "#ffb1c3",
        "on-primary-fixed-variant": "#8f0042",
        "background": "#15121a",
        "primary-container": "#ff4f8b",
        "on-tertiary": "#3d2e00",
        "error": "#ffb4ab",
        "surface-variant": "#37333c",
        "surface-container-highest": "#37333c",
        "outline-variant": "#594045",
        "outline": "#a8898f",
        "on-primary-fixed": "#3f0019",
        "on-tertiary-container": "#4f3d00",
        "surface-container": "#221e27"
      },
      fontFamily: {
        "headline": ["Newsreader", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
