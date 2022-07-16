export enum ResponseStatus {
  success = 200 | 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500 | 504,
}

export type ErrorResponse = {
  message: string;
};

export enum SentimentAnalysisColors {
  Positive = '#0088FE',
  Negative = '#71a6de',
  Neutral = '#09213b',
}

export enum MUITheme {
  main = '#1976d2',
  light = '#42a5f5',
  dark = '#1565c0',
}
