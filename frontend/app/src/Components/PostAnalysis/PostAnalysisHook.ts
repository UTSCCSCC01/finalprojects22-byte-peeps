import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../Redux/hooks';
import {
  selectEndDate,
  selectStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import { selectAppName } from '../../Redux/Slices/webApp/webAppSlice';
import { ErrorResponse } from '../../utils/enums';
import HTTP from '../../utils/http';
import { extractBackendError } from '../../utils/httpHelpers';
import { platformPostsUrls } from './PostAnalysisConst';

type PostsResponse = { id: number; label: string; date: string; pid: string }[];

function usePlatformPosts() {
  const appName = useAppSelector(selectAppName);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const appDataUrl = platformPostsUrls[appName];

  const getPosts = async (
    startDate: String,
    endDate: String
  ): Promise<PostsResponse> => {
    const params = { startDate, endDate };
    return await HTTP.get(appDataUrl, { params }).then((res) => res.data);
  };

  const query = useQuery<
    PostsResponse,
    AxiosError<ErrorResponse>,
    PostsResponse | null
  >(['posts', startDate, endDate], () => getPosts(startDate, endDate));

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: extractBackendError(query.error),
  };
}

export default usePlatformPosts;
