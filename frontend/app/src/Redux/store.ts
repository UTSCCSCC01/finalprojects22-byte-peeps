import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './Slices/counter/counterSlice';
import facebookSetupReducer from './Slices/facebookSetup/facebookSetupSlice';
import instagramSetupReducer from './Slices/instagramSetup/instagramSetupSlice';
import facebookReducer from './Slices/facebook/facebookSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    facebookSetup: facebookSetupReducer,
    instagramSetup: instagramSetupReducer,
    facebook: facebookReducer
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