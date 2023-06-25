import React from 'react';
import { SignupForm } from '@forms/container/signup';
/**
 * SignUp page.
 * @returns {React.FC} Page with SignUp form.
 */
const SignUp: React.FC = () => (
  <div className="vh-100 d-flex justify-content-center">
    <SignupForm />
  </div>
);

export default SignUp;
