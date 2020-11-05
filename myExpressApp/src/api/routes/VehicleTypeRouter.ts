const router = require('express').Router();

router.post('/create', (req, res) => {
    res.send('Created');
});

module.exports = router;