const router = require('express').Router();

const cryptoService = require('../services/cryptoService');

const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create',(req,res)=>{
    res.render('crypto/create')
});

router.post('/create', async(req,res)=>{
    const cryptoData = req.body
    try {
        await cryptoService.create(cryptoData);
        res.redirect('/crypto/catalog')
    } catch (error) {
        res.render('crypto/create', {error: getErrorMessage(error)})
    }
});



module.exports = router;