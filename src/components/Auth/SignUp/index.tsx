import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Field, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import ValidationSignUp from './ValidationSignUp';

const SignUp: React.FC = () => {
  const app = useFirebaseApp();
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore(app);
  return (
    <Box>
      <Container>
        <Grid container width="350px" m="20px auto 0px" textAlign="center">
          <Grid item xs={12}>
            <Typography component="h1" fontSize="2.5rem" color="secondary" fontWeight="700">
              Social
            </Typography>
            <Typography
              component="p"
              fontSize="1.5rem"
              color="#000000"
              fontWeight="500"
              m="5px 0px 30px">
              Register
            </Typography>
            <Formik
              initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const { user } = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                  );
                  updateProfile(user, {
                    displayName: values.name,
                  });
                  await setDoc(doc(db, 'users', user.uid), {
                    name: values.name,
                    email: user.providerData[0].email,
                    photo: user.providerData[0].photoURL,
                    phone: user.providerData[0].phoneNumber,
                    id: user.uid,
                  });
                } catch (error) {
                  console.log(error);
                }
                setSubmitting(false);
              }}
              validationSchema={ValidationSignUp}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      type="text"
                      name="name"
                      value={values.name}
                      label="Name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      inputProps={{ style: { textTransform: 'capitalize' } }}
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="email"
                      value={values.email}
                      label="Email"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      type="password"
                      name="password"
                      value={values.password}
                      label="Password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Field
                      as={TextField}
                      type="password"
                      name="repeatPassword"
                      value={values.repeatPassword}
                      label="Repeat password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                      helperText={touched.repeatPassword && errors.repeatPassword}
                    />
                  </FormControl>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disabled={isSubmitting}>
                      Login
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Typography
              component="h3"
              m="20px 0px 0px"
              fontSize="0.875rem"
              letterSpacing="-1.5px"
              color="000000"
              fontWeight="600">
              Already have account?
            </Typography>
            <Typography
              onClick={() => navigate('/login')}
              component="p"
              fontSize="0.8125rem"
              fontWeight="500"
              color="secondary"
              textTransform="uppercase"
              sx={{ cursor: 'pointer' }}>
              Login
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
