import React, { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'password' | 'email';

export type InputProps = {
  /**
   * input id
   */
  id: string;
  /**
   * input name
   */
  name: string;
  /**
   * input label
   */
  label: string;
  /**
   * optional input type
   */
  type?: InputType;
  /**
   * custom class
   */
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;
/**
 * Input form element.
 * @param {InputProps['id']} id optional.
 * @param {InputProps['name']} name
 * @param {InputProps['label']} label optional.
 * @param {InputProps['type']} type optional.
 * @param {InputProps['className']} className optional.
 * @returns React forwardRef component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input: any = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = 'text', className = '', placeholder, ...props }, ref) => {
    return (
      <div className="form-group">
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className={classNames(['form-control', className])}
          {...props}
        />
      </div>
    );
  }
);

export { Input };
