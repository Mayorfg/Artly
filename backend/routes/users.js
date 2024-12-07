// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authenticate = require('../middleware/authenticate');
const {handleProfilePictureUpload, upload} = require('../middleware/upload');

router.get('/profile/:user_id', userController.getProfile);
router.put('/profile/:user_id', authenticate, userController.updateProfile);
router.put('/profile-picture', authenticate, upload, userController.updateProfilePicture );

module.exports = router;