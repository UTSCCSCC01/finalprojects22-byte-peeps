import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchSentimentAnalysis, fetchFacebookStats } from './facebookAPI';

export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
}

interface Stats {
  totalLikes: number;
  totalComments: number;
}

// Define a type for the slice state
export interface FacebookState {
  sentimentAnalysis: SentimentAnalysis | null;
  isSentimentAnalysisLoading: boolean;
  isStatsLoading: boolean;
  error: string | null;
  startDate: String;
  endDate: String;
  stats: Stats | null;
}

// Define the initial state using that type
const initialState: FacebookState = {
  sentimentAnalysis: null,
  isStatsLoading: false,
  isSentimentAnalysisLoading: false,
  error: null,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  stats: null,
};

export const getCommentsSentimentAnalysis = createAsyncThunk(
  'facebook/sentiment_analysis',
  async (_, { dispatch, getState, rejectWithValue }: any) => {
    const startDate = selectStartDate(getState())
      .split('T')[0]
      .replaceAll('-', '');
    const endDate = selectEndDate(getState()).split('T')[0].replaceAll('-', '');
    const response = await fetchSentimentAnalysis(startDate, endDate);
    return response;
  }
);

export const getFacebookStats = createAsyncThunk(
  'facebook/stats',
  async (_, { dispatch, getState, rejectedWithValue }: any) => {
    const startDate = selectStartDate(getState())
      .split('T')[0]
      .replaceAll('-', '');
    const endDate = selectEndDate(getState()).split('T')[0].replaceAll('-', '');
    const response = await fetchFacebookStats(startDate, endDate);
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

    builder
      .addCase(getFacebookStats.pending, (state) => {
        state.isStatsLoading = true;
      })
      .addCase(getFacebookStats.fulfilled, (state, { payload }) => {
        state.isStatsLoading = false;
        state.stats = payload;
      })
      .addCase(getFacebookStats.rejected, (state, { payload }: any) => {
        state.isStatsLoading = false;
        state.stats = null;
      });
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
export const selectFacebookStats = (state: RootState) => state.facebook.stats;
export const selectIsStatsLoading = (state: RootState) =>
  state.facebook.isStatsLoading;

export default facebookSlice.reducer;
