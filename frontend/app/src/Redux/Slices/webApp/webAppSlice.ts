import { createSlice } from '@reduxjs/toolkit';
import { RouteNames } from '../../../Components/Router/RoutesConstants';
import { RootState } from '../../store';
import { AppNames } from './webAppConstants';

interface GlobalState {
  pageName: RouteNames;
  appName: AppNames;
}

const initialState: GlobalState = {
  pageName: RouteNames.SignIn,
  appName: AppNames.Facebook,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setAppName: (state, action) => {
      state.appName = action.payload;
    },
  },
});

// selectors
export const selectPageName = (state: RootState) => state.global.pageName;
export const selectAppName = (state: RootState) => state.global.appName;

// actions
export const { setPageName } = globalSlice.actions;
export const { setAppName } = globalSlice.actions;

// reducer
export default globalSlice.reducer;
