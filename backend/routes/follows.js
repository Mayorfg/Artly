// routes/follows.js
const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authenticate = require('../middleware/authenticate');

router.post('/follow', authenticate, followController.followUser);
router.post('/unfollow', authenticate, followController.unfollowUser);
router.get('/following', authenticate, followController.getFollowing);
router.get('/followers', authenticate, followController.getFollowers);
router.get('/following-artworks', authenticate, followController.getFollowingArtworks);

module.exports = router;