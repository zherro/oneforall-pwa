module.exports = {
    apps: [
      {
        name: 'bimo-blog-1',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3000',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'bimo-blog-2',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3001',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  