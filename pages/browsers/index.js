import React from 'react'
import { BrowserControl } from '../../page-components/Browser'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const SessionPage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={3}>
                    <Navbar initialState={'Browser'} /></Grid.Col>
                <Grid.Col xs={9}>
                    <BrowserControl />
                </Grid.Col>
            </Grid>
        </>

    )
}

export default SessionPage