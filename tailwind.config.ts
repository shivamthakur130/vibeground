import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				PoppinsBlack: ['Poppins-Black'],
				PoppinsBold: ['Poppins-Bold'],
				PoppinsSemiBold: ['Poppins-SemiBold'],
				PoppinsMedium: ['Poppins-Medium'],
				PoppinsRegular: ['Poppins-Regular'],
			},
			fontSize: {
				'13px': '13px',
				'15px': '15px',
				'21px': '21px',
				'22px': '22px',
				'75px': '75px',
			},
			colors: {
				'303030': '#303030',
				'3d3d3d': '#3d3d3d',
				'151515': '#151515',
				'2f2f2f': '#2f2f2f',
				'111': '#111',
				'888': '#888',
				'656565': '#656565',
				'9e9e9e': '#9e9e9e',
			}
		},
	},
	plugins: [],
};
export default config;
