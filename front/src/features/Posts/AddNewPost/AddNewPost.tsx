import React, { useEffect, useRef, useState } from 'react';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreatePost } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { createPost } from '../../../store/post/postThunk.ts';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Alert, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';


const AddNewPost = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [state, setState] = useState<CreatePost>({
    title: '',
    description: '',
    image: null
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {createLoading} = useSelector((state: RootState) => state.posts);
  const {user} = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const defaultTheme = createTheme();


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!state.title.length) {
        return setError('Title is required!');
      }
      if (!state.image?.name && !state.description.length) {
        return setError('Description or image required!');
      }
      await dispatch(createPost(state));
      navigate('/');
    } catch (e) {
      // nothing
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    if (inputRef.current?.files) {
      const image = inputRef.current?.files[0];
      setState(prevState => ({
        ...prevState,
        image
      }));
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            display={'flex'}
          >

            <Typography component="h1" variant="h5">
              New post
            </Typography>
            <Button sx={{ml: 28}} component={NavLink} to="/" color="inherit">
              back
            </Button>
          </Box>
          <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="title"
                  name="title"
                  type="text"
                  autoComplete="new-username"
                  value={state.title}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="description"
                  name="description"
                  type="text"
                  autoComplete="new-password"
                  value={state.description}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                />
                <input
                  style={{display: 'none'}}
                  type="file"
                  name="image"
                  onChange={onFileChange}
                  ref={inputRef}
                />
                <Grid container direction="row" mt={2} alignItems="center">
                  <Grid item xs mr={2}>
                    <TextField
                      disabled
                      label="Browse image"
                      value={filename}
                      onClick={activateInput}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={activateInput}>Browse</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {
              error.length !== 0 &&
              <Alert severity="error" sx={{mt: 1, width: '100%'}}>
                {error}
              </Alert>
            }
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              loading={createLoading}
            >
              Create post
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddNewPost;