import React, { useEffect } from 'react';
import { RouteNames } from '../Components/Router/RoutesConstants';
import { useAppDispatch } from '../Redux/hooks';
import { setPageName } from '../Redux/Slices/global/globalSlice';

interface Props {}

const ReviewApps: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Reviews));
  }, [dispatch]);

  return <></>;
};

export default ReviewApps;
