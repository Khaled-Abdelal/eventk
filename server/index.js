const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

const app = express();
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

// --------------ServerStart---------//

app.listen(PORT, () => {
  console.log(`server up port ${PORT}`);
});
