import { AppBar, Box, Toolbar } from '@mui/material';
import DateSelector from '../DateSelector/DateSelector';
import IsSignedIn from '../IsSignedIn/IsSignedIn';
import Logo from '../Logo/Logo';
import PageName from '../PageName/PageName';
import SideNav from '../SideNav/SideNav';
import SignOutBtn from '../SignOutBtn/SignOutBtn';
import UserInfo from '../UserInfo/UserInfo';
import './Header.css';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolBar">
          <IsSignedIn>
            <SideNav />
          </IsSignedIn>
          <Logo />
          <IsSignedIn>
            <PageName />
          </IsSignedIn>
          <div className="rightComponent">
            <IsSignedIn>
              <DateSelector />
              <UserInfo className="userInfo" />
              <SignOutBtn />
            </IsSignedIn>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
