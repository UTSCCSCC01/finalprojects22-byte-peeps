import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchCurrentPage, fetchPages, saveCurrentPage } from './facebookLoginWrapperAPI';

export interface FacebookLoginWrapperState {
  stage: 'loading' | 'logIn' | 'selectPage' | 'active' | 'inactive',
  pages: { id: string, name: string, access_token: string }[]
  currentPage: string | null,
  // Notification
  notificationShown: boolean,
  notificationMessage: string,
  notificationType: 'success' | 'error' | 'warning' | 'info'
}

const initialState: FacebookLoginWrapperState = {
  stage: "loading",
  pages: [],
  currentPage: null,
  notificationShown: false,
  notificationMessage: '',
  notificationType: 'success'
};

export const getCurrentPageAsync = createAsyncThunk(
  'facebookLoginWrapper/fetchPages',
  async () => {
    return await fetchCurrentPage();
  }
);

export const saveCurrentPageAsync = createAsyncThunk(
  'facebookLoginWrapper/saveCurrentPage',
  async (page: { name: string, token: string }) => {
    return await saveCurrentPage(page.name, page.token);
  }
);

export const retrievePagesAsync = createAsyncThunk(
  'facebookLoginWrapper/getPages',
  async (token: string) => {
    return await fetchPages(token);
  }
);

export const facebookLoginWrapperSlice = createSlice({
  name: 'facebookLoginWrapper',
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentPageAsync.pending, (state) => {
        state.stage = "loading";
      })
      .addCase(getCurrentPageAsync.fulfilled, (state, action) => {
        if (action.payload == null) {
          state.stage = "logIn";
          state.currentPage = null;
        } else if (!action.payload) {
          state.stage = "inactive";
          state.currentPage = null;
        } else {
          state.stage = "active";
          state.currentPage = (action.payload as {id: string, name: string}).name;          
        }
      })
      .addCase(saveCurrentPageAsync.pending, (state) => {
        state.stage = "loading";
      })
      .addCase(saveCurrentPageAsync.fulfilled, (state, action) => {
        state.stage = "active";
        state.currentPage = action.payload;
        state.notificationShown = true;
        state.notificationMessage = "Page settings has been saved successfully!";
        state.notificationType = "success";
      })
      .addCase(retrievePagesAsync.pending, (state) => {
        state.stage = "loading";
      })
      .addCase(retrievePagesAsync.fulfilled, (state, action) => {
        state.pages = action.payload
        state.stage = "selectPage";
      });
  },
});

export const { setCurrentPage, setNotificationMessage, setNotificationShown, setNotificationType } = facebookLoginWrapperSlice.actions;

export const selectStage = (state: RootState) => state.facebookLoginWrapper.stage;
export const selectNotificationShown = (state: RootState) => state.facebookLoginWrapper.notificationShown;
export const selectNotificationMessage = (state: RootState) => state.facebookLoginWrapper.notificationMessage;
export const selectNotificationType = (state: RootState) => state.facebookLoginWrapper.notificationType;
export const selectPages = (state: RootState) => state.facebookLoginWrapper.pages;
export const selectCurrentPage = (state: RootState) => state.facebookLoginWrapper.currentPage;

export default facebookLoginWrapperSlice.reducer;