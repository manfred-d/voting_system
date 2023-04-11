const { loginVoter } = require('../controllers/loginVoter.js');
const { registerVoter } = require('../controllers/registerVoter.js');
const router = require('express').Router()

router.post('/login', loginVoter);
router.post('/register', registerVoter);
router.post('/register', registerVoter);
module.exports = router;
