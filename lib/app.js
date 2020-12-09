const express = require('express');
const app = express();
app.use(express.json());

app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ greeting: 'TESTING TESTING TESTING' });
    } catch (e) {
        res.status(500).getMaxListeners(e.message);
    }
})

module.exports = app;