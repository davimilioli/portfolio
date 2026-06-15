import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    /* config options here */
};

const withMDX = createMDX({
    options: {},
})

export default withMDX(nextConfig)