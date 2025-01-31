'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { loginUserService } from '@/services/auth-service';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export async function loginUserAction({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) {
  const responseData = await loginUserService({ identifier, password });

  if (!responseData) {
    return {
      strapiErrors: responseData.error,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
      message: 'Failed to Login.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', responseData.jwt, config);
  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}
