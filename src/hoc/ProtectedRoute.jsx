import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.node,
};
