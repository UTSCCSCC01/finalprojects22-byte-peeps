import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTwitterSetupNotification } from '../../../Components/TwitterSetup/TwitterSetup';
import { RootState } from '../../store';
import {
  fetchSettings,
  populateFirstTime,
  saveUsername,
} from './twitterSetupAPI';

export interface TwitterSetupState {
  status: 'loading' | 'twitter-not-set-up' | 'active' | 'change';
  username: string | null;
  newUsername: string;
  fetchState: 'fetching' | 'fetched' | null;
}

const initialState: TwitterSetupState = {
  status: 'loading',
  username: null,
  newUsername: '',
  fetchState: null,
};

export const getSettingsAsync = createAsyncThunk(
  'twitterSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectUsernameAsync = createAsyncThunk(
  'twitterSetup/saveUsername',
  async (newUsername: string, thunkApi) => {
    const response = await saveUsername(newUsername);
    thunkApi.dispatch(populateFirstTimeAsync());
    return response;
  }
);

const populateFirstTimeAsync = createAsyncThunk(
  'twitterSetup/populateFirstTime',
  async () => {
    return await populateFirstTime();
  }
);

export const twitterSetupSlice = createSlice({
  name: 'twitterSetup',
  initialState,
  reducers: {
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

        const notification = getTwitterSetupNotification();
        notification.setMessage(action.payload.message);
        notification.setType(
          action.payload.status === 'active' ? 'success' : 'error'
        );
        notification.setShown(true);
      })
      .addCase(populateFirstTimeAsync.pending, (state) => {
        state.fetchState = 'fetching';
      })
      .addCase(populateFirstTimeAsync.fulfilled, (state) => {
        state.fetchState = 'fetched';
      });
  },
});

export const { setStatus, setNewUsername } = twitterSetupSlice.actions;

export const selectStatus = (state: RootState) => state.twitterSetup.status;
export const selectUsername = (state: RootState) => state.twitterSetup.username;
export const selectNewUsername = (state: RootState) =>
  state.twitterSetup.newUsername;
export const selectFetchState = (state: RootState) =>
  state.twitterSetup.fetchState;

export default twitterSetupSlice.reducer;
