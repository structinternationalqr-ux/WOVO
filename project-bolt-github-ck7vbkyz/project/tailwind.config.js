/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0A',
        charcoal: '#121212',
        slate: '#1A1A1A',
        graphite: '#2A2A2A',
        gunmetal: '#3A3A3A',
        silver: '#D8D8D8',
        platinum: '#F2F2F2',
        accent: '#B8B8B8',
        'accent-dim': 'rgba(160, 160, 160, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metallic': 'linear-gradient(135deg, #2A2A2A 0%, #3A3A3A 50%, #2A2A2A 100%)',
        'glow': 'linear-gradient(90deg, transparent, rgba(160, 160, 160, 0.15), transparent)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(160, 160, 160, 0.2)',
        'glow': '0 0 20px rgba(160, 160, 160, 0.3)',
        'glow-lg': '0 0 40px rgba(160, 160, 160, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(160, 160, 160, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scroll': 'scroll 20s linear infinite',
        'blob': 'blob 7s infinite',
        'tilt': 'tilt 10s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      },
    },
  },
  plugins: [],
};
