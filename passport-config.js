const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/userModel');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const userId = jwt_payload.id; // Use the 'id' directly from jwt_payload
    const user = await User.findById(userId);

    if (!user) {
      return done(null, false);
    }

    // Check if the token expiration time is in the past
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
    if (jwt_payload.exp < currentTimestamp) {
      return done(null, false, { message: 'Token expired' });
    }

    return done(null, user); // Token is valid and user is found
  } catch (error) {
    return done(error, false);
  }
}));
