import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});

const AppToolbar = () => {
  const {user} = useSelector((state: RootState) => state.users);
  return (
    <AppBar sx={{mb: 2}} className="toolbar">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          <Link to="/">FORUM</Link>
        </Typography>
        {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        {user ? <Button sx={{mr: 5}} component={NavLink} to="/posts/new" color="inherit">
          Add new post
        </Button> : <> </>}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;