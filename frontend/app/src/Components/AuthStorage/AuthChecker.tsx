import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectUserName, setUsername } from '../../Redux/Slices/user/userSlice';
import { RoutePaths } from '../Router/RoutesConstants';
import { history } from '../Router/RouterComponent';
import { keyName } from './AuthStorageConstants';

interface Props {}

const AuthChecker: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxUsername = useAppSelector(selectUserName);

  useEffect(() => {
    window.onstorage = function (e) {
      if (e.key === keyName) {
        // if user was signed out on a different tab and current tab is not signIn
        // they didn't click signOut from this tab
        if (
          e.oldValue &&
          !e.newValue &&
          !history.location.pathname.includes(RoutePaths.SignIn)
        ) {
          navigate(RoutePaths.SignIn);
          dispatch(setUsername(''));
        }
      }
    };
  }, [navigate, dispatch, reduxUsername]);
  return null;
};

export default AuthChecker;
