import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from './redux/auth/auth-operations';
import authSelectors from './redux/auth/auth-selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './modules/navigation/components/AppBar';
import GoogleRedirectPage from 'views/GoogleRedirectPage/GoogleRedirectPage';
import { ProtectedRoute } from 'hoc/ProtectedRoute';
import LoaderPage from './modules/LoaderPage';
import LoaderSection from 'modules/LoaderSection';

const AuthPage = lazy(() => import('./views/AuthPage/AuthPage'));
const HomePage = lazy(() => import('./views/HomePage'));
const ReportsPage = lazy(() => import('./views/ReportsPage'));
const AddTransactions = lazy(() => import('./views/AddTransactions'));
const Category = lazy(() => import('views/ReportsPage/Categories'));
const Chart = lazy(() => import('views/ReportsPage/Chart'));

export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsRefreshing);
  const isAuth = !!useSelector(authSelectors.getAuthToken);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch, isAuth]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <LoaderPage />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<AppBar position="fixed" />}>
              <Route
                index
                element={
                  <ProtectedRoute redirectPath={'/home'} isAllowed={!isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <AuthPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                element={
                  <ProtectedRoute redirectPath={'/home'} isAllowed={!isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <AuthPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />

              <Route
                path="home"
                element={
                  <ProtectedRoute redirectPath={'/'} isAllowed={isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <HomePage />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route
                  path=":type"
                  element={
                    <Suspense fallback={<LoaderSection />}>
                      <Category />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="add_expenses"
                element={
                  <ProtectedRoute redirectPath={'/'} isAllowed={isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <AddTransactions />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="add_income"
                element={
                  <ProtectedRoute redirectPath={'/'} isAllowed={isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <AddTransactions />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute redirectPath={'/'} isAllowed={isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <ReportsPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route
                  path=":categoryId"
                  element={
                    <Suspense fallback={<LoaderSection />}>
                      <Chart />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="google-redirect"
                element={
                  <ProtectedRoute redirectPath={'/home'} isAllowed={!isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <GoogleRedirectPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <ProtectedRoute redirectPath={'/'} isAllowed={!isAuth}>
                    <Suspense fallback={<LoaderPage />}>
                      <AuthPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </>
      )}
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
