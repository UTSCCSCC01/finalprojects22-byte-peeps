import AppsIcon from '@mui/icons-material/Apps';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectSignInStatus,
  selectUserName,
  signOut,
} from '../../Redux/Slices/user/userSlice';
import { RouteNames, RoutePaths } from '../../RoutesConstants';
import './Header.css';

const Pages = [
  {
    name: RouteNames.Dashboard,
    icon: <HomeOutlinedIcon />,
    link: RoutePaths.Dashboard,
  },
  { name: RouteNames.Surveys, icon: <ListAltIcon />, link: RoutePaths.Surveys },
  { name: RouteNames.Reviews, icon: <AppsIcon />, link: RoutePaths.Reviews },
  { name: RouteNames.Socials, icon: <PeopleIcon />, link: RoutePaths.Socials },
];

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userSignedIn: boolean = useAppSelector(selectSignInStatus);
  const username: string = useAppSelector(selectUserName);

  const handleSignOut = () => {
    dispatch(signOut(null));
    navigate(RoutePaths.SignIn);
  };

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(true)}>
      {Pages.map((item, index, link) => (
        <ListItem button key={index} onClick={() => navigate(item.link)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {userSignedIn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer
            open={open}
            variant="temporary"
            anchor={'left'}
            onClose={() => setOpen(false)}
          >
            {getList()}
          </Drawer>
          <Typography variant="h6" color="inherit" component="div">
            Datalytic
          </Typography>

          {userSignedIn && (
            <div className="userInfo">
              <div className="username">{username}</div>
              <Button
                color="inherit"
                variant="text"
                onClick={() => handleSignOut()}
              >
                Sign Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
