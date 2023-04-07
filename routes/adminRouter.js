const { registerAdmin } = require('../controllers/adminController');
const router = require('express').Router();


router.post('/new', registerAdmin);



module.exports = router;
