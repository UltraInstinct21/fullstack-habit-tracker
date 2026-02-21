const authService = require('../services/auth.services');
const jwtUtil = require('../utils/jwt.ustil'); // For generating tokens for OAuth users

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // register returns a JWT token
        const token = await authService.register(username, email, password);

        // set cookie (same options as login)
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        });

        res.status(201).json({
            message: "User registered successfully",
            token
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: "All input is required" });
        }

        const token = await authService.login(email, password);

        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        });



        res.json({ token });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.googleCallback = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Generate JWT for the Google User
        const token = jwtUtil.generateToken(req.user);

        // Set the JWT cookie
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000), // 1 day
            secure: false, // Set true in production with HTTPS
            httpOnly: true,
            sameSite: "lax"
        });

        // Redirect back to frontend dashboard with token
        res.redirect(`http://localhost:5173/habits?token=${token}`);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
}

