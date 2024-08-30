const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('../config/keys');
// Added Mongo
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
//2 Netlify lines
const serverless = require("serverless-http");
const router = express.Router();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const app = express();
app.use(
    cookieSession(
        {
            maxAge: 30 * 24 * 60 * 60  * 10000,
            keys: [keys.cookieKey]
        }
    )
);

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Cluster0Production").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    mongoose.connect(uri);
require('../models/Users');


require('../routes/authRoutes')(app);
require('../services/passport');
// const PORT = process.env.PORT || 5000;

// app.listen(PORT);
    //Netlify Code
    app.use(passport.initialize());
app.use(passport.session())
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);







