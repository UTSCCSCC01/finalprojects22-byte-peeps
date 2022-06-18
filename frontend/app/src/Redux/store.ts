import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './Slices/counter/counterSlice';
import facebookLoginWrapperReducer from './Slices/facebookLoginWrapper/facebookLoginWrapperSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    facebookLoginWrapper: facebookLoginWrapperReducer
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