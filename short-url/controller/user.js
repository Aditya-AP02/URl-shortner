const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function handleUserSignup(req, res) {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            return res.render('signup', { error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.render('signup', { error: error.message });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        req.session.userId = user._id;
        res.redirect('/');

    } catch (error) {
        res.render('login', { error: error.message });
    }
}

module.exports = { handleUserSignup, handleUserLogin };
