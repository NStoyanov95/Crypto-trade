const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');

router.use(homeController);
router.use('/auth', authController);
router.use('/crypto', cryptoController);
router.get('*', (req,res)=>{
    res.redirect('/404');
})



module.exports = router;