import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from '..';

const HomePage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  return (
    <div>
      {!isAuthenticated ? (
        <Navigate to={"/login"} />
      ) : (
          <Navigate to={"/my"} />
      )}
    </div>
  );
};


export default HomePage