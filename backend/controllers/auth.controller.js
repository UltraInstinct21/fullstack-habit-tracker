const authService = require('../services/auth.services');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = await authService.register(username, email, password);

        res.status(201).json({
            message: "User registered successfully",
            userId
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

exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
}

