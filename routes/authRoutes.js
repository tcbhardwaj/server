const express = require("express");
const path = require('path');
const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google'), 
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/'); 
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    if (process.env.NODE_ENV === 'production') {
        // Exprees will serve up production assets
        //app.use(express.static('client/build'));
        app.use(express.static(path.join(__dirname, 'build')));
      
        // Express serve up index.html file if it doesn't recognize route        
        app.get('*', (req, res) => {            
            //res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
      }
    
}