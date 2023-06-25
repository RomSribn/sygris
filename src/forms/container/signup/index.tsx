import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormInput } from '@forms/controls';
import { yupResolver } from '@hookform/resolvers/yup';

import { formSchema } from './validation';

type SignupFormFields = {
  email: string;
  password: string;
  cpassword: string;
};
/**
 * Signup form with login, password and confirm password inputs
 * @returns {React.FC} react-hook-form form implementation.
 */
const SignupForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormFields>({ resolver: yupResolver(formSchema) });

  const onSubmit = handleSubmit(async () => {
    console.log('sign up');
  });

  return (
    <div className="form-access my-auto">
      <form onSubmit={onSubmit}>
        <span>Create Account</span>

        <FormInput<SignupFormFields>
          id="email"
          type="email"
          name="email"
          label="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        <FormInput<SignupFormFields>
          id="password"
          type="password"
          name="password"
          label="password"
          placeholder="Password"
          register={register}
          errors={errors}
        />
        <FormInput<SignupFormFields>
          id="cpassword"
          type="password"
          name="cpassword"
          label="cpassword"
          placeholder="Confirm your password"
          register={register}
          errors={errors}
        />

        <button type="submit" className="btn btn-primary">
          {'Create Account'}
        </button>
      </form>
      <h2>
        Already have an account?
        <Link to="/login"> Sign in here</Link>
      </h2>
    </div>
  );
};

export { SignupForm };
