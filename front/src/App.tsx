import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './features/User/RegisterForm/RegisterForm.tsx';
import LoginForm from './features/User/LoginForm/LoginForm.tsx';
import AppToolbar from './components/Toolbar/AppToolbar.tsx';
import AllPost from './features/Post/AllPost/AllPost.tsx';
import AddNewPost from './features/Post/AddNewPost/AddNewPost.tsx';

function App() {

  return (
    <>
      <Grid className="App">
        <CssBaseline/>
        <header>
          <AppToolbar/>
        </header>

        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<AllPost/>}/>
              <Route path="/posts/new" element={<AddNewPost/>}/>
              <Route path="/register" element={<RegisterForm/>}/>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="*" element={'Not Found'}/>
            </Routes>
          </Container>
        </main>
      </Grid>
    </>
  );
}

export default App;
