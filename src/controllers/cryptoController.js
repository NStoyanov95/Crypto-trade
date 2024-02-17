const router = require('express').Router();

const cryptoService = require('../services/cryptoService');

const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth, isOwner } = require('../middlewares/authMiddleware')

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create')
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body
    cryptoData.owner = req.user._id;
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
});

router.get('/:cryptoId/details', async (req, res) => {
    try {
        const crypto = await cryptoService.getOne(req.params.cryptoId).populate('buyACrypto').lean();
        const isUser = req.user;
        const isOwner = crypto.owner == req.user?._id;
        const isBuyer = crypto.buyACrypto.some(x => x._id == req.user?._id);
        res.render('crypto/details', { crypto, isUser, isOwner, isBuyer })
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    try {
        await cryptoService.buy(req.params.cryptoId, req.user._id);
        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:cryptoId/delete', isAuth, isOwner, async (req, res) => {
    try {
        await cryptoService.delete(req.params.cryptoId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:cryptoId/edit', isAuth, isOwner, async (req, res) => {
    try {
        const crypto = await cryptoService.getOne(req.params.cryptoId).lean();
        res.render('crypto/edit', { crypto });
    } catch (error) {

    }
});

router.post('/:cryptoId/edit', isAuth, isOwner, async (req, res) => {
    const crypto = req.body;
    try {
        await cryptoService.edit(req.params.cryptoId, crypto);
        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (error) {
        res.render('crypto/edit', { error: getErrorMessage(error), crypto })
    }
});

router.get('/search', async (req, res) => {
    try {
        const crypto = await cryptoService.getAll().lean();
        res.render('crypto/search', { crypto });
    } catch (error) {
        res.redirect('/404')
    }
});


module.exports = router;