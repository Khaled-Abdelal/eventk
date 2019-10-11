const express = require('express');
// const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/auth/me', auth, async (req, res) => res.send(req.user));
module.exports = router;
