const express = require('express');
const app = express();
app.use(express.json());
const Owner = require('./models/Owners.js')

app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ greeting: 'TESTING TESTING TESTING' });
    } catch (e) {
        res.status(500).text(e.message);
    }
})

app.post('/owner', async (req, res) => {
    try {
        res.status(200).json(await Owner.insert(req.body));
    } catch (e) {
        res.status(500).text(e.message);
    }
})

app.get('/owner', async (req, res) => {
    try {
        res.status(200).json(await Owner.find());
    } catch (e) {
        res.status(500).text(e.message);
    }
})

app.put('/owner/:id', async (req, res) => {
    try {
        res.status(200).json(await Owner.update(req.params.id, req.body));
    } catch (e) {
        res.status(500).text(e.message);
    }
})

module.exports = app;