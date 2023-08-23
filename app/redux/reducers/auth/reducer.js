import types from './actions';

const initialState = {
  accessToken: '',
  userData: {},
  notification: {},
  editProfileData: {},
  activeScreen: '',

};

export default function reducer(state = initialState, action) {
  // console.log('Reducer Change AUTH ===> ', action.type, action);
  switch (action.type) {
    case 'persist/REHYDRATE':
      if (
        action.payload &&
        action.payload.auth &&
        action.payload.auth.introShown
      ) {
        return {
          ...state,
          ...action.payload.auth,
          introShown: false,
        };
      }
      return state;
    case types.SET_USER_DATA:
      console.log(`${types.SET_USER_DATA} => `);
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_NOTIFICATIONS:
      console.log(`${types.SET_NOTIFICATIONS} => `);
      return {
        ...state,
        notification: action.notification,
      };
    case types.SET_EDITPROFILEDATA:
      console.log(`${types.SET_EDITPROFILEDATA} => `);
      return {
        ...state,
        editProfileData: action.editProfileData,
      };
      case types.SET_ACTIVE_SCREEN:
        return {
          ...state,
          activeScreen: action.activeScreen,
        };
    case types.SET_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    // case types.SET_INTRO:
    //   return {
    //     ...state,
    //     introScreens: action.introScreens,
    //   };

    // case types.LOGOUT:
    //   return {
    //     ...state,
    //     userData: {},
    //     accessToken: '',
    //     userType: '',
    //     coins: 0,
    //   };


    default:
      return state;
  }
}
