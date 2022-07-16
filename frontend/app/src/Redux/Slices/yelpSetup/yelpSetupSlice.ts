import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getYelpSetupNotification } from '../../../Components/YelpSetup/YelpSetup';
import { RootState } from '../../store';
import { fetchSettings, saveBusiness, searchBusiness } from './yelpSetupAPI';

export interface YelpSetupState {
  status:
    | 'loading'
    | 'yelp-not-set-up'
    | 'choose-business'
    | 'active'
    | 'change';
  business: string | null;
  newBusiness: { id: string; name: string };
  searchObject: { term: string; location: string };
  searchResults: { id: string; name: string }[] | null;
}

const initialState: YelpSetupState = {
  status: 'loading',
  business: null,
  newBusiness: { id: '', name: '' },
  searchObject: { term: '', location: '' },
  searchResults: null,
};

export const getSettingsAsync = createAsyncThunk(
  'yelpSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const searchBusinessAsync = createAsyncThunk(
  'yelpSetup/searchBusiness',
  async (searchObject: { term: string; location: string }) => {
    return await searchBusiness(searchObject);
  }
);

export const connectBusinessAsync = createAsyncThunk(
  'yelpSetup/saveBusiness',
  async (newBusiness: { id: string; name: string }) => {
    return await saveBusiness(newBusiness);
  }
);

export const yelpSetupSlice = createSlice({
  name: 'yelpSetup',
  initialState,
  reducers: {
    setNewBusiness: (state, action) => {
      state.newBusiness = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchObject.term = action.payload;
    },
    setSearchLocation: (state, action) => {
      state.searchObject.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSettingsAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.business = action.payload.business;
      })
      .addCase(searchBusinessAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBusinessAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.searchResults = action.payload.searchResults;

        const notification = getYelpSetupNotification();
        notification.setMessage(action.payload.message);
        notification.setType(
          action.payload.status === 'choose-business' ? 'success' : 'error'
        );
        notification.setShown(true);
      })
      .addCase(connectBusinessAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectBusinessAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.business = action.payload.business;

        const notification = getYelpSetupNotification();
        notification.setMessage(action.payload.message);
        notification.setType(
          action.payload.status === 'active' ? 'success' : 'error'
        );
        notification.setShown(true);
      });
  },
});

export const { setStatus, setNewBusiness, setSearchTerm, setSearchLocation } =
  yelpSetupSlice.actions;

export const selectStatus = (state: RootState) => state.yelpSetup.status;
export const selectBusiness = (state: RootState) => state.yelpSetup.business;
export const selectNewBusiness = (state: RootState) =>
  state.yelpSetup.newBusiness;
export const selectSearchObject = (state: RootState) =>
  state.yelpSetup.searchObject;
export const selectSearchResults = (state: RootState) =>
  state.yelpSetup.searchResults;

export default yelpSetupSlice.reducer;
