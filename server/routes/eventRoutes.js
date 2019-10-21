const express = require('express');
const moment = require('moment');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find({ endTime: { $gte: moment() } }).populate('_user', '-facebookId');

  return res.send(events);
});

module.exports = router;
