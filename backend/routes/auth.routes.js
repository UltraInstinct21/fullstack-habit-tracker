const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/protect');

const passport = require('passport');

router.post('/register', authController.register)
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=auth_failed', session: false }),
    authController.googleCallback);

// Get current user route
router.get('/current-user', protect, (req, res) => {
    res.json(req.user);
});

module.exports = router;