export const selectAuthorized = state => Boolean(state.authorized.token);
export const selectUser = state => state.authorized.user;
export const selectUserToken = state => state.authorized.token;
export const selectUserRefreshToken = state => state.authorized.refreshToken;
export const selectError = state => state.authorized.error;