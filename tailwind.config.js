/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f4f4f0",
          soft: "#efece5",
        },
        forest: {
          DEFAULT: "#1b4d3e",
          deep: "#143b2f",
        },
        lime: {
          DEFAULT: "#d4e157",
          bright: "#dcec6a",
        },
        ember: {
          DEFAULT: "#bf3b28",
          deep: "#a83220",
        },
        ink: {
          DEFAULT: "#111111",
        },
        // Centralized Admin Semantic Color Tokens
        admin: {
          bg: 'var(--admin-bg)',
          surface: 'var(--admin-surface)',
          'surface-hover': 'var(--admin-surface-hover)',
          card: 'var(--admin-card)',
          input: 'var(--admin-input)',
          'input-subtle': 'var(--admin-input-subtle)',
          border: 'var(--admin-border)',
          'border-strong': 'var(--admin-border-strong)',
          text: 'var(--admin-text)',
          muted: 'var(--admin-muted)',
          subtle: 'var(--admin-subtle)',
          primary: 'var(--admin-primary)',
          'primary-hover': 'var(--admin-primary-hover)',
          'primary-fg': 'var(--admin-primary-fg)',
          accent: 'var(--admin-accent)',
          'accent-fg': 'var(--admin-accent-fg)',
          'badge-bg': 'var(--admin-badge-bg)',
          'badge-text': 'var(--admin-badge-text)',
          'badge-border': 'var(--admin-badge-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spinSlow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
