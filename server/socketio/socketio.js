const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');

module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('add-new-event', async function(token, data, cb) {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
          return cb('no user found');
        }

        const { coordinates, cover, description, title, startTime, endTime } = data;
        if (startTime >= endTime) {
          return cb('error start date cant be bigger or equall to end date');
        }

        const newEvent = await new Event({
          _user: user._id,
          location: { coordinates },
          cover,
          startTime,
          endTime,
          description,
          title,
        }).save();
        cb();
        io.emit('new-event', newEvent);
      } catch (err) {
        cb(err);
      }
    });
  });
};
