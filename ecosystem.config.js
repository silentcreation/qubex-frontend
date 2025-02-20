module.exports = {
    apps: [
        {
            name: process.env.APP_NAME,
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            cwd: process.env.APP_CWD,
            instances: 1,
            exec_mode: 'fork',
            watch: true,
            watch_delay: 1000,
            ignore_watch: ['node_modules', '.next'],
            env: {
                NODE_ENV: process.env.NODE_ENV || 'development',
            },
        },
    ],
};
