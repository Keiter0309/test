const express = require('express');
let userController = require('../src/userController.js')
const router = express.Router();

router.route('/login').post(userController.loginControllerFn);
router.route('/signup').post(userController.signUpControllerFn);

module.exports = router;