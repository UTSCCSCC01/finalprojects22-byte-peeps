import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveCurrentPage } from './facebookLoginWrapperAPI';

export interface FacebookLoginWrapperState {
  status: 'loading' | 'loggedIn' | 'loggedOut',
  saveButtonStatus: 'loading' | 'idle',
  pages: { name: string, value: string }[]
  currentPage: string | null,
  notificationShown: boolean,
  notificationMessage: string,
  notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: FacebookLoginWrapperState = {
  status: "loading",
  saveButtonStatus: 'idle',
  pages: [],
  currentPage: null,
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success'
};

export const getSettingsAsync = createAsyncThunk(
  'facebookLoginWrapper/fetchPages',
  async () => {
    return await fetchSettings();
  }
);

export const saveCurrentPageAsync = createAsyncThunk(
  'facebookLoginWrapper/saveCurrentPage',
  async (page: string) => {
    return await saveCurrentPage(page);
  }
);

export const facebookLoginWrapperSlice = createSlice({
  name: 'facebookLoginWrapper',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.status = action.payload;
    },
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSettingsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "loggedIn";
          state.currentPage = action.payload.currentPage;
          state.pages = action.payload.pages;
        } else {
          state.status = "loggedOut";
          state.pages = [];
        }
      })
      .addCase(saveCurrentPageAsync.pending, (state) => {
        state.status = "loading";
        state.saveButtonStatus = "loading";
      })
      .addCase(saveCurrentPageAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "loggedIn";
          state.saveButtonStatus = "idle";
          state.notificationShown = true;
          state.notificationMessage = "Page settings has been saved successfully!";
          state.notificationType = "success";
        }
      });
  },
});

export const { setLoggedIn, setCurrentPage, setNotificationMessage, setNotificationShown, setNotificationType } = facebookLoginWrapperSlice.actions;

export const selectStatus = (state: RootState) => state.facebookLoginWrapper.status;
export const selectSaveButtonStatus = (state: RootState) => state.facebookLoginWrapper.saveButtonStatus;
export const selectNotificationShown = (state: RootState) => state.facebookLoginWrapper.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.facebookLoginWrapper.notificationMessage;
export const selectNotificationType = (state: RootState) => state.facebookLoginWrapper.notificationType;
export const selectPages = (state: RootState) => state.facebookLoginWrapper.pages;
export const selectCurrentPage = (state: RootState) => state.facebookLoginWrapper.currentPage;

export default facebookLoginWrapperSlice.reducer;