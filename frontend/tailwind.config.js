/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode via class strategy
    theme: {
        extend: {
            colors: {
                // Minimalist Saffron Palette
                saffron: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c', // Primary
                    500: '#f97316',
                    600: '#ea580c', // Darker
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                sand: {
                    50: '#fdfbf7', // Warm white background
                    100: '#f7f3e8',
                    200: '#efe5d0',
                },
                charcoal: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937', // Dark text
                    900: '#111827', // Dark background
                    950: '#030712', // True black
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'], // For verses
                devanagari: ['Noto Sans Devanagari', 'Mangal', 'serif'], // For Sanskrit
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 15px rgba(251, 146, 60, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
