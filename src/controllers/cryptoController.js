const router = require('express').Router();

const cryptoService = require('../services/cryptoService');

const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('crypto/create')
});

router.post('/create', async (req, res) => {
    const cryptoData = req.body
    try {
        await cryptoService.create(cryptoData);
        res.redirect('/crypto/catalog')
    } catch (error) {
        res.render('crypto/create', { error: getErrorMessage(error) })
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const crypto = await cryptoService.getAll().lean();
        res.render('crypto/catalog', { crypto });

    } catch (error) {
        res.redirect('/404');
    }
})


module.exports = router;