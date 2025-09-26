module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'DD_FRONT:PROD',
      script: './.output/server/index.mjs',
      port: 3000,
      watch: false,
      ignore_watch: ['./assets'],
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      max_memory_restart: '750M',
    },
    {
      name: 'DD_FRONT:DEV',
      script: './.output/server/index.mjs',
      port: 3001,
      watch: false,
      ignore_watch: ['./assets'],
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      max_memory_restart: '750M',
    },
  ],
};
