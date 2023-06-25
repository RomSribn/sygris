import React from 'react';
import { SigninForm } from '@forms/container/signin';
/**
 * Signin page.
 * @returns {React.FC} Page with Signin form.
 */
const SignIn: React.FC = () => (
  <div className="vh-100 d-flex justify-content-center">
    <SigninForm />
  </div>
);

export default SignIn;
