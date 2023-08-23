const actions = {
  SET_ACCESSTOKEN: 'auth/SET_ACCESSTOKEN',
  SET_USER_DATA: 'auth/SET_USER_DATA',
  SET_INTRO: 'auth/SET_INTRO',
  LOGOUT: 'auth/LOGOUT',
  SET_NOTIFICATIONS: 'auth/SET_NOTIFICATIONS',
  SET_EDITPROFILEDATA: 'auth/SET_EDITPROFILEDATA',
  SET_ACTIVE_SCREEN: 'SET_ACTIVE_SCREEN',





  setAccessToken: accessToken => dispatch =>
    dispatch({
      type: actions.SET_ACCESSTOKEN,
      accessToken,
    }),

  setUserData: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_USER_DATA,
        userData: data,
      });
  },
  setNotification: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_NOTIFICATIONS,
        notification: data,
      });
  },

  setEditProfileData: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_EDITPROFILEDATA,
        editProfileData: data,
      });
  },


  setIntro: introScreens => dispatch =>
    dispatch({
      type: actions.SET_INTRO,
      introScreens,
    }),

    // chatM
    setActiveScreen: (activeScreen) => (dispatch) =>
    dispatch({
      type: actions.SET_ACTIVE_SCREEN,
      activeScreen,
    }),


  logOut: () => (dispatch, getState) => {
    // const IOSocket = getState().socket.IOSocket;
    // if (IOSocket) {
    //   IOSocket.disconnect();
    //   dispatch(socketActions.disconnectCall());
    //   dispatch(socketActions.clearChatData());
    // }
    dispatch({
      type: actions.LOGOUT,
    });
  },

};

export default actions;
