import React, { useEffect } from 'react';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import { useAppDispatch } from '../../Redux/hooks';
import { setPageName } from '../../Redux/Slices/webApp/webAppSlice';

interface Props {}

const Dashboard: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Dashboard));
  }, [dispatch]);

  return <></>;
};

export default Dashboard;
