module.exports = {
  apps: [
    {
      name: 'docs-aporto',
      script: 'npm',
      args: 'run serve',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
