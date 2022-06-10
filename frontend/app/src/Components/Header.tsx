import React from 'react';
import { AppBar, 
    Box, 
    Toolbar, 
    Typography, 
    IconButton, 
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppsIcon from '@mui/icons-material/Apps'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const data = [
  {name: "Dashboard", icon: <HomeOutlinedIcon />, link: '/dashboard'},
  { name: "Surveys", icon: <ListAltIcon />, link: '/surveys' },
  { name: "Review Apps", icon: <AppsIcon />, link: '/reviews' },
  { name: "Social Media", icon: <PeopleIcon />, link: '/socials' },
];

export default function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(true)}>
      {data.map((item, index, link) => (
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
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
            <MenuIcon />
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                {getList()}
            </Drawer>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Datalytic
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
