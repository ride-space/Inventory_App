import { Center, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: ReactNode }): any => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (router.pathname != '/auth/signin') {
        // 下記だとエラーになる
        // router.push('/auth/signin');
        // トップページに戻る
        signIn();
      }
    }
  }, [router, status]);
  if (status === 'loading') {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }
  if (status === 'authenticated') {
    return children;
  }
};
