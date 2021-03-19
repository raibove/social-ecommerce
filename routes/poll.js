const router = require('express').Router(),
{get,set} = require('../controllers/poll');

router.get('/vote/:user/:pollid/:option',set) 
router.get('/results/:user/:pollid/:option',get) 
module.exports = router
