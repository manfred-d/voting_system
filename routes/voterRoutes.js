const { loginVoter } = require('../controllers/loginVoter.js');
const router = require('express').Router()

router.post('/login', loginVoter);

module.exports = router;
