import React from 'react'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { fetcher } from '../../lib/fetcher';
import { LoadingOverlay, Alert, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { Space } from './';
import { ControlPanel } from '../../components/ThreeJS'
export default function ShareScreen() {
    const [browsers, setBrowsers] = useState(null);
    const [isHandling, setIsHandling] = useState(false);
    const loadSession = async () => {
        let data = []
        setIsHandling(true);
        try {

            let session = await getSession();
            console.log("session", session);
            const userData = await fetcher('http://localhost:3000/api/users/getBrowsersByEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                })
            });
            if (userData.browsers) {
                for (const browser of userData.browsers) {
                    let embed_URL = "";
                    if (browser.id) {
                        console.log('AAA', browser.id);
                        const result = await fetcher('http://localhost:3000/api/session/getEmbedUrlByID', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                _id: browser.id,
                                email: session.user.email,
                            })
                        });
                        console.log(result);
                        data = [...data, result.embed_url];
                    }
                    else
                        data = [...data, 'No Session'];
                }
                //            setBrowsers(userData.browsers);
                setBrowsers(data);
            }
        }
        catch (err) {
            console.error(err.message);
        }
        setIsHandling(false);
    }
    useEffect(() => {
        loadSession();
    }, []);
    return (
        <div >
            <LoadingOverlay visible={isHandling} overlayBlur={2} />
            {browsers && browsers.length == 4 ?
                <Space urlData={browsers} /> : <div>Loading </div>}
            <ControlPanel />
        </div >
    )
}
