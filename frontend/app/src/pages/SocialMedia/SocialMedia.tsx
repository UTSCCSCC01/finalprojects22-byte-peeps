import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import TabPanel, { a11yProps } from '../../Components/TabPanel/TabPanel';
import { useAppDispatch } from '../../Redux/hooks';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { setAppName, setPageName } from '../../Redux/Slices/webApp/webAppSlice';
import FacebookTab from './Facebook/FacebookTab';
import InstagramTab from './Instagram/InstagramTab';
import RedditTab from './Reddit/RedditTab';
import TwitterTab from './Twitter/TwitterTab';
import YoutubeTab from './YouTube/YoutubeTab';

interface Props {}

const tabLabels: string[] = [
  'Facebook',
  'Instagram',
  'Twitter',
  'YouTube',
  'Reddit',
];

const tabIcons: JSX.Element[] = [
  <FacebookRoundedIcon />,
  <InstagramIcon />,
  <TwitterIcon />,
  <YouTubeIcon />,
  <RedditIcon />,
];

const tabPanels: React.ReactNode[] = [
  <FacebookTab />,
  <InstagramTab />,
  <TwitterTab />,
  <YoutubeTab />,
  <RedditTab />,
];

const tabAppNames: AppNames[] = [
  AppNames.Facebook,
  AppNames.Instagram,
  AppNames.Twitter,
  AppNames.YouTube,
  AppNames.Reddit,
];

const SocialMedia: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Socials));
  }, [dispatch]);

  const [currTab, setCurrTab] = React.useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrTab(newTab);
    dispatch(setAppName(tabAppNames[newTab]));
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
              onClick={() => dispatchAppName(tabAppNames[i])}
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

export default SocialMedia;
