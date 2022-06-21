import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveCurrentPage } from './instagramSetupAPI';

export interface InstagramSetupState {
 status: 'loading' | 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive',
 pages: {id: string, name: string}[],
 currentPageId: string | null
 // Notification
 notificationShown: boolean,
 notificationMessage: string,
 notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: InstagramSetupState = {
  status: 'loading',
  pages: [],
  currentPageId: null,
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

export const saveCurrentPageAsync = createAsyncThunk(
  'instagramSetup/saveCurrentPage',
  async (pageId: string) => {
    return await saveCurrentPage(pageId);
  }
);

export const instagramSetupSlice = createSlice({
  name: 'instagramSetup',
  initialState,
  reducers: {
    setCurrentPageId: (state, action) => {
      state.currentPageId = action.payload;
    },
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
        state.pages = action.payload.pages;
        state.currentPageId = action.payload.currentId;
      })
      .addCase(saveCurrentPageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCurrentPageAsync.fulfilled, (state, action) => {
        state.status = "active"
        state.notificationShown = true;
        state.notificationMessage = "Instagram page has been connected successfully!";
        state.notificationType = "success";
      });
  },
});

export const { setCurrentPageId, setNotificationMessage, setNotificationShown, setNotificationType } = instagramSetupSlice.actions;

export const selectStatus = (state: RootState) => state.instagramSetup.status;
export const selectPages = (state: RootState) => state.instagramSetup.pages;
export const selectCurrentPageId = (state: RootState) => state.instagramSetup.currentPageId;
export const selectNotificationShown = (state: RootState) => state.instagramSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.instagramSetup.notificationMessage;
export const selectNotificationType = (state: RootState) => state.instagramSetup.notificationType;

export default instagramSetupSlice.reducer;