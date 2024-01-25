/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// experimental: {
	// 	appDir: true,
	// },
	env: {
		// API_URL: 'http://localhost:3003/',
		API_URL: 'https://api.vibeground.com/',
	},
	images: {
		domains: ['localhost', 'res.cloudinary.com', 'https:/res.cloudinary.com'],
	},
};

module.exports = nextConfig;
