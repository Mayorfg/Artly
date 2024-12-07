// middleware/upload.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Configure Multer to handle file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profile_image');

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Function to handle upload and store in the database
async function handleProfilePictureUpload(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    try {
      // Update the user's profile_picture_data column with binary data
      await User.update(
        { profile_picture_data: req.file.buffer },
        { where: { user_id: req.user.user_id } }
      );
      // Send the base64-encoded image data in the response
      const base64Data = req.file.buffer.toString('base64');

      
      res.status(200).json({
        message: 'Profile picture uploaded successfully.',
        profile_picture_data: base64Data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
}

module.exports = { upload, handleProfilePictureUpload };