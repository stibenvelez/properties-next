const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/properties/:offe(^\\(\\?:(?!arriendo|venta).)+$)",
                destination: "/properties/venta",
                permanent: true,
            },
            {
                source: "/properties",
                destination: "/properties/venta",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig


