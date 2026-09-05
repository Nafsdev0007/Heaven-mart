export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        brand: {
          dark: '#173332',
          footer: '#102826',
          gold: '#B49A67',
          cream: '#F4F0E8',
          'cream-light': '#F4F1EA',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        fenix: ['Fenix', 'serif'],
      }
    },
  },
  plugins: [],
}
