import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFacebookSetupNotification } from '../../../Components/FacebookSetup/FacebookSetup';
import { RootState } from '../../store';
import { getSettingsAsync } from '../instagramSetup/instagramSetupSlice';
import {
  fetchCurrentPage,
  fetchPages,
  populateFirstTime,
  saveCurrentPage,
} from './facebookSetupAPI';

export interface FacebookSetupState {
  stage: 'loading' | 'logIn' | 'selectPage' | 'active' | 'inactive' | 'change';
  pages: { id: string; name: string; access_token: string }[];
  currentPage: string | null;
}

const initialState: FacebookSetupState = {
  stage: 'loading',
  pages: [],
  currentPage: null,
};

export const getCurrentPageAsync = createAsyncThunk(
  'facebookSetup/fetchCurrentPage',
  async () => {
    return await fetchCurrentPage();
  }
);

export const saveCurrentPageAsync = createAsyncThunk(
  'facebookSetup/saveCurrentPage',
  async (pageToken: string, thunkApi) => {
    const status = await saveCurrentPage(pageToken);
    thunkApi.dispatch(getSettingsAsync());
    thunkApi.dispatch(populateFirstTimeAsync());
    return status;
  }
);

const populateFirstTimeAsync = createAsyncThunk(
  'facebookSetup/populateFirstTime',
  async () => {
    return await populateFirstTime();
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

        const notification = getFacebookSetupNotification();
        notification.setMessage('Page settings has been saved successfully!');
        notification.setType('success');
        notification.setShown(true);
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

export const { setCurrentPage, setStage } = facebookSetupSlice.actions;

export const selectStage = (state: RootState) => state.facebookSetup.stage;
export const selectPages = (state: RootState) => state.facebookSetup.pages;
export const selectCurrentPage = (state: RootState) =>
  state.facebookSetup.currentPage;

export default facebookSetupSlice.reducer;
