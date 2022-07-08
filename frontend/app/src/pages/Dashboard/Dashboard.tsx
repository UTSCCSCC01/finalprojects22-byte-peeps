import React, { useEffect } from 'react';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import { useAppDispatch } from '../../Redux/hooks';
import { setPageName } from '../../Redux/Slices/global/globalSlice';

import './Dashboard.css';

interface Props {}

const Dashboard: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Dashboard));
  }, [dispatch]);

  return <></>;
};

export default Dashboard;
