const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = require('express').Router();


router.post('/new', registerAdmin);
router.post('/login', loginAdmin);


module.exports = router;

