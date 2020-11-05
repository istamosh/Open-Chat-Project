const express = require('express');
const router = express.Router();

// fiddle servers' request and response command on root address
router.get('/', (req, res) => {
    res.send('istacord server is now online.');
});

// then export it to Express' Router function
module.exports = router;