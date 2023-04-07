const router = require('express').Router();

const { registerCandidate } = require('../controllers/registerCandidate');


router.post('/register', registerCandidate);


module.exports = router;
