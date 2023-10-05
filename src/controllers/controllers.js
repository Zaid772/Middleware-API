const User = require("../models/users");
const jwt = require("jsonwebtoken");
require ("dotenv").config();

async function registerUser (req, res) {
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
};

async function loginUser (req, res) {
    try {
        await User.findOne({
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
            message: "User logged in successfully", user: req.body.username,
            token: token
        });
    } catch (error) {
        res.status(501).json({ message: error.message, detail: error });
    }
};

async function listAllUsers (req, res) {
    try {
        const listofUsers = await User.findAll();

        const expirationTime = 1000 * 60 * 60 * 24 * 7;
        const privateKey = process.env.JWTPASSWORD;
        const payload = { username: req.body.username };
        const option = { expiresIn: expirationTime };
        const token = await jwt.sign(payload, privateKey, option);
        console.log(token);

        res.status(200).json({ message: "All users from the database are:", userlist: listofUsers, token: token });
        } catch (error) {
        res.status(501).json({ message: error.message, detail: error });
    }
};

async function deleteUser (req, res) {
    try{
        const deleteUsers = await User.destroy({ where: { username: req.body.username }

        });
        res.status(201).json({ 
            message: "User deleted in the database",
            user: deleteUsers 
        });
    } catch (error) {
        res.status(501).json({ message: error.message, detail: error })
    }
};

async function updatePassword (req,res) {
    try {
        const updatePasswords = await User.update(
            { password: req.body.newPassword },
            { where: { username: req.body.username }}
        );

        if(updatePasswords === 0) {
            return res.status(500).json({ message: "user not found" })
        }
        res.status(201).json({ message: "Password successfully updated", password: updatePasswords });
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error.message, error: error })
    }
};

module.exports = { registerUser, loginUser, listAllUsers, deleteUser, updatePassword };