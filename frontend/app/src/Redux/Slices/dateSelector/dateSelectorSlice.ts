import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { addDays } from 'date-fns';

/**
 * Given a date formats it to a string in the format YYYYMMDD, otherwise returns an empty string
 * @param {date: Date | null | undefined} date
 * @return {string}
 */
export function formatDate(date: Date | null | undefined): string {
  return date ? date.toISOString().split('T')[0].replaceAll('-', '') : '';
}

/**
 * Given a string in the format YYYYMMDD, formats it to a date, otherwise returns null
 * @param {string} date
 * @return {Date | null}
 */
export function createDate(date: string): Date | null {
  if (date.length !== 8) return null;

  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(4, 6));
  const day = parseInt(date.substring(6, 8));
  return new Date(year, month - 1, day);
}

export interface DateRangeState {
  startDate: string;
  endDate: string;
}

const initialState: DateRangeState = {
  startDate: formatDate(addDays(new Date(), -14)),
  endDate: formatDate(new Date()),
};

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

// selectors
export const selectStartDate = (state: RootState) => state.dateRange.startDate;
export const selectEndDate = (state: RootState) => state.dateRange.endDate;

// actions
export const { setStartDate } = dateRangeSlice.actions;
export const { setEndDate } = dateRangeSlice.actions;

// reducer
export default dateRangeSlice.reducer;
