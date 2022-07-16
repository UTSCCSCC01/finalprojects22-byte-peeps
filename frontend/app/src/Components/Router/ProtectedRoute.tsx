import { Navigate } from 'react-router-dom';
import { useGetSession } from '../AuthStorage/AuthStorage';
import { RoutePaths } from './RoutesConstants';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const [isSignedIn] = useGetSession();

  if (!isSignedIn) return <Navigate to={RoutePaths.SignIn} />;

  return <>{props.children}</>;
};

export default ProtectedRoute;
