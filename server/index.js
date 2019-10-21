const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

require('dotenv').config();
require('./config/passport');

const PORT = process.env.PORT || 5000;

// ------------ MiddleWares----------//

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

// ------------- DB-Config---------//

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.log(err);
});
mongoose.set('useFindAndModify', false);

// ----------------Routes----------//
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/event', require('./routes/eventRoutes'));

// ----------------Socketio----------//
require('./socketio/socketio')(io);
// --------------ServerStart---------//

server.listen(PORT, () => {
  console.log(`server up port ${PORT}`);
});
