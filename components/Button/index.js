import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon, DiscordIcon, TwitterIcon } from '@mantine/ds';
import Image from 'next/image'
// import { FacebookIcon } from './FacebookIcon';

export function GoogleButton(props) {
    return <Button leftIcon={<Image src="/GoogleIcon.svg" alt="" width={20} height={20} />} variant="outline" color="black" {...props} />;
}
export function DiscordButton(props) {
    return (
        <Button
            leftIcon={<DiscordIcon size={16} />}
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.fn.lighten('#5865F2', 0.05)
                            : theme.fn.darken('#5865F2', 0.05),
                },
            })}
            {...props}
        />
    );
}

export function GithubButton(props) {
    return (
        <Button
            {...props}
            leftIcon={<GithubIcon size={16} />}
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                },
            })}
        />
    );
}

// export function SocialButtons() {
//     return (
//         <Group position="center" sx={{ padding: 15 }}>
//             <GoogleButton>Continue with Google</GoogleButton>
//             <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
//                 Follow on Twitter
//             </TwitterButton>
//             <FacebookButton>Sign in with Facebook</FacebookButton>
//             <GithubButton>Login with GitHub</GithubButton>
//             <DiscordButton>Join Discord community</DiscordButton>
//         </Group>
//     );
// }