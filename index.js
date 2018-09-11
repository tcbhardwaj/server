const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

//clientID : 664935293706-mbplk7vdaeipac6lkp80pn1k7493p2lu.apps.googleusercontent.com
//clientSecret: Qx1s9vzNIj9qhg30lpScJSvt
passport.use(new GoogleStrategy());

app.get("/", (req, res) => {
    res.send({
        newKey: "new value"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);