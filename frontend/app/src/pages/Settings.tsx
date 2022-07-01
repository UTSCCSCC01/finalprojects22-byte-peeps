import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import { FacebookSetup } from '../Components/FacebookSetup/FacebookSetup';
import { InstagramSetup } from '../Components/InstagramSetup/InstagramSetup';
import { TwitterSetup } from '../Components/TwitterSetup/TwitterSetup';
import { RedditSetup } from '../Components/RedditSetup/RedditSetup';
import { YoutubeSetup } from '../Components/YoutubeSetup/YoutubeSetup';

export interface ISettProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings: React.FunctionComponent<ISettProps> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ margin: '20px 40px', boxSizing: 'border-box' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab
              icon={<FacebookRoundedIcon />}
              label="Facebook"
              {...a11yProps(0)}
            />
            <Tab icon={<InstagramIcon />} label="Instagram" {...a11yProps(1)} />
            <Tab icon={<TwitterIcon />} label="Twitter" {...a11yProps(2)} />
            <Tab icon={<YouTubeIcon />} label="YouTube" {...a11yProps(3)} />
            <Tab icon={<RedditIcon />} label="Reddit" {...a11yProps(4)} />
            <Tab icon={<GoogleIcon />} label="Google" {...a11yProps(5)} />
            <Tab icon={<StarIcon />} label="Yelp" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FacebookSetup />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InstagramSetup />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TwitterSetup />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <YoutubeSetup />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <RedditSetup />
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );
}

export default Settings