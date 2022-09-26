import { useSelector } from 'react-redux';
import authSelectors from '../../src/redux/auth/auth-selectors';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({
  component,
  navigateTo = '/',
  restricted = false,
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const shouldRedirect = isLoggedIn && restricted;

  return !shouldRedirect ? component : <Navigate to={navigateTo} />;
}
