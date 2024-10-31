// controllers/purchaseController.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getPurchaseToken = (req, res) => {
  try {
    const { artworkId } = req.params;
    const token = jwt.sign(
      { artworkId, userId: req.user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};