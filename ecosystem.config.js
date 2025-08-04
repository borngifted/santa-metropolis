export default {
  apps: [
    {
      name: 'santa-parallax-scroll',
      script: 'npm',
      args: 'run preview',
      cwd: '/Volumes/Jul_23_2025/Updated_Site/santa-metropolis-new-videos-final-package/santa-parallax-scroll',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 4173
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};