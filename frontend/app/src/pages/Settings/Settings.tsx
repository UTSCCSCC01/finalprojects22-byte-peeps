import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { FacebookSetup } from '../../Components/FacebookSetup/FacebookSetup';
import { InactiveApiChecker } from '../../Components/InactiveApiChecker/InactiveApiChecker';
import { InstagramSetup } from '../../Components/InstagramSetup/InstagramSetup';
import { RedditSetup } from '../../Components/RedditSetup/RedditSetup';
import { RouteNames } from '../../Components/Router/RoutesConstants';
import TabPanel, { a11yProps } from '../../Components/TabPanel/TabPanel';
import { TwitterSetup } from '../../Components/TwitterSetup/TwitterSetup';
import { YelpSetup } from '../../Components/YelpSetup/YelpSetup';
import { YoutubeSetup } from '../../Components/YoutubeSetup/YoutubeSetup';
import { useAppDispatch } from '../../Redux/hooks';
import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';
import { setPageName } from '../../Redux/Slices/webApp/webAppSlice';
import './Settings.css';

interface Props {}

const tabLabels: string[] = [
  AppNames.Facebook,
  AppNames.Instagram,
  AppNames.Twitter,
  AppNames.YouTube,
  AppNames.Reddit,
  // 'Google',
  AppNames.Yelp,
];

const tabIcons: JSX.Element[] = [
  <FacebookRoundedIcon />,
  <InstagramIcon />,
  <TwitterIcon />,
  <YouTubeIcon />,
  <RedditIcon />,
  // <GoogleIcon />,
  <StarIcon />,
];

const tabPanels: JSX.Element[] = [
  <FacebookSetup />,
  <InstagramSetup />,
  <TwitterSetup />,
  <YoutubeSetup />,
  <RedditSetup />,
  // <ToBeImplemented />,
  <YelpSetup />,
];

const Settings: React.FunctionComponent<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName(RouteNames.Settings));
  }, [dispatch]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <InactiveApiChecker />
      <Box sx={{ boxSizing: 'border-box' }} className="page">
        <Box
          className="center"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabIcons.map((icon, i) => (
              <Tab icon={icon} label={tabLabels[i]} key={i} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        {tabPanels.map((panel, i) => (
          <TabPanel key={i} value={value} index={i}>
            <div className="center tabPanelContainer">
              <div className="tabPanel">{panel}</div>
            </div>
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default Settings;
