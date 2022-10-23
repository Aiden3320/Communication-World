import React from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const SessionPage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={3}>
                    <Navbar initialState={'Sessions'} /></Grid.Col>
                <Grid.Col xs={9}>
                    <SessionControl />
                </Grid.Col>
            </Grid>
        </>

    )
}

export default SessionPage