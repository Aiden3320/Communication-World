import connectMongo from '../../../api-lib/mongodb';
import axios from 'axios';
const User = require('../../../api-lib/models/users');
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    await connectMongo();
    let { name, email } = req.body;
    console.log(name, email);
    try {
        let user = await Session.findOne({
            name: name,
            "users.email": `${email}`,
        }).select("embed_url");
        console.log(user);
        if (!user || user.length == 0) {
            res.status(200).send('No Session or Access is Denied');
        }
        else {
            res.status(200).send(user.embed_url);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;