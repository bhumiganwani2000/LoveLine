/* eslint-disable no-undef */
const devMode = __DEV__;

// local url
const baseUrl = devMode
  ? 'http://192.168.1.14:3030/'
  : 'http://192.168.1.14:3030/';

const socketURL = 'http://192.168.1.18:3030/';

// live url
// const baseUrl = devMode
//   ? 'http://3.111.127.0:501/'
//   : 'http://3.111.127.0:501/';

const BaseSetting = {
  // local
  siteUrl: 'http://192.168.1.431/',

  socketURL: 'http://192.168.1.66:3030/',

  // live
  // siteUrl: 'http://3.111.127.0:501/',

  //   sailsUrl: devMode
  //     ? 'http://192.168.0.170:8088/'
  //     : 'https://api.couchmeets.com',
  // socketURL: devMode
  //   ? 'http://192.168.1.18:3030/'
  //   : 'https://api.couchmeets.com/',
  name: 'LoveLine',
  displayName: 'LoveLine',
  //   appVersionCode: '905',
  //   bugsnagApiKey: '2b0ddf1d304d8aea3612decb142d8165',
  //   domain: devMode ? 'http://192.168.0.107:3000' : 'http://api.couchmeets.com/',
  baseUrl,
  //   api: `${baseUrl}/api/`,
  api: `${baseUrl}`,
  shareEndPoint: baseUrl,
  //   googleClientId:
  //     '396978798701-bauu3da5c6rarbr6iem2a35ato4lg8bf.apps.googleusercontent.com',
  //   googlePlacesAutocomplete: 'AIzaSyCe8OjI3vl6yU280Lq6EW2IFwOZiOIa4NA',
  endpoints: {
    register: 'api/register',
    otpVerify: 'api/verifyOtp',
    updateUser: 'api/updateUser',
    login: 'api/login',
    forgotPassword: 'api/forgotPassword',
    changepassword: 'api/forgotpasswordchange',
    userLocation: 'api/updateUserLocation',
    resendOtp: 'api/resendOtp',
    homepageList: 'api/findNearestUser',
    like: 'api/homePage/addToMyLike',
    disLike: 'api/homePage/addToDislike',
    likeMe: 'api/homePage/listOfLikeMe',
    myLike: 'api/homePage/listOfMyLike',
    editPRofile: 'api/profile/editProfile',
    addProfilePic: 'api/myProfile/addProfilePic',
    updateNotification: 'api/profile/updateNotification',
    cmsPages: 'api/profile/getAllCMSPage',
    getSingleCMSPages: 'api/profile/getSingleCMSPage',
    messageList: 'api/myProfile/getChatList',
    getQuizQuestion: 'api/quiz/getQuizQuestion',
    answerQuizQuestion: 'api/quiz/answerQuizQuestion',
    findQuizTelepath: 'api/quiz/findQuizTelepath',
    socailGoogle: 'api/socialMediaLogin',
    newMatches: 'api/myProfile/getNewMatches',
    socketApi: 'api/myProfile/getChatList/updateSocketId',
    getSingleUser: 'api/homePage/getSingleUserProfile',
    findBlindTelepath: 'api/blindDate/findBlindTelepath',



  },
};

export default BaseSetting;
