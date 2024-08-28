//app.js
// Production code added with serverless-http and Router() to deploy and build to netlify
// const express = require("express");
// const serverless = require("serverless-http");
// const app = express();
// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send({hi:"hi there"});
// });

// app.use("/.netlify/functions/app", router);
// module.exports.handler = serverless(app);
// mongodb driver
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://jack:<db_password>@clusternode0.w0hikft.mongodb.net/jackdb?retryWrites=true&w=majority&appName=Clusternode0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys')
require('../models/Users');
require('../services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
require('../routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);








