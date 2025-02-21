import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    env: {},

    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'en'
    }
};

// const sentryConfig = {
//     org: "silentcreation",
//     project: "qubex",
//     silent: !process.env.CI,
//     widenClientFileUpload: true,
//     reactComponentAnnotation: {
//         enabled: true,
//     },
//     tunnelRoute: "/monitoring",
//     hideSourceMaps: true,
//     disableLogger: true,
//     automaticVercelMonitors: true,
// };

const combinedConfig = withNextIntl(nextConfig);
export default combinedConfig;