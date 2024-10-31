// src/components/MessageList.js
import React, { useEffect, useState } from 'react';
import { getMessages } from '../services/message';

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(userId)
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.message_id} className={`message ${message.sender_id === userId ? 'received' : 'sent'}`}>
          <p>{message.content}</p>
          <span>{new Date(message.created_at).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;