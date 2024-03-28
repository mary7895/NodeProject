const express = require('express');
const { createUser ,getAllUsers,updateUserById,login} = require('../controllers/users');
const { auth,restrictTo } = require('../Middlware/auth');
const router = express.Router();

router.post('/',createUser);
router.get('/',auth,restrictTo('Registered User'), getAllUsers);
router.post('/login', login);
router.patch('/:id', auth, restrictTo('Registered User'),updateUserById);

module.exports = router;
