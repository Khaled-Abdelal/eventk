const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-github-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('../models/User');

// ----------GoogleOauth --------//

passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          req.user = existingUser;
          return done(null, existingUser);
        }
        if (profile.photos[0]) {
          const user = await new User({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            photo: profile.photos[0].value,
          }).save();
          req.user = user;

          return done(null, user);
        }
        const user = await new User({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          photo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Unknown_Member.jpg',
        }).save();
        req.user = user;

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ----------FacebookOauth --------//

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          req.user = existingUser;
          return done(null, existingUser);
        }
        const user = await new User({
          facebookId: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value,
        }).save();
        req.user = user;

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
