import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './Slices/counter/counterSlice';
import facebookSetupReducer from './Slices/facebookSetup/facebookSetupSlice';
import instagramSetupReducer from './Slices/instagramSetup/instagramSetupSlice';
import userReducer from './Slices/user/userSlice';
import twitterSetupReducer from './Slices/twitterSetup/twitterSetupSlice';
import redditSetupReducer from './Slices/redditSetup/redditSetupSlice';
import youtubeSetupReducer from './Slices/youtubeSetup/youtubeSetupSlice';
import yelpSetupReducer from './Slices/yelpSetup/yelpSetupSlice';
import facebookReducer from './Slices/facebook/facebookSlice';
import globalReducer from './Slices/webApp/webAppSlice';
import dateRangeReducer from './Slices/dateSelector/dateSelectorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    facebookSetup: facebookSetupReducer,
    instagramSetup: instagramSetupReducer,
    user: userReducer,
    twitterSetup: twitterSetupReducer,
    redditSetup: redditSetupReducer,
    youtubeSetup: youtubeSetupReducer,
    yelpSetup: yelpSetupReducer,
    facebook: facebookReducer,
    global: globalReducer,
    dateRange: dateRangeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
