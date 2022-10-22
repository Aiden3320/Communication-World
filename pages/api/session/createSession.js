import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')

async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { sessionName, creator } = req.body;
    console.log(sessionName, creator);
    try {
        let user = await User.findOne({ email: creator });
        if (!user) {
            res.status(200).json({ email: 'User Not Exist in the DB' });
        }
        else {
            console.log(process.env.HYPERBEAM_KEY);
            const resp = await axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
                headers: {
                    'Authorization': `Bearer ${process.env.HYPERBEAM_KEY}`
                },
                body: {
                    'profile.save': true,
                }
            })
            let newSession = new Session({
                name: sessionName,
                creator: user.email,
                session_id: resp.data.session_id,
                embed_url: resp.data.embed_url,
                isActive: true,
            });
            await newSession.save();
            res.status(200).json({ newSession });
        }
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');
    }
    // const user = await findUserByEmail(db, email);
    // console.log(user);
    // if (user) {
    //     res.status(200).json({ name: 'Account Exists' })
    // }
    // else {
    //     insertUser(db, {
    //         email: Math.random().toString(36).slice(2) + email,
    //         bio: '',
    //         name: Math.random().toString(36).slice(2) + email,
    //         profilePicture: '',
    //         username: Math.random().toString(36).slice(2) + email,
    //     })
    //     console.log('insert user called');
    //     res.status(200).json({ name: 'Register Account' })
    // }
}

export default handler;