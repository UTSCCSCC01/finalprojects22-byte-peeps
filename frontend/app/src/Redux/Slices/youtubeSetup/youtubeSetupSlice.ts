import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveChannel } from './youtubeSetupAPI';

export interface youtubeSetupState {
 status: 'loading' | 'youtube-not-set-up' | 'active' | 'change',
 channel: string | null,
 newChannel: string,
 // Notification
 notificationShown: boolean,
 notificationMessage: string,
 notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: youtubeSetupState = {
  status: 'loading',
  channel: null,
  newChannel: '',
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success'
};

export const getSettingsAsync = createAsyncThunk(
  'youtubeSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectChannelAsync = createAsyncThunk(
  'youtubeSetup/saveChannel',
  async (newChannel: string) => {
    return await saveChannel(newChannel);
  }
);

export const youtubeSetupSlice = createSlice({
  name: 'youtubeSetup',
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
        state.notificationShown = true;
        state.notificationMessage = action.payload.message;
        state.notificationType = action.payload.status == 'active' ? 'success' : 'error';
      });
  },
});

export const { setStatus, setNewChannel, setNotificationMessage, setNotificationShown, setNotificationType } = youtubeSetupSlice.actions;

export const selectStatus = (state: RootState) => state.youtubeSetup.status;
export const selectChannel = (state: RootState) => state.youtubeSetup.channel;
export const selectNotificationShown = (state: RootState) => state.youtubeSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.youtubeSetup.notificationMessage;
export const selectNotificationType = (state: RootState) => state.youtubeSetup.notificationType;
export const selectNewChannel = (state: RootState) => state.youtubeSetup.newChannel;

export default youtubeSetupSlice.reducer;