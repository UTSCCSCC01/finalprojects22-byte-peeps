import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../Router/RoutesConstants';
import './Logo.css';
interface Props {}

const Logo: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(RoutePaths.Dashboard);
  };

  return (
    <Typography
      variant="h6"
      color="inherit"
      component="div"
      className="logoContainer"
      onClick={handleLogoClick}
    >
      <img src="/images/logo-white.png" alt="logo" className="logo" />
    </Typography>
  );
};

export default Logo;
