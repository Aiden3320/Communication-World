import React from 'react'
import { createStyles, Container, Group, ActionIcon, Footer, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useSession } from 'next-auth/react';
const useStyles = createStyles((theme) => ({
    container: {
        position: 'absoulte',
        left: '200px',
        margin: '10px,10px,10px,10px',
    },
}));
const SessionControl = () => {
    const { data: session, status } = useSession();

    const { classes } = useStyles();
    const handleCreateNewSession = () => {

    }
    return (
        <div className={classes.container}>
            <Button rightIcon={<IconPlus size={18} stroke={1.5} onClick={handleCreateNewSession} />} color="green" pr={12}>
                Create New
            </Button>

        </div>
    )
}

export default SessionControl