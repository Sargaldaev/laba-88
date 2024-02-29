import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './features/Users/RegisterForm/RegisterForm.tsx';
import LoginForm from './features/Users/LoginForm/LoginForm.tsx';
import AppToolbar from './components/Toolbar/AppToolbar.tsx';
import AllPost from './features/Posts/AllPost/AllPost.tsx';
import AddNewPost from './features/Posts/AddNewPost/AddNewPost.tsx';
import OnePost from './features/Posts/OnePost/OnePost.tsx';

function App() {

  return (
    <>
      <Grid>
        <CssBaseline/>
        <header>
          <AppToolbar/>
        </header>

        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<AllPost/>}/>
            <Route path="/posts/:id" element={<OnePost/>}/>
            <Route path="/posts/new" element={<AddNewPost/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="*" element={'Not Found'}/>
          </Routes>
        </Container>
      </Grid>
    </>
  );
}

export default App;
