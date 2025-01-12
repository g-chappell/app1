import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config: Configuration) => {
        // Enable WebAssembly experiments
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
            layers: true,
        };

        // Ensure .wasm files are correctly processed
        if (config.module?.rules) {
            config.module.rules.push({
                test: /\.wasm$/,
                type: "webassembly/async", // Ensure async WebAssembly processing
            });
        }

        return config;
    },
};

export default nextConfig;

