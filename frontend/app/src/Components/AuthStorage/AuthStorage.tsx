import { useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { setUsername } from '../../Redux/Slices/user/userSlice';
import { keyName } from './AuthStorageConstants';

/**
 * Stores the username in the session API storage
 * @param {string} username
 * @return {void}
 */
function storeSession(username: string): void {
  sessionStorage.setItem(keyName, username);
}

/**
 * Removes the username in the session API storage
 * @return {void}
 */
function removeSession(): void {
  sessionStorage.removeItem(keyName);
}

/**
 * Gets the current session if there is one
 * @return {null | string}
 */
function getSession(): null | string {
  return sessionStorage.getItem(keyName);
}

/**
 * Custom hook to see if there is a session based on the session API storage
 * @return { [boolean]}
 */
export function useGetSession(): [boolean] {
  const dispatch = useAppDispatch();
  const [isSignedIn] = useState<boolean>(checkForSession);

  function checkForSession(): boolean {
    const username = getSession();
    if (!username) return false;
    dispatch(setUsername(username));
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
