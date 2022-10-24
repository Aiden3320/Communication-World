import React from 'react'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { fetcher } from '../../lib/fetcher';
export default function ShareScreen() {
    const [browsers, setBrowsers] = useState(null);
    const loadSession = async () => {
        let data = []
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
    }
    useEffect(() => {
        loadSession();
    }, []);
    return (
        <div>
        </div >
    )
}
