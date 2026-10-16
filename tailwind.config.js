/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f4f4f5',
          card: 'rgba(255, 255, 255, 0.85)',
        },
        neon: {
          orange: '#ff6b00',
          orangeLight: '#ff8c38',
          amber: '#f59e0b',
          amberLight: '#fbbf24',
          purple: '#a855f7',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          cyanLight: '#22d3ee',
          emerald: '#10b981',
          emeraldLight: '#34d399',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Inter Tight"', 'Geist', '"Plus Jakarta Sans"', '"Neue Haas Grotesk"', '"Helvetica Neue"', '-apple-system', 'sans-serif'],
        display: ['"Inter Tight"', 'Geist', '"Plus Jakarta Sans"', '"Neue Haas Grotesk"', '"Helvetica Neue"', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-pattern': "radial-gradient(rgba(249, 115, 22, 0.12) 1px, transparent 1px)",
        'glow-orange': 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
