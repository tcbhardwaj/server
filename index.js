const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./model/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use (
    cookieSession({
        maxAge: 10 * 24 * 60 * 60 * 1000,    // day * hr * min * sec * miliSec
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Exprees will serve up production assets
    //app.use(express.static('client/build'));
    app.use(express.static(path.join(__dirname, 'build'))); 
    // Express serve up index.html file if it doesn't recognize route
    
    app.get('/*', (req, res) => {
      //res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);