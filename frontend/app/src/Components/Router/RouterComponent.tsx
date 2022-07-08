import { createBrowserHistory } from 'history';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import SignIn from '../../pages/Auth/SignIn';
import SignUp from '../../pages/Auth/SignUp';
import Dashboard from '../../pages/Dashboard';
import ReviewApps from '../../pages/ReviewApps';
import Settings from '../../pages/Settings';
import SocialMedia from '../../pages/SocialMedia';
import Surveys from '../../pages/Surveys';
import Header from '../Header/Header';
import ProtectedRoute from './ProtectedRoute';
import { RoutePaths } from './RoutesConstants';

interface Props {}

export const history = createBrowserHistory({ window });

const RouterComponent: React.FC<Props> = () => {
  return (
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route path={RoutePaths.SignIn} element={<SignIn />} />
        <Route path={RoutePaths.SignUp} element={<SignUp />} />
        <Route
          path={RoutePaths.Dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutePaths.Surveys}
          element={
            <ProtectedRoute>
              <Surveys />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutePaths.Reviews}
          element={
            <ProtectedRoute>
              <ReviewApps />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutePaths.Socials}
          element={
            <ProtectedRoute>
              <SocialMedia />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutePaths.Settings}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HistoryRouter>
  );
};

export default RouterComponent;