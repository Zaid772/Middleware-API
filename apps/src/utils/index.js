const User = require("../models/users");
const jwt = require("jsonwebtoken");
require ("dotenv").config();

export async function registerUser (req, res) {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const expirationTime = 1000 * 60 * 60 * 24 * 7;
        const privateKey = process.env.JWTPASSWORD;
        const payload = { username: req.body.username };
        const option = { expiresIn: expirationTime };
        const token = await jwt.sign(payload, privateKey, option);
        console.log(token);

        res.status(201).json({ 
            message: "User registered in the database",
            user: {
                username:req.body.username,
                email: req.body.email,
                token: token
            } 
        });
    } catch (error) {
        res.status(501).json({ message: error.message, detail: error });
    }
}