import types from './actions';

const initialState = {
  socketObj: null,
  chatData: {},
  typing: false,
  typingData: {},
  totalMsgCount: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SOCKET:
      console.log(`${types.SET_SOCKET} => `);
      return {
        ...state,
        socketObj: action.socketObj,
      };

    case types.CLEAR_SOCKET:
      console.log(`${types.CLEAR_SOCKET} => `);
      return {
        ...state,
        socketObj: null,
      };

    case types.SET_RECEIVED_CHAT_DATA:
      console.log(`${types.SET_RECEIVED_CHAT_DATA} ==>`);
      // CAlert(JSON.stringify(action.chatData));
      console.log('action.chatData =>');
      console.log(action.chatData);
      return {
        ...state,
        chatData: action.chatData,
      };

    case types.CLEAR_CHAT_DATA:
      console.log(`${types.CLEAR_CHAT_DATA} => `);
      return {
        ...state,
        chatData: {},
      };

    case types.SET_TYPING:
      console.log(`${types.SET_TYPING} => `);
      return {
        ...state,
        typing: action.typing,
        typingData: action.typingData,
      };

    case types.SET_TOTAL_MSG_COUNT:
      console.log(`${types.SET_TOTAL_MSG_COUNT} => `);
      return {
        ...state,
        totalMsgCount: action.data,
      };

    default:
      return state;
  }
}
