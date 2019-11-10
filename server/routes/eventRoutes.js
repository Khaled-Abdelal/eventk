const express = require('express');
const moment = require('moment');
const Event = require('../models/Event');

const router = express.Router();

router.get('/one/:id', async (req, res) => {
  console.log(req.params.id);
  const event = await Event.find({ _id: req.params.id }).populate('_user', '-facebookId');

  return res.send(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find({ endTime: { $gte: moment() } }).populate('_user', '-facebookId');

  return res.send(events);
});

router.get('/avatardata', async (req, res) => {
  const events = await Event.find({ endTime: { $gte: moment() } }).select('location startTime endTime');

  return res.send(events);
});

module.exports = router;
