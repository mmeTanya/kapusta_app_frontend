import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from './AppBar.module.css';
import logo from '../../../../images/icons/logo.svg';
import { LogoutBtn } from '../../../LogoutBtn/LogoutBtn';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';

function AppBar() {
  const isAuth = !!useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <header className={s.header}>
        <Link to="/">
          <img src={logo} alt="Logo" className={s.logo} />
        </Link>
        {isAuth && <LogoutBtn />}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppBar;
