import * as yup from 'yup';

export const loginFormSchema = yup.object({
  email: yup.string().email('email address must be a valid email').required('email address is required'),
  password: yup.string().required('password is required')
})