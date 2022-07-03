import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRedditSetupNotification } from '../../../Components/RedditSetup/RedditSetup';
import { RootState } from '../../store';
import { fetchSettings, saveSubreddit } from './redditSetupAPI';

export interface redditSetupState {
  status: 'loading' | 'reddit-not-set-up' | 'active' | 'change';
  subreddit: string | null;
  newSubreddit: string;
}

const initialState: redditSetupState = {
  status: 'loading',
  subreddit: null,
  newSubreddit: ''
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

        const notification = getRedditSetupNotification();
        notification.setMessage(action.payload.message);
        notification.setType(action.payload.status === 'active' ? 'success' : 'error');
        notification.setShown(true);          
      });
  },
});

export const {
  setStatus,
  setNewSubreddit
} = redditSetupSlice.actions;

export const selectStatus = (state: RootState) => state.redditSetup.status;
export const selectSubreddit = (state: RootState) =>
  state.redditSetup.subreddit;
export const selectNewSubreddit = (state: RootState) =>
  state.redditSetup.newSubreddit;

export default redditSetupSlice.reducer;
