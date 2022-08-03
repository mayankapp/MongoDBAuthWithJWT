const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Middleware Connfiguration
const createUserSchema = require('../middleware/createUser');

router.get('/',  userController.getAllUser);
router.get('/about', (req, res) => {
    res.send("Welcome to the About page ");
});
router.post('/create', createUserSchema, userController.createUser);
router.post('/login', userController.login);

module.exports = router;