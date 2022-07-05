import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthStorage from '../../../Components/AuthStorage/AuthStorage';
import { history } from '../../../Components/Router/RouterComponent';
import { RoutePaths } from '../../../Components/Router/RoutesConstants';
import { ErrorResponse, ReduxStatus } from '../../reduxConstants';
import { AppDispatch, RootState } from '../../store';
import { signInAPI, signOutAPI, signUpAPI } from './userAPI';
import { User } from './userSliceConstants';

interface UserState {
  username: string;
  signInStatus: ReduxStatus;
  signOutStatus: ReduxStatus;
  signUpStatus: ReduxStatus;
  errorMessage: string;
}

const initialState: UserState = {
  username: '',
  signInStatus: ReduxStatus.idle,
  signOutStatus: ReduxStatus.idle,
  signUpStatus: ReduxStatus.idle,
  errorMessage: '',
};

export const signIn = createAsyncThunk<
  null | ErrorResponse,
  User,
  {
    dispatch: AppDispatch;
  }
>('user/signIn', async (user, thunkAPI) => {
  try {
    const response = await signInAPI(user);
    AuthStorage.storeSession(user.username);
    thunkAPI.dispatch(setUsername(user.username));
    history.push(RoutePaths.Dashboard);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const signOut = createAsyncThunk<
  null | ErrorResponse,
  {},
  {
    dispatch: AppDispatch;
  }
>('user/signOut', async (user, thunkAPI) => {
  try {
    const response = await signOutAPI();
    AuthStorage.removeSession();
    thunkAPI.dispatch(setUsername(''));
    history.push(RoutePaths.SignIn);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const signUp = createAsyncThunk<
  null | ErrorResponse,
  User,
  {
    dispatch: AppDispatch;
  }
>('user/signUp', async (user, thunkAPI) => {
  try {
    const response = await signUpAPI(user);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInStatus = ReduxStatus.loading;
        state.signOutStatus = ReduxStatus.idle;
        state.signUpStatus = ReduxStatus.idle;
        state.errorMessage = '';
      })
      .addCase(signIn.fulfilled, (state) => {
        state.signInStatus = ReduxStatus.success;
        state.errorMessage = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInStatus = ReduxStatus.failed;
        state.errorMessage = String(action.payload);
      })
      .addCase(signOut.pending, (state) => {
        state.signOutStatus = ReduxStatus.loading;
        state.signInStatus = ReduxStatus.idle;
        state.signUpStatus = ReduxStatus.idle;
        state.errorMessage = '';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.signOutStatus = ReduxStatus.success;
        state.errorMessage = '';
        state.username = '';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutStatus = ReduxStatus.failed;
        state.errorMessage = String(action.payload);
      })
      .addCase(signUp.pending, (state) => {
        state.signUpStatus = ReduxStatus.loading;
        state.signInStatus = ReduxStatus.idle;
        state.signOutStatus = ReduxStatus.idle;
        state.errorMessage = '';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpStatus = ReduxStatus.success;
        state.errorMessage = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = ReduxStatus.failed;
        state.errorMessage = String(action.payload);
      });
  },
});

// selectors
export const selectSignInStatus = (state: RootState) =>
  state.user.username !== '';
export const selectSignInLoading = (state: RootState) =>
  state.user.signInStatus === ReduxStatus.loading;
export const selectSignInError = (state: RootState) =>
  state.user.signInStatus === ReduxStatus.failed;

export const selectSignOutStatus = (state: RootState) =>
  state.user.signOutStatus === ReduxStatus.success;
export const selectSignOutLoading = (state: RootState) =>
  state.user.signOutStatus === ReduxStatus.loading;
export const selectSignOutError = (state: RootState) =>
  state.user.signOutStatus === ReduxStatus.failed;

export const selectSignUpStatus = (state: RootState) =>
  state.user.signUpStatus === ReduxStatus.success;
export const selectSignUpLoading = (state: RootState) =>
  state.user.signUpStatus === ReduxStatus.loading;
export const selectSignUpError = (state: RootState) =>
  state.user.signUpStatus === ReduxStatus.failed;

export const selectUserErrorMessage = (state: RootState) =>
  state.user.errorMessage;

export const selectUserName = (state: RootState) => state.user.username;

// actions
export const { setUsername } = userSlice.actions;

// reducer
export default userSlice.reducer;
