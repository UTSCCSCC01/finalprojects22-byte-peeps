import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import Surveys from './pages/Surveys';
import ReviewApps from './pages/ReviewApps';
import SocialMedia from './pages/SocialMedia';
import { RoutePaths } from './RoutesConstants';
import SignIn from './pages/Auth/SignIn';

interface Props {}

const RouterComponent: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={RoutePaths.SignIn} element={<SignIn />} />
        <Route path={RoutePaths.SignUp} element={<SignUp />} />
        <Route path={RoutePaths.Dashboard} element={<Dashboard />} />
        <Route path={RoutePaths.Surveys} element={<Surveys />} />
        <Route path={RoutePaths.Reviews} element={<ReviewApps />} />
        <Route path={RoutePaths.Socials} element={<SocialMedia />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
