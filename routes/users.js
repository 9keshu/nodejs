const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);

module.exports = router;

router.get('/sign-in',userController.sign_in);
router.get('/sign-up',userController.sign_up);
router.post('/create',userController.create);