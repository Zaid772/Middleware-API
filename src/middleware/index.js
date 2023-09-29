const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword (req, res, next) {
    try {
        const saltRounds = parseInt(process.env.SALT)
        const plainTextPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        req.body.password = hashedPassword;
        console.log("Entering hashPassword try area");
        next();
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
};

async function passwordCheck (req, res, next) {
    try {
        const userDetails = await User.findOne({ where: { username: req.body.username }});

        if (userDetails !== null) {
            var hashedPassword = userDetails.password;
        } else {
            var hashedPassword = "Dummy";
        }
        const plainTextPassword = req.body.password;
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);

        if (match && userDetails) {
            console.log("password and username match")
        } else {
            throw new Error("password and username don't match");
        };
        
        next();
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error.message, error: error });
    }
};

async function tokenCheck(req,res,next) {
    try {
        const secretKey = process.env.JWTPASSWORD
        const token = req.header("Authorization").replace("Bearer ","");
        const decodedToken = jwt.verify(token, secretKey)
        const username = decodedToken.username
        console.log(username)
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            throw new Error ("User no longer in the database")
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function emailValidation (req, res, next) {
    try {
    const plainTextEmail = req.body.email;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!emailRegex.test(plainTextEmail)) {
        throw new Error("Email is incorrect")
    };

    next();
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error.message, error: error });
    }
};

module.exports = { hashPassword, passwordCheck, tokenCheck, emailValidation };