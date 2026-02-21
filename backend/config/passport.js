const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users.model'); // Adjust path to the User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            // Check if user already exists
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // User exists, proceed with login
                return cb(null, user);
            }

            // If user doesn't exist, check by email first to avoid creating duplicates
            // if they previously registered via local strategy
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            if (email) {
                const existingUserByEmail = await User.findOne({ email });
                if (existingUserByEmail) {
                    // Update existing user to include Google ID
                    existingUserByEmail.googleId = profile.id;
                    existingUserByEmail.authProvider = "google";
                    await existingUserByEmail.save();
                    return cb(null, existingUserByEmail);
                }
            }

            // If user really doesn't exist, create a new one
            user = new User({
                googleId: profile.id,
                username: profile.displayName || profile.name?.givenName,
                email: email,
                authProvider: "google"
                // Password is not required for Google users based on the schema update
            });

            await user.save();
            return cb(null, user);
        } catch (err) {
            return cb(err, null);
        }
    }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
