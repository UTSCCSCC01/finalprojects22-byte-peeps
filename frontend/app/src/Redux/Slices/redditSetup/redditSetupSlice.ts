import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveSubreddit } from './redditSetupAPI';

export interface redditSetupState {
 status: 'loading' | 'reddit-not-set-up' | 'active' | 'change',
 subreddit: string | null,
 newSubreddit: string,
 // Notification
 notificationShown: boolean,
 notificationMessage: string,
 notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: redditSetupState = {
  status: 'loading',
  subreddit: null,
  newSubreddit: '',
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success',
};

export const getSettingsAsync = createAsyncThunk(
  'redditSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectSubredditAsync = createAsyncThunk(
  'redditSetup/saveSubreddit',
  async (newSubreddit: string) => {
    return await saveSubreddit(newSubreddit);
  }
);

export const redditSetupSlice = createSlice({
  name: 'redditSetup',
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
    setNewSubreddit: (state, action) => {
      state.newSubreddit = action.payload;
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
        state.subreddit = action.payload.subreddit;
      })
      .addCase(connectSubredditAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectSubredditAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.subreddit = action.payload.subreddit;
        state.notificationShown = true;
        state.notificationMessage = action.payload.message;
        state.notificationType = action.payload.status == 'active' ? 'success' : 'error';
      });
  },
});

export const { setStatus, setNewSubreddit, setNotificationMessage, setNotificationShown, setNotificationType } = redditSetupSlice.actions;

export const selectStatus = (state: RootState) => state.redditSetup.status;
export const selectSubreddit = (state: RootState) => state.redditSetup.subreddit;
export const selectNotificationShown = (state: RootState) => state.redditSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.redditSetup.notificationMessage;
export const selectNotificationType = (state: RootState) => state.redditSetup.notificationType;
export const selectNewSubreddit = (state: RootState) => state.redditSetup.newSubreddit;

export default redditSetupSlice.reducer;