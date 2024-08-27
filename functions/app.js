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
// Original dev code without the netlify upgrade
const express = require('express');
require('../services/passport');


const app = express();
require('../routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

