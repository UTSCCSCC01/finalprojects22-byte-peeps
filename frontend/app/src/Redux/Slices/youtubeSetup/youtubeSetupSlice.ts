import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getYouTubeSetupNotification } from '../../../Components/YoutubeSetup/YoutubeSetup';
import { RootState } from '../../store';
import {
  fetchSettings,
  populateFirstTime,
  saveChannel,
} from './youtubeSetupAPI';

export interface youtubeSetupState {
  status: 'loading' | 'youtube-not-set-up' | 'active' | 'change';
  channel: string | null;
  newChannel: string;
}

const initialState: youtubeSetupState = {
  status: 'loading',
  channel: null,
  newChannel: '',
};

export const getSettingsAsync = createAsyncThunk(
  'youtubeSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectChannelAsync = createAsyncThunk(
  'youtubeSetup/saveChannel',
  async (newChannel: string, thunkApi) => {
    const response = await saveChannel(newChannel);
    thunkApi.dispatch(populateFirstTimeAsync());
    return response;
  }
);

const populateFirstTimeAsync = createAsyncThunk(
  'youtubeSetup/populateFirstTime',
  async () => {
    return await populateFirstTime();
  }
);

export const youtubeSetupSlice = createSlice({
  name: 'youtubeSetup',
  initialState,
  reducers: {
    setNewChannel: (state, action) => {
      state.newChannel = action.payload;
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
        state.channel = action.payload.channel;
      })
      .addCase(connectChannelAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectChannelAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.channel = action.payload.channel;

        const notification = getYouTubeSetupNotification();
        notification.setMessage(action.payload.message);
        notification.setType(
          action.payload.status === 'active' ? 'success' : 'error'
        );
        notification.setShown(true);
      });
  },
});

export const { setStatus, setNewChannel } = youtubeSetupSlice.actions;

export const selectStatus = (state: RootState) => state.youtubeSetup.status;
export const selectChannel = (state: RootState) => state.youtubeSetup.channel;
export const selectNewChannel = (state: RootState) =>
  state.youtubeSetup.newChannel;

export default youtubeSetupSlice.reducer;
