import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { signOut } from '../../Redux/Slices/user/userSlice';
import { Button } from '@mui/material';

interface Props {}

const SignOutBtn: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut({}));
  };

  return (
    <Button color="inherit" variant="text" onClick={() => handleSignOut()}>
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
