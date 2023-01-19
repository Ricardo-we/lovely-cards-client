/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	staticPageGenerationTimeout: 1500,
	pageExtensions: ['tsx',  'jsx',]
};

module.exports = nextConfig;
