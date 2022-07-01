import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSentimentAnalysis } from './facebookAPI';

export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
}

// Define a type for the slice state
export interface FacebookState {
  sentimentAnalysis: SentimentAnalysis | null;
  isSentimentAnalysisLoading: boolean;
  error: string | null;
  startDate: String;
  endDate: String;
}

// Define the initial state using that type
const initialState: FacebookState = {
  sentimentAnalysis: {
    positive: -1,
    neutral: -1,
    negative: -1,
  },
  isSentimentAnalysisLoading: false,
  error: null,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
};

export const getCommentsSentimentAnalysis = createAsyncThunk(
  'facebook/sentiment_analysis',
  async (_, { dispatch, getState, rejectWithValue }: any) => {
    const startDate = selectStartDate(getState())
      .split('T')[0]
      .replaceAll('-', '');
    const endDate = selectEndDate(getState()).split('T')[0].replaceAll('-', '');
    const response = await fetchSentimentAnalysis(startDate, endDate);
    console.log(response);
    return response;
  }
);

export const facebookSlice = createSlice({
  name: 'facebook',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsSentimentAnalysis.pending, (state) => {
        state.isSentimentAnalysisLoading = true;
        state.error = null;
      })
      .addCase(getCommentsSentimentAnalysis.fulfilled, (state, { payload }) => {
        state.isSentimentAnalysisLoading = false;
        state.sentimentAnalysis = payload;
        state.error = null;
      })
      .addCase(
        getCommentsSentimentAnalysis.rejected,
        (state, { payload }: any) => {
          state.isSentimentAnalysisLoading = false;
          state.sentimentAnalysis = null;
          state.error =
            payload?.message ||
            'There was a problem retrieving the sentiment analysis data.';
        }
      );
  },
});

export const { setStartDate, setEndDate } = facebookSlice.actions;

export const selectSentimentAnalysis = (state: RootState) =>
  state.facebook.sentimentAnalysis;
export const selectStartDate = (state: RootState) => state.facebook.startDate;
export const selectEndDate = (state: RootState) => state.facebook.endDate;
export const selectError = (state: RootState) => state.facebook.error;
export const selectIsSentimentAnalysisLoading = (state: RootState) =>
  state.facebook.isSentimentAnalysisLoading;

export default facebookSlice.reducer;
