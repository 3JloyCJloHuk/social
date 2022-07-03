import * as yup from 'yup';

const ValidationSignUp = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  name: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Name can only contain Latin letters.',
    )
    .test(
      'name',
      'You must write First Name and Last Name',
      (value) => value?.split(' ').length === 2,
    )
    .required('Full name is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default ValidationSignUp;
