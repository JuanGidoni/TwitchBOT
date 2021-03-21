const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const env = require('dotenv');

env.config();
const key = process.env.KEY;

router.post('/follower', async (req, res) => {
    try {
            res.status(200).send(console.log(req.body)).end()
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;