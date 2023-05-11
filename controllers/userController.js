const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/userModel');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json('Please complete all fields.');
    } else {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json('User already exists.');
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            try {
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                })
                newUser.save();
                res.status(201).json({
                    name: newUser.name,
                    email: newUser.email,
                    token: generateToken(newUser.id)
                });
            } catch (error) {
                res.json(error);
            }
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });

    } else {
        res.status(400).json('invalid email or password');
    }

}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}


module.exports = { register, login };