import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSettings, saveCurrentPage } from './facebookLoginWrapperAPI';

export interface FacebookLoginWrapperState {
  status: 'loading' | 'loggedIn' | 'loggedOut',
  saveButtonStatus: 'loading' | 'idle',
  displaySettingsSaved: boolean,
  pages: { name: string, value: string }[]
  currentPage: string | null,
}

const initialState: FacebookLoginWrapperState = {
  status: "loading",
  saveButtonStatus: 'idle',
  displaySettingsSaved: false,
  pages: [],
  currentPage: null
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
    setDisplaySettingsSaved: (state, action) => {
      state.displaySettingsSaved = action.payload;
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
          state.displaySettingsSaved = true;
        }
      });
  },
});

export const { setLoggedIn, setCurrentPage, setDisplaySettingsSaved } = facebookLoginWrapperSlice.actions;

export const selectStatus = (state: RootState) => state.facebookLoginWrapper.status;
export const selectSaveButtonStatus = (state: RootState) => state.facebookLoginWrapper.saveButtonStatus;
export const selectDisplaySettingsSaved = (state: RootState) => state.facebookLoginWrapper.displaySettingsSaved;
export const selectPages = (state: RootState) => state.facebookLoginWrapper.pages;
export const selectCurrentPage = (state: RootState) => state.facebookLoginWrapper.currentPage;

export default facebookLoginWrapperSlice.reducer;