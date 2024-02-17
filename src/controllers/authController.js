const router = require('express').Router();

const authService = require('../services/authService');

const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils')


//REGISTER
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        res.cookie('auth', token)
        res.redirect('/');
    } catch (error) {
        res.render('auth/register', { error: getErrorMessage(error) });
    }
});

//LOGIN
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { error: getErrorMessage(error) });
    }
});

//Logout
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;