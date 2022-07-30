import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInstagramSetupNotification } from '../../../Components/InstagramSetup/InstagramSetup';
import { RootState } from '../../store';
import {
  fetchSettings,
  populateFirstTime,
  savePage,
} from './instagramSetupAPI';

export interface InstagramSetupState {
  status: 'loading' | 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive';
  page: { id: string; name: string } | null;
  connectedPageId: string | null;
  fetchState: 'fetching' | 'fetched' | null;
}

const initialState: InstagramSetupState = {
  status: 'loading',
  page: null,
  connectedPageId: null,
  fetchState: null,
};

export const getSettingsAsync = createAsyncThunk(
  'instagramSetup/fetchSettings',
  async () => {
    return await fetchSettings();
  }
);

export const connectPageAsync = createAsyncThunk(
  'instagramSetup/savePage',
  async (params, thunkApi) => {
    const response = await savePage();
    thunkApi.dispatch(populateFirstTimeAsync());
    return response;
  }
);

const populateFirstTimeAsync = createAsyncThunk(
  'instagramSetup/populateFirstTime',
  async () => {
    return await populateFirstTime();
  }
);

export const instagramSetupSlice = createSlice({
  name: 'instagramSetup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSettingsAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.page = action.payload.page;
        state.connectedPageId = action.payload.connectedPageId;
      })
      .addCase(connectPageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectPageAsync.fulfilled, (state, action) => {
        state.status = 'active';
        state.connectedPageId = state.page!.id;

        const notification = getInstagramSetupNotification();
        notification.setMessage(
          'Instagram page has been connected successfully!'
        );
        notification.setType('success');
        notification.setShown(true);
      })
      .addCase(populateFirstTimeAsync.pending, (state) => {
        state.fetchState = 'fetching';
      })
      .addCase(populateFirstTimeAsync.fulfilled, (state) => {
        state.fetchState = 'fetched';
      });
  },
});

export const selectStatus = (state: RootState) => state.instagramSetup.status;
export const selectPage = (state: RootState) => state.instagramSetup.page;
export const selectConnectedPageId = (state: RootState) =>
  state.instagramSetup.connectedPageId;
export const selectFetchState = (state: RootState) =>
  state.instagramSetup.fetchState;

export default instagramSetupSlice.reducer;
