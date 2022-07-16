import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectSignInStatus } from '../../Redux/Slices/user/userSlice';

interface Props {
  children: React.ReactNode;
}

const IsSignedIn: React.FC<Props> = (props) => {
  const isSignedIn = useAppSelector(selectSignInStatus);

  return <>{isSignedIn && props.children}</>;
};

export default IsSignedIn;
