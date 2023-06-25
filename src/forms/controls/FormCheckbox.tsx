import React, { DetailedHTMLProps, ReactNode, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { DeepMap, FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import get from 'lodash.get';
import { ErrorMessage } from '@hookform/error-message';

import { ErrorMessage as FormErrorMessage } from '../_elements/ErrorMessage';

type FormTextareaProps<TFormValues extends FieldValues> = {
  /**
   * checkbox id
   */
  id: string;
  /**
   * input and error name
   */
  name: Path<TFormValues>;
  /**
   * uses for aria types
   */
  label: string;
  /**
   * label component
   */
  children?: ReactNode;
  /**
   * custom class
   */
  className?: string;
  /**
   * react-hook-form registering control
   */
  register?: UseFormRegister<TFormValues>;
  /**
   * errors object
   */
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
/**
 *
 * Form checkbox control.
 * @returns {<TFormValues extends Record<string, unknown>>} react-hook-form checkbox implementation
 */
const FormCheckbox = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  label,
  register,
  errors,
  className,
  children,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);

  return (
    <div className="custom-control custom-checkbox">
      <input
        id={id}
        type="checkbox"
        name={name}
        aria-label={label}
        aria-invalid={!!(errors && errorMessages)}
        className={classNames('custom-control-input', className)}
        {...props}
        {...(register && register(name))}
      />
      <label className="custom-control-label" htmlFor={id}>
        {children}
      </label>
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </div>
  );
};

export { FormCheckbox };
