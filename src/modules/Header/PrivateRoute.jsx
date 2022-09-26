import authSelectors from '../../src/redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { PropTypes } from "prop-types";

export default function PrivateRoute({ component, navigateTo = '/' }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={navigateTo} />;
}

// PrivateRoute.propTypes = {
//   component: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,

//   redirectTo: PropTypes.string,
// };
