import AppsIcon from '@mui/icons-material/Apps';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Box,
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
import { useAppSelector } from '../../Redux/hooks';
import {
  selectSignInStatus,
  selectUserName,
} from '../../Redux/Slices/user/userSlice';
import { RouteNames, RoutePaths } from '../Router/RoutesConstants';
import SignOutBtn from '../SignOutBtn/SignOutBtn';
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
  {
    name: RouteNames.Settings,
    icon: <SettingsIcon />,
    link: RoutePaths.Settings,
  },
];

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const userSignedIn: boolean = useAppSelector(selectSignInStatus);
  const username: string = useAppSelector(selectUserName);

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
            <img
              src="/images/logo-white.png"
              alt="logo"
              style={{ width: '155px', marginTop: '7px' }}
            />
          </Typography>

          {userSignedIn && (
            <div className="userInfo">
              <div className="username">{username}</div>
              <SignOutBtn></SignOutBtn>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
