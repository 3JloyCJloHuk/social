import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Field, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidationSignIn from './ValidationSignIn';

const SignIn: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
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
              Login
            </Typography>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                  );
                } catch (error) {
                  console.log(error);
                }
                setSubmitting(false);
              }}
              validationSchema={ValidationSignIn}>
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
              onClick={() => navigate('/register')}
              component="p"
              fontSize="0.8125rem"
              fontWeight="500"
              color="secondary"
              textTransform="uppercase"
              sx={{ cursor: 'pointer' }}>
              Register
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;
