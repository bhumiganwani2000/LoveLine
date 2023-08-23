import _ from 'lodash';
import io from 'socket.io-client';
import settings from '../../../config/setting';

let SOCKET = null;

const actions = {
  INIT_SOCKET: 'socket/INIT_SOCKET',
  EMIT_SOCKET: 'socket/EMIT_SOCKET',
  SET_SOCKET: 'socket/SET_SOCKET',
  CLEAR_SOCKET: 'socket/CLEAR_SOCKET',
  SET_RECEIVED_CHAT_DATA: 'socket/SET_RECEIVED_CHAT_DATA',

  CLEAR_CHAT_DATA: 'socket/CLEAR_CHAT_DATA',
  SET_TYPING: 'socket/SET_TYPING',
  SET_TOTAL_MSG_COUNT: 'socket/SET_TOTAL_MSG_COUNT',

  setSocket: (socketObj) => (dispatch) =>
    dispatch({
      type: actions.SET_SOCKET,
      socketObj,
    }),

  onDisConnect: (bool) => (dispatch, getState) => {
    if (bool) {
      dispatch({
        type: actions.CLEAR_SOCKET,
        socketObj: null,
      });
    }
  },

  onReceive: (chatData) => (dispatch, getState) => {
    if (
      _.isObject(chatData) &&
      _.isObject(chatData.data) &&
      !_.isEmpty(chatData.data)
    ) {
      const cdata = chatData.data;
      cdata.move = 'chat';
      console.log(cdata);
      dispatch({
        type: actions.SET_RECEIVED_CHAT_DATA,
        chatData: cdata,
      });
    }
  },

  initialize: () => (dispatch, getState) => {
    console.log('Socket initialize called');
    console.log(settings.socketURL);
    // console.log('getState()----', getState().socket);
    const { socketObj } = getState().socket;

    if (socketObj === null || _.isUndefined(socketObj.emit)) {
      // SOCKET = io(settings.socketURL, {
      //   path: '/socket.io/',
      //   upgrade: false,
      // });
      SOCKET = io(settings.socketURL);
      SOCKET.on('connect_error', (error) => {
        // console.log('SOCKET connect_error---->>> ', error);
      });
      // console.log('TCL: SOCKET', SOCKET);
      // console.log('TCL: settings.socketURL', settings.socketURL);

      SOCKET.on('connect', () => {
        console.log('SOCKET connected');
        // const { previousTracking } = getState().socket;
        const { userData } = getState().auth;
        // console.log(token);
        dispatch(actions.setSocket(SOCKET));
        // dispatch(
        //   actions.emit('userconnect', {
        //     user_id: userData.id,
        //   }, (value) => { console.log('callback===>>', value); }),
        // );
      });

      SOCKET.on('receiveMessage', (data) => {
        console.log('SOCKET Receive Data =======>');
        console.log('data===>');
        console.log(data);
        const { token } = getState().auth;
        dispatch(actions.onReceive(data));
      });

      SOCKET.on('receiveTyping', (data) => {
        console.log('SOCKET receiveTyping =======>');
        console.log('data===>');
        console.log(data);
        dispatch(actions.onReceiveTyping(data, 'start'));
      });

      SOCKET.on('stopTyping', (data) => {
        console.log('SOCKET stopTyping =======>');
        console.log('data===>');
        console.log(data);
        dispatch(actions.onReceiveTyping(data, 'stop'));
      });

      // SOCKET.on('disconnect', () => {
      //   console.log('SOCKET disconnect =>');
      //   dispatch(actions.onDisConnect(true));
      // });
    } else {
      // console.log('Socket Already connected ==>');
    }
  },

  emit: (event, data, callback) => (dispatch, getState) => {
    const { socketObj } = getState().socket;
    console.log(socketObj);
    if (socketObj !== null) {
      console.log(`${event} ${callback} => emit ======>>>>>>`);
      console.log(data);
      socketObj.emit(event, data, (callBackData) => {
        console.log('callBackData===>?');
        console.log(callBackData);
        if (callback) {
          callback(callBackData);
        }
        if (
          (event === 'userconnect' || event === 'getUnreadMessageTotalCount') &&
          !_.isUndefined(callBackData)
        ) {
          console.log('callback====>>>', callBackData);
          dispatch(actions.setTotalMsgCount(callBackData));
        }
      });
    }
  },

  onReceiveTyping: (data, type) => (dispatch, getState) => {
    dispatch({
      type: actions.SET_TYPING,
      typing: type === 'start',
      typingData: _.isObject(data) && _.isObject(data.data) ? data.data : {},
    });
  },

  disconnect: () => (dispatch, getState) => {
    const { socketObj } = getState().socket;
    if (socketObj !== null) {
      socketObj.disconnect();
      dispatch(actions.setSocket(null));
    }
  },

  setTotalMsgCount: (data) => (dispatch) => {
    dispatch({
      type: actions.SET_TOTAL_MSG_COUNT,
      data,
    });
  },

  clearChatData: () => (dispatch, getState) => {
    dispatch({
      type: actions.CLEAR_CHAT_DATA,
    });
  },
};

export default actions;
