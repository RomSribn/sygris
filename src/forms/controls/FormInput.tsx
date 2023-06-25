import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';
import { DeepMap, FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Input, InputProps, ErrorMessage as FormErrorMessage } from '../_elements';

export type FormInputProps<TFormValues extends FieldValues> = {
  /**
   * input and error name
   */
  name: Path<TFormValues>;
  /**
   * react-hook-form registering control
   */
  register?: UseFormRegister<TFormValues>;
  /**
   * errors object
   */
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;
/**
 *
 * Form input control.
 * @returns {<TFormValues extends Record<string, unknown>>} react-hook-form input implementation
 */
const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames(className)} aria-live="polite" data-testid="form-input">
      <Input
        name={name}
        aria-invalid={hasError}
        className={classNames({
          'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
            hasError
        })}
        {...props}
        {...(register && register(name))}
      />
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }) => <FormErrorMessage className="mt-1 text-danger">{message}</FormErrorMessage>}
      />
    </div>
  );
};

export { FormInput };
