/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC', 'cursive'],
        doto: ['Doto', 'sans-serif'],
        indie: ['Indie Flower', 'cursive'],
        lato: ['Lato', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        // Subtle Professional Gradients
        'professional-gradient': 'linear-gradient(to right, #f4f7f6 0%, #f1f4f3 100%)',
        'calm-sky-gradient': 'linear-gradient(to right, #e6f2ff 0%, #f0f9ff 100%)',
        
        // Soft Technological Gradients
        'tech-mist-gradient': 'linear-gradient(to right, #f0f4fc 0%, #f5f9ff 100%)',
        'digital-whisper-gradient': 'linear-gradient(to right, #f3f6fb 0%, #e9edf4 100%)',
        
        // Creative Subtle Gradients
        'pastel-horizon-gradient': 'linear-gradient(to right, #f0e6ff 0%, #e6f3ff 100%)',
        'soft-lavender-gradient': 'linear-gradient(to right, #f5f0ff 0%, #f0f5ff 100%)',
        
        // Minimalist Color Transitions
        'neutral-wash-gradient': 'linear-gradient(to right, #f6f8f9 0%, #f1f4f6 100%)',
        'cool-breeze-gradient': 'linear-gradient(to right, #e9f1f7 0%, #f4f8fb 100%)',
        
        // Slightly More Vibrant Options
        'soft-azure-gradient': 'linear-gradient(to right, #e6f2fd 0%, #f0f6ff 100%)',
        'gentle-periwinkle-gradient': 'linear-gradient(to right, #f0e6fc 0%, #e6eaff 100%)',
        
        // Sophisticated Minimal Gradients
        'slate-whisper-gradient': 'linear-gradient(to right, #f7f8f9 0%, #f1f3f5 100%)',
        'cloud-soft-gradient': 'linear-gradient(to right, #f4f6f7 0%, #eef1f3 100%)',
        
        // Nature-Inspired Subtle Gradients
        'morning-mist-gradient': 'linear-gradient(to right, #f0f4f2 0%, #f5f9f6 100%)',
        'seafoam-subtle-gradient': 'linear-gradient(to right, #e9f4f0 0%, #f4f9f5 100%)',

        // darker gradients incase i switch

        // Dark general
        'midnight-slate-gradient': 'linear-gradient(to right, #1e293b 0%, #334155 100%)', // Dark blue-gray
        'deep-navy-gradient': 'linear-gradient(to right, #0f172a 0%, #1e293b 100%)', // Almost black to dark blue
        'charcoal-gradient': 'linear-gradient(to right, #2c3e50 0%, #3498db 10%)', // Dark charcoal with subtle blue accent
        'dark-ocean-gradient': 'linear-gradient(to right, #1a2980 0%, #26d0ce 100%)', // Deep blue to teal
        
        // Softer Dark Gradients
        'soft-dark-gradient': 'linear-gradient(to right, #2c3e50 0%, #3f4f5f 100%)', // Muted dark blue-gray
        'twilight-gradient': 'linear-gradient(to right, #34495e 0%, #2c3e50 100%)', // Dark slate variations
        'deep-space-gradient': 'linear-gradient(to right, #000c40 0%, #607d8b 100%)', // Very dark blue to slate gray
        
        // Dark with Subtle Color Hints
        'night-sky-gradient': 'linear-gradient(to right, #1f2937 0%, #111827 100%)', // Dark gray to almost black
        'deep-indigo-gradient': 'linear-gradient(to right, #312e81 0%, #1e1b4b 100%)', // Rich indigo tones
        'dark-slate-gradient': 'linear-gradient(to right, #0f172a 0%, #1e2841 100%)' // Dark slate blue variations

      }

    },
  },
  plugins: [],
}
