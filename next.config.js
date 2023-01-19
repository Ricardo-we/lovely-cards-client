/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	staticPageGenerationTimeout: 1500,
	pageExtensions: ['page.tsx',  'page.jsx',]
};

module.exports = nextConfig;
