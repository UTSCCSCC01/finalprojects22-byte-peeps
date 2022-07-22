import AppsIcon from '@mui/icons-material/Apps';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { setPageName } from '../../Redux/Slices/webApp/webAppSlice';
import { RouteNames, RoutePaths } from '../Router/RoutesConstants';

interface Props {}

const Pages = [
  {
    name: RouteNames.Dashboard,
    icon: <HomeOutlinedIcon />,
    link: RoutePaths.Dashboard,
  },
  // { name: RouteNames.Surveys, icon: <ListAltIcon />, link: RoutePaths.Surveys },
  { name: RouteNames.Reviews, icon: <AppsIcon />, link: RoutePaths.Reviews },
  { name: RouteNames.Socials, icon: <PeopleIcon />, link: RoutePaths.Socials },
  {
    name: RouteNames.Settings,
    icon: <SettingsIcon />,
    link: RoutePaths.Settings,
  },
];

const SideNav: React.FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handlePageClick(link: RoutePaths, name: RouteNames) {
    navigate(link);
    dispatch(setPageName(name));
  }

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(true)}>
      {Pages.map((item, index, link) => (
        <ListItem
          button
          key={index}
          onClick={() => handlePageClick(item.link, item.name)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        variant="temporary"
        anchor={'left'}
        onClose={() => setOpen(false)}
      >
        {getList()}
      </Drawer>
    </>
  );
};

export default SideNav;
