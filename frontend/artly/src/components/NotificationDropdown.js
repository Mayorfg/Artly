// src/components/NotificationsDropdown.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setNotifications(response.data))
      .catch(error => console.error(error));
  }, []);

  const markAsRead = (notification_id) => {
    api.put(`/notifications/${notification_id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        setNotifications(notifications.filter(n => n.notification_id !== notification_id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="notifications-dropdown">
      {notifications.map(notification => (
        <div key={notification.notification_id}>
          <p>{notification.content}</p>
          <button onClick={() => markAsRead(notification.notification_id)}>Mark as Read</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationsDropdown;