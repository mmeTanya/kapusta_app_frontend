const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user.name;

const getUserEmail = state => state.auth.user.email;

const getIsRefreshing = state => state.auth.isRefreshing;

const getAuthToken = state => state.auth.token;

const getAuthUser = state => state.auth.user;

const authSelectors = {
  getIsLoggedIn,
  getIsRefreshing,
  getUserName,
  getUserEmail,
  getAuthToken,
  getAuthUser,
};

export default authSelectors;
