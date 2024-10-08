const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: String
});

const User = mongoose.model('users');

passport.serializeUser((user,done) =>{
  done(null,user.id);
});
// when deserializeUser is called we get whatever the user.id is with done
passport.deserializeUser((id,done) =>{
  User.findById(id)
    .then(user => {
      done(null,user);
    })
})

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'    
}, (accessToken, refreshToken, profile, done) =>{
    User.findOne({googleId: profile.id})
    .then((existingUser) =>{
      if(existingUser){
        done(null,existingUser)
      }else{
        new User({ googleId: profile.id}).save()
          .then(user => done(null, user))
      }
    })
    
    } 
  )
);
