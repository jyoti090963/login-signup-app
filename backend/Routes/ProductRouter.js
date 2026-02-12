const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../Middlewares/Auth'); // path check karo

router.get('/', ensureAuthenticated, (req, res) => {
    res.json({ message: "Products route working" });
});

module.exports = router;
