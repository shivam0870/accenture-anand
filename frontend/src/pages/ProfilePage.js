import React, { useContext } from 'react'
import { Context } from '..';

const ProfilePage = () => {
    const { isAuthenticated, user } = useContext(Context);
    if (!isAuthenticated) return null;
  return (
    <div>
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
    </div>
  )
}

export default ProfilePage