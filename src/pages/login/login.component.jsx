import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/main">Login (temporary)</Link>
    </div>
  );
};

export default LoginPage;
