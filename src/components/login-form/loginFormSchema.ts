import * as yup from 'yup';

export const loginFormSchema = yup.object({
  email: yup.string().email('Email address must be a valid email').required(),
  password: yup.string().required()
})