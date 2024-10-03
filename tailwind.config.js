/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', ['./src/*.{svelte}']],
	theme: {
		extend: {
			fontFamily: {
				headings: ['"Red Hat Display"'],
				mono: ['"JetBrains Mono"'],
				mont: ['Montserrat']
			},
			keyframes: {
				animatedgradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				}
			},
			backgroundSize: {
				'300%': '300%'
			},
			animation: {
				gradient: 'animatedgradient 6s ease infinite alternate'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['lofi', 'black', 'winter', 'light', 'retro']
	}
};
