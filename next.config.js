/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		// API_URL: 'http://localhost:3003/',
		API_URL: 'https://api.vibeground.com/',
	},
	images: {
		domains: ['localhost', 'res.cloudinary.com'],
	},
};

module.exports = nextConfig;
