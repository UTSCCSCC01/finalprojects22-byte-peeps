import { useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { setUsername } from '../../Redux/Slices/user/userSlice';
import { keyName, userObjType } from './AuthStorageConstants';

function storeSession(username: string, sessionId: string): void {
  let userObj: userObjType = {
    username,
    sessionId,
  };
  sessionStorage.setItem(keyName, JSON.stringify(userObj));
}

function removeSession(): void {
  sessionStorage.removeItem(keyName);
}

function getSession(): void | userObjType {
  let userObjString = sessionStorage.getItem(keyName);
  if (!userObjString) return;

  let userObj: userObjType = JSON.parse(userObjString);
  return userObj;
}

export function useGetSession(): [boolean] {
  const dispatch = useAppDispatch();
  const [isSignedIn] = useState<boolean>(checkForSession());

  function checkForSession(): boolean {
    const userObj = getSession();
    if (!userObj) return false;
    dispatch(setUsername(userObj.username));
    return true;
  }

  return [isSignedIn];
}

const AuthStorage = {
  getSession,
  storeSession,
  removeSession,
};

export default AuthStorage;
