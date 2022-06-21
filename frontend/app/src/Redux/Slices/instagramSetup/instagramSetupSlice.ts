import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, savePage } from './instagramSetupAPI';

export interface InstagramSetupState {
 status: 'loading' | 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive',
 page: { id: string, name: string } | null,
 connectedPageId: string | null,
 // Notification
 notificationShown: boolean,
 notificationMessage: string,
 notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: InstagramSetupState = {
  status: 'loading',
  page: null,
  connectedPageId: null,
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success'
};

export const getSettingsAsync = createAsyncThunk(
  'instagramSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectPageAsync = createAsyncThunk(
  'instagramSetup/savePage',
  async () => {
    return await savePage();
  }
);

export const instagramSetupSlice = createSlice({
  name: 'instagramSetup',
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSettingsAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.page = action.payload.page;
        state.connectedPageId = action.payload.connectedPageId;
      })
      .addCase(connectPageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(connectPageAsync.fulfilled, (state, action) => {
        state.status = "active"
        state.notificationShown = true;
        state.notificationMessage = "Instagram page has been connected successfully!";
        state.notificationType = "success";
      });
  },
});

export const { setNotificationMessage, setNotificationShown, setNotificationType } = instagramSetupSlice.actions;

export const selectStatus = (state: RootState) => state.instagramSetup.status;
export const selectPage = (state: RootState) => state.instagramSetup.page;
export const selectConnectedPageId = (state: RootState) => state.instagramSetup.connectedPageId;
export const selectNotificationShown = (state: RootState) => state.instagramSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.instagramSetup.notificationMessage;
export const selectNotificationType = (state: RootState) => state.instagramSetup.notificationType;

export default instagramSetupSlice.reducer;