const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { getAllUsers, getUserbyId, postNewUser, updateUser, deleteUser, isUserExist } = require('../controllers/user.controller');

router.get('/users', getAllUsers);

router.get('/user/:id', getUserbyId);

router.post('/user', postNewUser);

router.post('/isUserExist', isUserExist);

router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);


module.exports = router;
