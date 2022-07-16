import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { FacebookSetup } from '../../Components/FacebookSetup/FacebookSetup';
import { InactiveApiChecker } from '../../Components/InactiveApiChecker/InactiveApiChecker';
import { InstagramSetup } from '../../Components/InstagramSetup/InstagramSetup';
import { RedditSetup } from '../../Components/RedditSetup/RedditSetup';
import TabPanel, { a11yProps } from '../../Components/TabPanel/TabPanel';
import ToBeImplemented from '../../Components/ToBeImplemented/ToBeImplemented';
import { TwitterSetup } from '../../Components/TwitterSetup/TwitterSetup';
import { YoutubeSetup } from '../../Components/YoutubeSetup/YoutubeSetup';
import './Settings.css';
import { YelpSetup } from '../../Components/YelpSetup/YelpSetup';

interface Props {}

const tabLabels: string[] = [
  'Facebook',
  'Instagram',
  'Twitter',
  'YouTube',
  'Reddit',
  'Google',
  'Yelp',
];

const tabIcons: JSX.Element[] = [
  <FacebookRoundedIcon />,
  <InstagramIcon />,
  <TwitterIcon />,
  <YouTubeIcon />,
  <RedditIcon />,
  <GoogleIcon />,
  <StarIcon />,
];

const tabPanels: JSX.Element[] = [
  <FacebookSetup />,
  <InstagramSetup />,
  <TwitterSetup />,
  <YoutubeSetup />,
  <RedditSetup />,
  <ToBeImplemented />,
  <YelpSetup />,
];

const Settings: React.FunctionComponent<Props> = () => {
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
