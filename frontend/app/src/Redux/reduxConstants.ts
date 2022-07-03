export enum ReduxStatus {
  success = 'success',
  failed = 'failed',
  loading = 'loading',
  idle = 'idle',
}

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
