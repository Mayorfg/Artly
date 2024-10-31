// controllers/messageController.js
const { Message, User } = require('../models');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    const newMessage = await Message.create({
      sender_id: req.user.user_id,
      receiver_id,
      content,
    });

    res.status(201).json({ message: 'Message sent', message_id: newMessage.message_id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { user_id } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: req.user.user_id, receiver_id: user_id },
          { sender_id: user_id, receiver_id: req.user.user_id },
        ],
      },
      include: [
        { model: User, as: 'Sender', attributes: ['user_id', 'name'] },
        { model: User, as: 'Receiver', attributes: ['user_id', 'name'] },
      ],
      order: [['created_at', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};