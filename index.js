const express = require("express");
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./model/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const authRoutes = require('./routes/authRoutes');



const app = express();
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);