import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveUsername } from './twitterSetupAPI';

export interface TwitterSetupState {
  status: 'loading' | 'twitter-not-set-up' | 'active' | 'change';
  username: string | null;
  newUsername: string;
  // Notification
  notificationShown: boolean;
  notificationMessage: string;
  notificationType: 'success' | 'error' | 'warning' | 'info';
}

const initialState: TwitterSetupState = {
  status: 'loading',
  username: null,
  newUsername: '',
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success',
};

export const getSettingsAsync = createAsyncThunk(
  'twitterSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectUsernameAsync = createAsyncThunk(
  'twitterSetup/saveUsername',
  async (newUsername: string) => {
    return await saveUsername(newUsername);
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
    setNewUsername: (state, action) => {
      state.newUsername = action.payload;
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
        state.username = action.payload.username;
      })
      .addCase(connectUsernameAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectUsernameAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.username = action.payload.username;
        state.notificationShown = true;
        state.notificationMessage = action.payload.message;
        state.notificationType =
          action.payload.status == 'active' ? 'success' : 'error';
      });
  },
});

export const {
  setStatus,
  setNewUsername,
  setNotificationMessage,
  setNotificationShown,
  setNotificationType,
} = twitterSetupSlice.actions;

export const selectStatus = (state: RootState) => state.twitterSetup.status;
export const selectUsername = (state: RootState) => state.twitterSetup.username;
export const selectNotificationShown = (state: RootState) =>
  state.twitterSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) =>
  state.twitterSetup.notificationMessage;
export const selectNotificationType = (state: RootState) =>
  state.twitterSetup.notificationType;
export const selectNewUsername = (state: RootState) =>
  state.twitterSetup.newUsername;

export default twitterSetupSlice.reducer;
