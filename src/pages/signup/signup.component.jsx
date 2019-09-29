import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div>
      <h1>Sign up Page</h1>
      <Link to="/login">Login (temporary)</Link>
    </div>
  );
};

export default SignupPage;
