import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_URL: z.string().url().min(1),
  },
  client: {
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
  },
});
