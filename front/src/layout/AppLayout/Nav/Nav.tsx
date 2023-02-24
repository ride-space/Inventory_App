import type { MantineNumberSize } from '@mantine/core';
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Navbar,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { HiBookmarkAlt } from 'react-icons/hi';
import { ImCompass2, ImIcoMoon, ImSun } from 'react-icons/im';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Brand = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Box
      sx={(theme) => {
        return {
          borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
          }`,
          padding: theme.spacing.xs,
          paddingBottom: theme.spacing.lg,
          paddingRight: theme.spacing.xs,
        };
      }}
    >
      <Group position="apart" align="center">
        <Group>
          <ThemeIcon
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            size="lg"
            radius="lg"
          >
            <HiBookmarkAlt size={18} />
          </ThemeIcon>
          <Title
            size={'1.6rem'}
            weight={400}
            sx={(theme) => {
              return {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,
              };
            }}
          >
            Inventory
          </Title>
        </Group>
        <ActionIcon
          variant="default"
          onClick={() => {
            return toggleColorScheme();
          }}
          size={30}
        >
          {colorScheme === 'dark' ? (
            <ImSun size={18} />
          ) : (
            <ImIcoMoon size={18} />
          )}
        </ActionIcon>
      </Group>
    </Box>
  );
};

type MainLinkProps = {
  color: string;
  icon: ReactNode;
  label: string;
  pageLink: string;
  setOpened: (value: boolean) => void;
};

const MainLink = ({
  color,
  icon,
  label,
  pageLink,
  setOpened,
}: MainLinkProps) => {
  const { pathname } = useRouter();
  return (
    <Link href={pageLink} passHref>
      <UnstyledButton
        onClick={() => {
          return setOpened(false);
        }}
        sx={(theme) => {
          return {
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
            backgroundColor:
              pathname === pageLink
                ? theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0]
                : 'transparent',
            borderRadius: theme.radius.xs,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            display: 'block',
            padding: theme.spacing.xs,
            width: '100%',
          };
        }}
      >
        <Group>
          <ThemeIcon color={color} variant={'light'}>
            {icon}
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const data: MainLinkProps[] = [
  {
    color: 'blue',
    icon: <ImCompass2 size={18} />,
    label: 'Home',
    pageLink: '/',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOpened: () => {},
  },
  {
    color: 'teal',
    icon: <ImCompass2 size={18} />,
    label: 'Categories',
    pageLink: '/categories',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOpened: () => {},
  },
  {
    color: 'violet',
    icon: <ImCompass2 size={18} />,
    label: 'Inventory',
    pageLink: '/inventory',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOpened: () => {},
  },
  {
    color: 'grape',
    icon: <ImCompass2 size={18} />,
    label: 'Products',
    pageLink: '/products',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOpened: () => {},
  },
  {
    color: 'oringe',
    icon: <ImCompass2 size={18} />,
    label: 'Settings',
    pageLink: '/setting',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setOpened: () => {},
  },
];

const getWordInitials = (word: string) => {
  const bits = word.trim().split(' ');
  return bits
    .map((bit) => {
      return bit.charAt(0);
    })
    .join('')
    .toUpperCase();
};

const User = () => {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const { pathname } = useRouter();
  return (
    <Link passHref href={pathname === '/settings' ? '/' : '/settings'}>
      <Box
        sx={{
          borderTop: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
          paddingTop: theme.spacing.sm,
        }}
      >
        <UnstyledButton
          sx={{
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            display: 'block',
            padding: theme.spacing.xs,
            width: '100%',
          }}
        >
          <Group>
            <Avatar
              src={session?.user?.image}
              radius="xl"
              color="blue"
              variant="light"
            >
              {getWordInitials(session?.user?.name ?? '')}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {session?.user?.name}
              </Text>
              <Text color="dimmed" size="xs">
                {session?.user?.email}
              </Text>
            </Box>
            {pathname === '/settings' ? (
              <MdChevronLeft size={18} />
            ) : (
              <MdChevronRight size={18} />
            )}
          </Group>
        </UnstyledButton>
      </Box>
    </Link>
  );
};

export const Nav = ({
  hiddenBreakpoint,
  opened,
  setOpened,
}: {
  hiddenBreakpoint: MantineNumberSize;
  opened: boolean;
  setOpened: (value: boolean) => void;
}) => {
  return (
    <Navbar
      p="xs"
      width={{ sm: 300 }}
      hiddenBreakpoint={hiddenBreakpoint}
      hidden={opened}
    >
      <Navbar.Section>
        <Brand />
      </Navbar.Section>
      <Navbar.Section>
        {data.map((item, index) => {
          return <MainLink {...item} setOpened={setOpened} key={index} />;
        })}
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};
