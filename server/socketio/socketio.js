const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');
const optimizeImage = require('../utils/imageOptimize');

module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('add-new-event', async function(token, data, cb) {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
          return cb({ message: 'no user found' });
        }

        const { coordinates, cover, description, title, startTime, endTime } = data;
        if (startTime >= endTime) {
          return cb({ message: 'error start date cant be bigger or equall to end date' });
        }
        const optimizedCover = await optimizeImage(cover);
        const newEvent = await new Event({
          _user: user._id,
          location: { coordinates },
          cover: optimizedCover,
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
