const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/github',
  passport.authenticate('github-token', {
    session: false,
  }),
  async (req, res) => {
    const token = await req.user.generateAuthToken();
    res.json({ token, user: req.user });
  }
);
router.post(
  '/facebook',
  passport.authenticate('facebook-token', {
    session: false,
  }),
  async (req, res) => {
    const token = await req.user.generateAuthToken();
    res.json({ token, user: req.user });
  }
);

module.exports = router;
