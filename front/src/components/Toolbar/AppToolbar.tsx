import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import AnonymousMenu from './AnonymousMenu.tsx';

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
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;