import { AxiosError } from 'axios';
import { ErrorResponse } from './enums';

export function extractBackendError(error: AxiosError<ErrorResponse> | null) {
  return error?.response?.data?.message ?? null;
}
