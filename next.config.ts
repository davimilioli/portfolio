import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"]
    /* config options here */
};

const withMDX = createMDX({
    options: {},
})

export default withMDX(nextConfig)