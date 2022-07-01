import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './Slices/counter/counterSlice';
import facebookSetupReducer from './Slices/facebookSetup/facebookSetupSlice';
import instagramSetupReducer from './Slices/instagramSetup/instagramSetupSlice';
import twitterSetupReducer from './Slices/twitterSetup/twitterSetupSlice';
import redditSetupReducer from './Slices/redditSetup/redditSetupSlice';
import youtubeSetupReducer from './Slices/youtubeSetup/youtubeSetupSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    facebookSetup: facebookSetupReducer,
    instagramSetup: instagramSetupReducer,
    twitterSetup: twitterSetupReducer,
    redditSetup: redditSetupReducer,
    youtubeSetup: youtubeSetupReducer,
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