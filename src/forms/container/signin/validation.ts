import * as yup from 'yup';

export const formSchema = yup.object().shape({
  email: yup.string().required('Login is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  isRemember: yup.boolean().required()
});
