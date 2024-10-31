// src/pages/FollowingPage.js
import React, { useEffect, useState } from 'react';
import { getFollowing } from '../services/follow';
import { Link } from 'react-router-dom';

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getFollowing()
      .then(response => setFollowing(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Users You Follow</h2>
      <ul>
        {following.map(user => (
          <li key={user.user_id}>
            <Link to={`/profile/${user.user_id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingPage;