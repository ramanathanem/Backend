const express = require('express');
const router = express.Router();
const User = require('../Model/Login');
const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
// dotenv.config();

router.post('/register', async (req, res) => {
    console.log(req.body, '<--- req.body register')
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ success: true, message: 'Logged In Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body, "<--- req.body")
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json('User not found');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Login successful');
        } else {
            res.status(401).json('Invalid password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
});

module.exports = router;
