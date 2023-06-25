import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, FormCheckbox } from '@forms/controls';

import { formSchema } from './validation';

type SigninFormFields = {
  /**
   * user email, uses as login
   */
  email: string;
  /**
   * user password
   */
  password: string;
  /**
   * if true - save session id to localStorage
   */
  isRemember: boolean;
};
/**
 * Signin form with login and password inputs
 * @returns {React.FC} react-hook-form form implementation.
 */
const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninFormFields>({ resolver: yupResolver(formSchema) });

  const onSubmit = handleSubmit(async () => {
    console.log('sign in');
  });

  return (
    <div className="form-access my-auto">
      <form onSubmit={onSubmit}>
        <span>Sign In</span>

        <FormInput<SigninFormFields>
          id="email"
          type="email"
          name="email"
          label="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        <FormInput<SigninFormFields>
          id="password"
          type="password"
          name="password"
          label="password"
          placeholder="Password"
          register={register}
          errors={errors}
        />

        <FormCheckbox<SigninFormFields>
          id="isRemember"
          name="isRemember"
          label="Remember me"
          defaultChecked
          register={register}
          errors={errors}>
          Remember me
        </FormCheckbox>

        <button type="submit" className="btn btn-primary">
          {'Sign In'}
        </button>
      </form>
      <h2>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </h2>
    </div>
  );
};

export { SigninForm };
