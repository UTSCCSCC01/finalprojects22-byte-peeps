import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { signOut } from '../../Redux/Slices/user/userSlice';
import './SignOutBtn.css';

interface Props {}

const SignOutBtn: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut({}));
  };

  return (
    <Button
      color="inherit"
      variant="text"
      onClick={() => handleSignOut()}
      className="signOut"
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
