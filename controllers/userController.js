const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Database Configuration
const db = require('../config/db');

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const userEmail = await db.get().collection('users').findOne({email: req.body.email}, { projection: { email: 1, _id: 0 } });
        if (userEmail != null && email === userEmail.email ) {
            return res.status(422).json({ error: 'User already exists' });
        } else {
            const data = await User.createUser(req.body);
            res.status(200).send(data);
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllUser = async (req, res) => {
    try {
        const data = await User.getAllUser();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email & Password are required!!" })
        } else {
            const userEmail = await db.get().collection('users').findOne({ email: email });
            if (userEmail) {
                const isMatch = await bcrypt.compare(password, userEmail.password);
                const token = await jwt.sign({ _id: userEmail._id }, process.env.SECRET_KEY);
                await User.updateUser(email, token);
                if (!isMatch) {
                    res.status(400).json({ error: "Invalid Email & Password!!" })
                }
                res.status(200).json({ success: "User Login Successfully!!" })
            } else {
                res.status(400).json({ error: "Invalid Credentials!!" })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    getAllUser,
    login
}