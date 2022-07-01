import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveUser } from './twitterSetupAPI';

export interface TwitterSetupState {
 status: 'loading' | 'twitter-not-set-up' | 'active' | 'change',
 user: { id: string, username: string } | null,
 username: string,
 // Notification
 notificationShown: boolean,
 notificationMessage: string,
 notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: TwitterSetupState = {
  status: 'loading',
  user: null,
  username: '',
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success'
};

export const getSettingsAsync = createAsyncThunk(
  'twitterSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectUserAsync = createAsyncThunk(
  'twitterSetup/saveUser',
  async (username: string) => {
    return await saveUser(username);
  }
);

export const twitterSetupSlice = createSlice({
  name: 'twitterSetup',
  initialState,
  reducers: {
    setNotificationShown: (state, action) => {
      state.notificationShown = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
    setNotificationType: (state, action) => {
      state.notificationType = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSettingsAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.user = action.payload.user;
      })
      .addCase(connectUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectUserAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.user = action.payload.user;
        state.notificationShown = true;
        state.notificationMessage = action.payload.message;
        state.notificationType = action.payload.status == 'active' ? 'success' : 'error';
      });
  },
});

export const { setStatus, setUsername, setNotificationMessage, setNotificationShown, setNotificationType } = twitterSetupSlice.actions;

export const selectStatus = (state: RootState) => state.twitterSetup.status;
export const selectUser = (state: RootState) => state.twitterSetup.user;
export const selectNotificationShown = (state: RootState) => state.twitterSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.twitterSetup.notificationMessage;
export const selectNotificationType = (state: RootState) => state.twitterSetup.notificationType;
export const selectUsername = (state: RootState) => state.twitterSetup.username;

export default twitterSetupSlice.reducer;