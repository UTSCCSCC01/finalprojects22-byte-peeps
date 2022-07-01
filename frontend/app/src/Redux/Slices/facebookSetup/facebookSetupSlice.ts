import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  fetchCurrentPage,
  fetchPages,
  saveCurrentPage,
} from './facebookSetupAPI';

export interface FacebookSetupState {
  stage: 'loading' | 'logIn' | 'selectPage' | 'active' | 'inactive' | 'change';
  pages: { id: string; name: string; access_token: string }[];
  currentPage: string | null;
  // Notification
  notificationShown: boolean;
  notificationMessage: string;
  notificationType: 'success' | 'error' | 'warning' | 'info';
}

const initialState: FacebookSetupState = {
  stage: 'loading',
  pages: [],
  currentPage: null,
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success',
};

export const getCurrentPageAsync = createAsyncThunk(
  'facebookSetup/fetchCurrentPage',
  async () => {
    return await fetchCurrentPage();
  }
);

export const saveCurrentPageAsync = createAsyncThunk(
  'facebookSetup/saveCurrentPage',
  async (pageToken: string) => {
    return await saveCurrentPage(pageToken);
  }
);

export const retrievePagesAsync = createAsyncThunk(
  'facebookSetup/fetchPages',
  async (token: string) => {
    return await fetchPages(token);
  }
);

export const facebookSetupSlice = createSlice({
  name: 'facebookSetup',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNotificationShown: (state, action) => {
      state.notificationShown = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
    setNotificationType: (state, action) => {
      state.notificationType = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentPageAsync.pending, (state) => {
        state.stage = 'loading';
      })
      .addCase(getCurrentPageAsync.fulfilled, (state, action) => {
        if (action.payload === 'not-set-up') {
          state.stage = 'logIn';
          state.currentPage = null;
        } else if (action.payload === 'inactive') {
          state.stage = 'inactive';
          state.currentPage = null;
        } else {
          state.stage = 'active';
          state.currentPage = (
            action.payload as { id: string; name: string }
          ).name;
        }
      })
      .addCase(saveCurrentPageAsync.pending, (state) => {
        state.stage = 'loading';
      })
      .addCase(saveCurrentPageAsync.fulfilled, (state, action) => {
        state.stage = 'active';
        state.currentPage = action.payload;
        state.notificationShown = true;
        state.notificationMessage =
          'Page settings has been saved successfully!';
        state.notificationType = 'success';
      })
      .addCase(retrievePagesAsync.pending, (state) => {
        state.stage = 'loading';
      })
      .addCase(retrievePagesAsync.fulfilled, (state, action) => {
        state.pages = action.payload;
        state.stage = 'selectPage';
      });
  },
});

export const {
  setStage,
  setCurrentPage,
  setNotificationMessage,
  setNotificationShown,
  setNotificationType,
} = facebookSetupSlice.actions;

export const selectStage = (state: RootState) => state.facebookSetup.stage;
export const selectNotificationShown = (state: RootState) =>
  state.facebookSetup.notificationShown;
export const selectNotificationMessage = (state: RootState) =>
  state.facebookSetup.notificationMessage;
export const selectNotificationType = (state: RootState) =>
  state.facebookSetup.notificationType;
export const selectPages = (state: RootState) => state.facebookSetup.pages;
export const selectCurrentPage = (state: RootState) =>
  state.facebookSetup.currentPage;

export default facebookSetupSlice.reducer;
