/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  cover: { type: String, required: true },
  avatarCover: { type: String, required: true },
  description: { type: String, maxlength: 1024, required: true },
  title: { type: String, maxlength: 255, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
