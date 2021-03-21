const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const env = require('dotenv');

env.config();
const key = process.env.KEY;

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        console.log(id)
        const url = `https://api.twitch.tv/helix/users/follows?first=1&from_id=${id}`
        await fetch(url, {
            method: 'POST',
            body: {
                "hub.callback": '',
                'hub.mode': '',
                'hub.topic': '',
                'hub.lease_seconds': '',
                'hub.secret': ''
            }
        })
            .then(response => {
                console.log('first then: '+response)
                return response.json()
            })
            .then(data => {
                res.status(200).send(data)
                console.log('second then: '+data)
            })
            .catch(error => {
                console.log('cath err: '+error)
                console.log(error)
                res.status(404).send(error)
            })
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;