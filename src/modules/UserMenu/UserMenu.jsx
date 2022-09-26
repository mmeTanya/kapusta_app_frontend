import { useSelector, useDispatch } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import { logOut } from '../../redux/auth/auth-operation';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: 'auto',
  },
};

export default function UserMenu() {
  const name = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();
  const isLoggIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    isLoggIn && (
      <>
        <div style={styles.container}>
          <h2>Welcome,{name}</h2>

          <button
            className="mr-10"
            variant="outline-success"
            type="button"
            onClick={() => dispatch(logOut())}
          >
            LogOut
          </button>
        </div>
      </>
    )
  );
}
