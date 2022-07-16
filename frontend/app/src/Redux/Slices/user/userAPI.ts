import { AxiosResponse } from 'axios';
import HTTP from '../../../utils/http';
import { User } from './userSliceConstants';

export async function signInAPI(user: User): Promise<AxiosResponse> {
  return await HTTP.post('/user/signin', {
    username: user.username,
    password: user.password,
  });
}

export async function signOutAPI(): Promise<AxiosResponse> {
  return await HTTP.post('/user/signout');
}

export async function signUpAPI(user: User): Promise<AxiosResponse> {
  return await HTTP.post('/user/signup', {
    username: user.username,
    password: user.password,
  });
}
