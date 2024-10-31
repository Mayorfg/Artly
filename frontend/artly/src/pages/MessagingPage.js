// src/pages/MessagingPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const MessagingPage = () => {
  const { user_id } = useParams();

  const refreshMessages = () => {
    // Logic to refresh messages if needed
  };

  return (
    <div className="messaging-page">
      <h2>Chat with User {user_id}</h2>
      <MessageList userId={user_id} />
      <MessageInput receiverId={user_id} onMessageSent={refreshMessages} />
    </div>
  );
};

export default MessagingPage;