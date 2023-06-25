import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FormInput } from '@forms/controls';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '@context/AuthContext';
import { signUpRequesting, signup } from '@store/auth/actions';
import { ErrorMessage } from '@forms/_elements/ErrorMessage';
import { RouteNames } from '@router/utils';

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
const SignupForm: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormFields>({ resolver: yupResolver(formSchema) });
  const {
    auth: { isLoading, error },
    dispatch
  } = useContext(AuthContext);

  const onSubmit = handleSubmit(async (data) => {
    dispatch(signUpRequesting());
    const response = await signup(data);
    dispatch(response);

    if (!response.payload.error) {
      history.push(RouteNames.LOGIN);
    }
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

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Create Account...' : 'Create Account'}
        </button>
      </form>
      <h2>
        Already have an account?
        <Link to="/login"> Sign in here</Link>
      </h2>
      {!!error && (
        <ErrorMessage className="mt-5 text-center text-danger">Something went wrong, please try again</ErrorMessage>
      )}
    </div>
  );
};

export { SignupForm };
