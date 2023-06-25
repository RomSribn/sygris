import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, FormCheckbox } from '@forms/controls';
import { AuthContext } from '@context/AuthContext';
import { loginRequesting, login } from '@store/auth/actions';
import { ErrorMessage } from '@forms/_elements/ErrorMessage';
import { TOKEN_LOCAL_STORAGE_KEY, saveToLocalStorage } from '@utils/localStorage';

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

  const {
    auth: { isLoading, error },
    dispatch
  } = useContext(AuthContext);

  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginRequesting());
    const response = await login(data);
    dispatch(response);
    if (!response.payload.error && data.isRemember) {
      saveToLocalStorage(TOKEN_LOCAL_STORAGE_KEY, response.payload.token);
    }
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

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sign In...' : 'Sign Ind'}
        </button>
      </form>
      <h2>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </h2>
      {!!error && (
        <ErrorMessage className="mt-5 text-center text-danger">Something went wrong, please try again</ErrorMessage>
      )}
    </div>
  );
};

export { SigninForm };
