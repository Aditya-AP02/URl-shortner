const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controller/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleUserLogin);

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', handleUserSignup);

module.exports = router;
