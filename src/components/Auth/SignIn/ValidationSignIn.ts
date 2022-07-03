import * as yup from 'yup';

const ValidationSignIn = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
});

export default ValidationSignIn;
