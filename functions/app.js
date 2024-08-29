const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('../config/keys');
//2 Netlify lines
const serverless = require("serverless-http");
const router = express.Router();



require('../models/Users');
require('../services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(
    cookieSession(
        {
            maxAge: 30 * 24 * 60 * 60  * 10000,
            keys: [keys.cookieKey]
        }
    )
);
app.use(passport.initialize());
app.use(passport.session());
require('../routes/authRoutes')(app);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT);
//Netlify Code
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);







