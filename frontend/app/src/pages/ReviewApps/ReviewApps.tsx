import GoogleIcon from '@mui/icons-material/Google';
import StarIcon from '@mui/icons-material/Star';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import TabPanel, { a11yProps } from '../../Components/TabPanel/TabPanel';
import { useAppDispatch } from '../../Redux/hooks';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { setAppName, setPageName } from '../../Redux/Slices/webApp/webAppSlice';
import GoogleReviewsTab from './GoogleReviews/GoogleReviewsTab';
import YelpTab from './Yelp/YelpTab';

interface Props {}

const tabLabels: AppNames[] = [AppNames.Yelp, AppNames.GoogleReviews];

const tabIcons: JSX.Element[] = [<StarIcon />, <GoogleIcon />];

const tabPanels: React.ReactNode[] = [<YelpTab />, <GoogleReviewsTab />];

const ReviewApps: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Reviews));
  }, [dispatch]);

  const [currTab, setCurrTab] = React.useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrTab(newTab);
  };

  function dispatchAppName(appName: AppNames) {
    dispatch(setAppName(appName));
  }

  return (
    <div className="page">
      <Box className="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {tabIcons.map((icon, i) => (
            <Tab
              icon={icon}
              label={tabLabels[i]}
              key={i}
              {...a11yProps(i)}
              onClick={() => dispatchAppName(tabLabels[i])}
            />
          ))}
        </Tabs>
      </Box>
      {tabPanels.map((panel, i) => (
        <TabPanel key={i} value={currTab} index={i} className="tabPage">
          {panel}
        </TabPanel>
      ))}
    </div>
  );
};

export default ReviewApps;
