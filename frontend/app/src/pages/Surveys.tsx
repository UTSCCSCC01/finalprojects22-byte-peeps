import React, { useEffect } from 'react';
import { RouteNames } from '../Components/Router/RoutesConstants';
import { useAppDispatch } from '../Redux/hooks';
import { setPageName } from '../Redux/Slices/global/globalSlice';

interface Props {}

const Surveys: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Surveys));
  }, [dispatch]);
  return <></>;
};

export default Surveys;
