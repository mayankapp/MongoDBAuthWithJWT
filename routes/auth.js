const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Middleware Connfiguration
const createUserSchema = require('../middleware/createUser');

router.get('/',  userController.getAllUser);
router.get('/about',createUserSchema.verifyToken, (req, res) => {
    res.send("Welcome to the About page ");
});
router.get('/contact',createUserSchema.verifyToken, (req, res) => {
    res.send("Welcome to the Contact page ");
});
router.post('/create', createUserSchema.createUserSchema, userController.createUser);
router.post('/login', userController.login);

module.exports = router;