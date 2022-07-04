import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { selectSignInStatus } from '../../Redux/Slices/user/userSlice';
import { RoutePaths } from './RoutesConstants';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const isSignedIn = useAppSelector(selectSignInStatus);

  if (!isSignedIn) return <Navigate to={RoutePaths.SignIn} />;

  return <>{props.children}</>;
};

export default ProtectedRoute;
