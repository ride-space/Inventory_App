import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { getProviders, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const Signin = ({ providers }: any) => {
  return (
    <>
      {Object.values(providers).map((provider: any) => {
        return (
          <Center key={provider.name} sx={{ height: '100vh', width: '100vw' }}>
            <Stack spacing="xl">
              <Title align="center">Welcome to Inventory App </Title>
              {provider.name === 'Google' && (
                <Button
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
              )}
            </Stack>
          </Center>
        );
      })}
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
