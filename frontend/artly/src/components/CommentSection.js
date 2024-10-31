// src/components/CommentSection.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get(`/interactions/${postId}`)
      .then(response => setComments(response.data.filter(i => i.interaction_type === 'comment')))
      .catch(error => console.error(error));
  }, [postId]);

  const handleComment = (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    api.post('/interactions', {
      post_id: postId,
      interaction_type: 'comment',
      content,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setComments([...comments, response.data]))
      .catch(error => console.error(error));
    e.target.reset();
  };

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <div key={comment.interaction_id}>
          <p><strong>{comment.User.name}:</strong> {comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleComment}>
        <input name="comment" type="text" placeholder="Add a comment..." required />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;