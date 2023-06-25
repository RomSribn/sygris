import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export type FormErrorMessageProps = {
  /**
   * custom class
   */
  className?: string;
  /**
   * text error component
   */
  children: ReactNode;
};
/**
 * ErrorMessage component.
 * @param {FormErrorMessageProps['className']} className optional.
 * @param {FormErrorMessageProps['children']} children text error component
 * @returns {React.FC<IResultCard>} simple <p/> element with error message.
 */
const ErrorMessage: FC<FormErrorMessageProps> = ({ children, className }) => (
  <p className={classNames('font-serif text-sm text-left block text-red-600', className)} data-testid="error-message">
    {children}
  </p>
);

export { ErrorMessage };
