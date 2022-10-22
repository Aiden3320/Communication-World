import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { creator, session_id } = req.body;
    console.log(creator);
    try {
        let user = await Session.findOne({
            creator: creator,
            session_id: session_id,
        }).select('name session_id isActive');
        if (!user || user.length == 0) {
            res.status(200).send('No Session or Access is denied');
        }
        else {

            console.log(user.isActive);
            res.status(200).send({ user });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;