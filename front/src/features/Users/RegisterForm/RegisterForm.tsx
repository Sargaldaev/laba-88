import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { RegisterMutation } from '../../../types';
import { register } from '../../../store/user/userThunk.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const RegisterForm = () => {

  const {registerError, registerLoading} = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<RegisterMutation>({
    username: '',
    password: ''
  });
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(users)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (name: string) => {
    try {
      return registerError?.errors[name].message;
    } catch {
      return undefined;
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setUsers(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        paddingTop: 10
      }}

    >
      <CssBaseline/>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid white',
          borderRadius: 3
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={onFormSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="new-username"
                onChange={onChange}
                value={users.username}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
                value={users.password}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={registerLoading ? true : false}
          >
            {registerLoading ? <CircularProgress/> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" style={{color: 'blue'}}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 5}}/>
    </Container>
  );
};

export default RegisterForm;