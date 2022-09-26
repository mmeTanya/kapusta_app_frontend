import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from 'redux/auth/authSlice';
import { useSearchParams } from 'react-router-dom';
import LoaderPage from 'modules/LoaderPage';

// import style from './GoogleRedirectPage.module.css';

const GoogleRedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    dispatch(setToken({ token }));
    navigate('/home', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoaderPage />;
};

export default GoogleRedirectPage;
