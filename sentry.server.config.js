import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://484bf51ff99f4c128a6383591a81c6c9@o1299629.ingest.sentry.io/6533066',
  tracesSampleRate: 1.0,
});
