import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import alertReducer from '../features/alert/alertSlice';
import shiftReducer from '../features/shift/shiftSlice';

export const store = configureStore({
  reducer: {
    shift: shiftReducer,
    alert: alertReducer
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