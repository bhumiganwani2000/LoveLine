/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { isEmpty, isObject, isString } from 'lodash';
import BaseSetting from '../config/setting';
import authActions from '../redux/reducers/auth/actions';
// import CAlert from '../components/CAlert';
import { store } from '../redux/store/configureStore';
// import { setBugsNagLog } from './CommonFunction';
import axios from 'axios';

// export async function getApiData(
//   endpoint,
//   method,
//   data = data || undefined,
//   headers,
//   formdata = false,
// ) {
//   const authState = store?.getState() || {};
//   const token = authState?.auth?.accessToken || '';
//   let authHeaders = {
//     'Content-Type': 'application/json',
//     // authorization :'application/json',
//     // authorization: token ? `Bearer ${token}` : '',
//   };

//   if (headers) {
//     authHeaders = headers;
//   }
//   if (formdata) {
    // authHeaders = {
    //   'Content-Type': 'multipart/form-data',
    //   authorization: token ? `Bearer ${token}` : '',
    // };
//     const query = new FormData();
//     if (data && Object.keys(data).length > 0) {
//       Object.keys(data).map((k) => query.append(k, data[k]));
//     }
//     data = query;
//   }


//   console.log('method', method);
//   console.log('BaseSetting.api + endpoint', BaseSetting.api + endpoint);
//   console.log('authHeaders', authHeaders);
//   console.log('formdata', data);
//   // console.log('timeOut', BaseSetting.timeOut);
//   try {
//     let response = await axios({
//       method: method,
//       url: BaseSetting.api + endpoint,
//       // timeout: 30000,
//       headers: authHeaders,
//       data: !isEmpty(data) ? data : undefined,
//     });
//     console.log('🚀 ~ file: apiHelper.js ~ line 50 ~ response', response);

//     let responseStatus = response.status;
//     console.log(
//       '🚀 ~ file: apiHelper.js ~ line 41 ~ getApiData ~ response',
//       response,
//     );
//     console.log(
//       '🚀 ~ file: apiHelper.js ~ line 41 ~ getApiData ~ response',
//       responseStatus,
//     );
//     console.log('Success:', JSON.stringify(response));
//     return response;
//   } catch (error) {
//     // Bugsnag.notify(error, function (report) {
//     //   report.metadata = {
//     //     data: {
//     //       endpoint,
//     //       authHeaders,
//     //       data,
//     //     },
//     //   };
//     // });
//     if (error.response) {
//       let returnObj;
//       if (error.response.status === 400) {
//         returnObj = {
//           status: error.response.status,
//           responseJson: JSON.stringify(error.response.data),
//         };
//       }
//       if (error.response.status === 404) {
//         returnObj = {
//           status: error.response.status,
//           responseJson: JSON.stringify(error.response.data),
//         };
//       }
//       return returnObj;
//     }
//     console.log('error');
//     console.error(error);
//   }
// }

// export function getApiDataProgress(
//   endpoint,
//   method,
//   data,
//   onProgress,
//   customUrl = '',
// ) {
//   const authState = store?.getState() || {};
//   const token = authState?.auth?.accessToken || '';

//   // const headers = {
//   //   'Content-Type': 'multipart/form-data',
//   //   authorization: token ? token : '',
//   // };
//   const headers = {
//     'Content-Type': 'multipart/form-data',
//     authorization: token ? `Bearer ${token}` : '',
//   };

//   return new Promise((resolve, reject) => {
//     const url = !isEmpty(customUrl) ? customUrl : BaseSetting.api + endpoint;
//     const oReq = new XMLHttpRequest();
//     const token = store ? store.getState().auth.token : '';
//     oReq.upload.addEventListener('progress', (event) => {
//       if (event.lengthComputable) {
//         const progress = (event.loaded * 100) / event.total;
//         if (onProgress) {
//           onProgress(progress);
//         }
//       } else {
//         // Unable to compute progress information since the total size is unknown
//       }
//     });

//     const query = new FormData();
//     if (data && Object.keys(data).length > 0) {
//       Object.keys(data).map((k) => query.append(k, data[k]));
//     }
//     const params = query;
//     oReq.open(method, url, true);
//     console.log(params);
//     console.log(url);
//     oReq.setRequestHeader('Content-Type', 'multipart/form-data');
//     // oReq.setRequestHeader('X-localization', language);
//     if (isObject(headers)) {
//       Object.keys(headers).map((hK) => {
//         oReq.setRequestHeader(hK, headers[hK]);
//       });
//     }

//     if (token) {
//       oReq.setRequestHeader('Authorization', token);
//     }

//     oReq.send(params);
//     oReq.onreadystatechange = () => {
//       if (oReq.readyState === XMLHttpRequest.DONE) {
//         console.log('line 145 ~ returnnewPromise ~ oReq', oReq);
//         try {
//           console.log('Response Text => ', oReq.responseText);
//           const resposeJson = JSON.parse(oReq.responseText);
//           console.log('line 149 ~ returnnewPromise ~ resposeJson', resposeJson);
//           if (resposeJson && resposeJson.message === 'Unauthenticated.') {
//             if (count === 0) {
//               // if (endpoint === 'logout') {
//               //   logout();
//               // }
//             }
//             count++;
//           } else {
//             resolve(resposeJson);
//           }
//         } catch (exe) {
//           // bugsnag.notify(exe, function (report) {
//           console.log(
//             '🚀 ~ file: apiHelper.js ~ line 160 ~ returnnewPromise ~ exe',
//             exe,
//           );
//           //   report.metadata = {
//           //     data: {
//           //       url,
//           //       params,
//           //     },
//           //   };
//           // });
//           console.log(exe);
//           reject(exe);
//         }
//       }
//     };
//   });
// }


export function getApiData1 (uri, token, isToken) {
  return new Promise((resolve, reject) => {
    axios.get(uri, { 'headers':  isToken ? { 'Authorization': token } : '' })
    .then((response => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    }))
  })
}

export async function getApiDataProgress (endpoint, data, token, isToken) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'token': token?.token ? `${token?.token}` : '',
  };
  const url = BaseSetting.api + endpoint;
  console.log("url>>>",url);
  return new Promise((resolve, reject) => {
      axios.post(url, data, {
        headers
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}