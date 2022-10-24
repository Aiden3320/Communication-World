import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Image, Button, NavLink, Avatar } from '@mantine/core';
import {
    IconDatabaseImport,
    IconLogout,
    IconUserPlus,
    IconScreenShare,
    IconDashboard,
    IconShare,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});

const data = [
    { link: './dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: './sessions', label: 'Sessions', icon: IconDatabaseImport },
    { link: '', label: 'User Manage', icon: IconUserPlus },
    { link: '', label: 'Browsers', icon: IconScreenShare },
    // { link: '', label: 'Sessions', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function UserMenu({ initialState }) {

    const { classes, cx } = useStyles();
    const [active, setActive] = useState(initialState);
    const { data: session, status } = useSession()

    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('./')
        }
    }, [status]);
    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}

        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a >
    ));

    return (
        <Navbar height={'100vh'} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Image alt="" src="/logo/Group_157.png" width={70} height={50} />
                    <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
                </Group>
                <NavLink
                    component='a'
                    label="Dashboard"
                    description="Additional information"
                    href='/dashboard'
                    active={active == 'dashboard' ? true : false}
                    icon={
                        <IconDashboard size="35" variant="filled" color="red">
                        </IconDashboard>
                    }
                />
                <NavLink
                    component='a'
                    label="Session"
                    description="Additional information"
                    href='/sessions'
                    active={active == 'sessions' ? true : false}
                    icon={
                        <IconDatabaseImport size="35" variant="filled" color="red">
                        </IconDatabaseImport>
                    }
                />
                <NavLink
                    component='a'
                    label="Browser"
                    description="Additional information"
                    href='/browsers'
                    active={active == 'browsers' ? true : false}
                    icon={
                        <IconScreenShare size="35" variant="filled" color="red">
                        </IconScreenShare>
                    }
                />
                <NavLink
                    component='a'
                    label="Launch"
                    description="Additional information"
                    href='/share'
                    active={active == 'share' ? true : false}
                    icon={
                        <IconShare size="35" variant="filled" color="red">
                        </IconShare>
                    }
                />
                <NavLink
                    component='a'
                    label="UserManagement"
                    description="Additional information"
                    href='/user'
                    active={active == 'user' ? true : false}
                    icon={
                        <IconUserPlus size="35" variant="filled" color="red">
                        </IconUserPlus>
                    }
                />
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a> */}
                <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); signOut({ callbackUrl: 'http://localhost:3000/' }); }}>
                    {session && <Avatar src={session.user.image} alt={session.user.name} style={{ marginRight: "10px" }} />}
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}