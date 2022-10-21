import React from 'react'
import { Dashboard } from '../page-components/Dashboard'
import { Layout, Navbar } from '../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const DashboardPage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={3}>
                    <Navbar initialState={'Dashboard'} /></Grid.Col>
                <Grid.Col xs={9}> <Dashboard /></Grid.Col>

            </Grid>

        </>

    )
}

export default DashboardPage