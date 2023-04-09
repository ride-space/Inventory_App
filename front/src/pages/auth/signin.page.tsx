import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import type { InferGetServerSidePropsType } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const Signin = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Center sx={{ height: '100vh', width: '100vw' }}>
        <Stack spacing={4}>
          <Title align="center">Welcome to Inventory App </Title>
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <Button
                  key={provider.name}
                  onClick={() => {
                    return signIn(provider.id);
                  }}
                  size="lg"
                  sx={{ alignSelf: 'center' }}
                >
                  <Group>
                    <Text>Sign In {provider.name}</Text>
                    <FaGoogle />
                  </Group>
                </Button>
              );
            })}
        </Stack>
      </Center>
    </>
  );
};

export default Signin;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
