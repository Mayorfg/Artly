// src/components/MessageInput.js
import React, { useState } from 'react';
import { sendMessage } from '../services/message';

const MessageInput = ({ receiverId, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    sendMessage(receiverId, content)
      .then(() => {
        setContent('');
        onMessageSent();
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;