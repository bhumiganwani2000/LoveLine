// / import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import _ from 'lodash';
// import SocketIOClient from "socket.io-client/dist/socket.io.js";
import AIcon from 'react-native-vector-icons/AntDesign';
import SIcon from 'react-native-vector-icons/Ionicons';

//This is new change

import {
  StatusBar,
  View,
  TextInput,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CHeader from '../../components/CHeader';
import { useSelector } from 'react-redux';
// import { GiftedChat } from 'react-native-gifted-chat'
import { BaseColors } from '../../config/theme';
import { useIsFocused } from '@react-navigation/native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from 'react-native-gifted-chat';
import SocketAction from '../../redux/reducers/Socket/actions';
import EIcon from 'react-native-vector-icons/Entypo';



const ChatScreen = ({ navigation, route }) => {
  const { userData } = useSelector(state => state.auth);
  const accessToken = useSelector(state => state.auth.accessToken);
  const socketObj = useSelector((state) => state.socket.socketObj);
  const chatDataValue = useSelector((state) => state.socket.chatData);

  const chatItemData = route?.params?.chatItem;
  const sender_ID = route?.params?.senderID;
  const reciver_ID = chatItemData?._id;
  const ChatUserName = chatItemData?.username;
  const profileImg = chatItemData?.profilePic

  const refJouinedSheet = useRef();
  const [pageLoad, setPageLoad] = useState(true);

  const chatItem = route?.params?.chatItem || {};
  const chatArray =
    _.isArray(route?.params?.chatItem?.chats) &&
      !_.isEmpty(route?.params?.chatItem?.chats)
      ? route?.params?.chatItem?.chats
      : [];

  const [messages, setMessages] = useState(chatArray);

  const [state, setState] = useState({
    loadEarlier: false,
    isLoadingEarlier: false,
    page: 0,
  });


  const [textMessage, SetTextInputMessage] = useState('');
  const [inputMessage, setIMnputMessage] = useState('');
  const { emit } = SocketAction;
  let isTypingInput = false;
  let stopTypingTimeout = false;


  useEffect(() => {
    getNewMessage()
  }, []);


  const getNewMessage = () => {
    if (!_.isEmpty(socketObj)) {
      getPreviousMessages('');
    } else {
      setPageLoad(false);
    }

    setTimeout(() => {
      console.log("Log count")
      getNewMessage();  
    }, 3500);
  };

  // const getNewMessage = () => {
  //   if (!_.isEmpty(socketObj)) {
  //     getPreviousMessages('');
  //   } else {
  //     setPageLoad(false);
  //   }
  //   setTimeout(() => {
  //     console.log("function called again")
  //     getNewMessage(false)
  //   }, 3500)
  // }

  useEffect(() => {
    if (!_.isEmpty(socketObj)) {
      getPreviousMessages();
      socketObj.on('newChatMessage', (response) => {
        //console.log("NEwMEssages><<><><>", response);
        // Handle the new message received from the socket
        const newMessage = parseConverationObject(response, messages.length);
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
      });
    } else {
      setPageLoad(false);
    }
  }, [chatDataValue]);


  const typing = (msgTxt, type) => {
    if (
      _.isString(accessToken) &&
      !_.isEmpty(accessToken) &&
      _.isObject(userData) &&
      !_.isEmpty(userData)
    ) {
      if (_.isString(type) && type === 'stop') {
        emit(
          'stopTyping',
          {
            senderId: sender_ID,
            receiverId: reciver_ID,
            // group_id: chatItem.id,
          },
          (callBackData) => {
            // console.log('callBackData ==>>>', callBackData);
          },
        );
      } else {
        emit(
          'isTyping',
          {
            senderId: sender_ID,
            receiverId: reciver_ID,
          },
          (callBackData) => {
            // console.log('callBackData ==>>>', callBackData);
          },
        );
      }
    }
  };

  const parseConverationObject = (convObj, index) => {
    const messageData = {
      _id: convObj.lastMessageTimestamp + '-' + index, // Append index to ensure uniqueness
      text: convObj.lastMessage,
      createdAt: new Date(convObj.lastMessageTimestamp),
      user: {
        _id: convObj.typeOfUser === 'sender' ? 1 : 2, // Assuming "sender" is for current user, change if needed
        name: convObj.typeOfUser === 'sender' ? 'M e' : convObj.userName,
        avatar: convObj.typeOfUser === 'sender' ? '' : convObj.image,
      },
    };
    return messageData;
  };

  const getPreviousMessages = (type = '') => {
    // if (type === 'load') {
    //   setState({
    //     ...state,
    //     isLoadingEarlier: true,
    //   });
    // }

    const obj = {
      senderId: sender_ID,
      receiverId: reciver_ID,
      // page: type === 'initial' || type === '' ? 1 : state.page + 1,
    };

    socketObj &&
      socketObj.emit('getMessages', obj, (res) => {
        const callBackData = res?.data?.data;
        // console.log(">callBackData>callBackData>callBackData,",callBackData)
        if (_.isArray(callBackData) && !_.isEmpty(callBackData)) {
          const messagesArray = [];
          callBackData.map((item, index) => {
            messagesArray.push(parseConverationObject(item, index));
          });
          setPageLoad(false);
          const valueMessage = messagesArray;
          if (type === 'initial' || type === '') {
            setMessages(valueMessage);
          } else {
            setMessages([...valueMessage, ...messages]);
          }
        } else {

          setPageLoad(false);
        }
      });
  };


  // finall
  const handleSend = (newMessages) => {
    const msg = newMessages[0];
    const data = {
      senderId: sender_ID,
      receiverId: reciver_ID,
      message: msg?.text || 'static message',
    };

    socketObj && socketObj.emit('chatMessageSave', data, (res) => {
      // Callback function for handling the response from the server (if needed)
      // console.log('chat response:', res);
    });
    setInputMessage('');
    getPreviousMessages('initial');
    // Append the new message to the messages state (it will also be updated in the listener)
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const resetStopTypingTimeout = () => {
    if (stopTypingTimeout) {
      clearTimeout(stopTypingTimeout);
    }
    stopTypingTimeout = setTimeout(() => {
      isTypingInput = false;
      typing('', 'stop');
      stopTypingTimeout = undefined;
    }, 700);
  };

  const setInputMessage = (text) => {
    SetTextInputMessage(text);

    typing();

    if (isTypingInput === false) {
      // console.log('isTypingInput ===>>>', isTypingInput);
      isTypingInput = true;
      typing('', 'start');
      // Start a 3 second countdown to see if they type within that window
      resetStopTypingTimeout();
    } else {
      typing('', 'start');
      // If the user typed another character, reset the timeout
      resetStopTypingTimeout();
    }
  };

  const renderChatEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Let's start the chat.</Text>
    </View>
  );
  // this function renders loader
  function renderLoader() {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size={30} color={BaseColors.primary} animating />
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.mainView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <CHeader
          // leftIcon
          //  title={ChatUserName}
          onLeftIconClick={() => navigation.goBack()} />
        <View style={styles.container}>
          {/* <View style={styles.container}> */}
          <View style={styles.subView}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={styles.subRowView}>
                <AIcon
                  onPress={() => {
                    navigation.goBack()
                  }} name="left" size={25} color={BaseColors.secondary} />
                <View>
                  <Image
                    style={styles.userImg}
                    source={{ uri: profileImg }}
                  />
                  <View style={styles.activeIcon} />
                </View>

                <View style={styles.userView}>
                  <Text numberOfLines={1} style={styles.username}>{ChatUserName}</Text>
                  <Text style={styles.activeTxt}>Online</Text>
                </View>
              </TouchableOpacity>

            </View>
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={true}> */}
            {pageLoad ? (
              renderLoader()
            ) : (
              <GiftedChat
                messages={messages}
                placeholder="Type message..."
                alwaysShowSend
                showUserAvatar={false}
                renderChatEmpty={renderChatEmpty}
                onSend={(message) => {
                  if (!_.isEmpty(socketObj)) {
                    handleSend(message);
                  }
                }}
                // renderInputToolbar={(props) => (
                //   <InputToolbar
                //     {...props}
                //     onInputTextChanged={(text) => {
                //       console.log('text-440-', text);
                //       setInputMessage('');
                //     }}
                //     containerStyle={styles.inputToolbar}
                //     renderComposer={(composerProps) => (
                //       <View>
                //          <EIcon
                //                       name="mic"
                //                       size={24}
                //                       color={BaseColors.secondary}
                //                     />
                //       <View style={styles.composerContainer}>

                //         <Composer
                //           {...composerProps}
                //           textInputStyle={{ color: 'black' }}
                //           multiline={false}
                //         />
                //         <TouchableOpacity style={styles.button}>

                //           {/* <CustomIcon
                //             color={'#202939'}
                //             name="attachment"
                //             size={21}
                //           /> */}
                //                    <EIcon
                //                       name="mic"
                //                       size={24}
                //                       color={BaseColors.secondary}
                //                     />

                //         </TouchableOpacity>
                //         {/* <TouchableOpacity style={styles.button}>
                //           {/* <CustomIcon color={'#202939'} name="gallery" size={21} /> */}
                //         {/* </TouchableOpacity>  */}
                //         {/* <Send {...props} containerStyle={styles.sendContainer}> */}
                //           <View style={styles.sendButton}>
                //           <SIcon
                //         name="send"
                //         size={24}
                //         color={BaseColors.secondary}
                //       />
                //             {/* <Icon
                //               name="paper-plane-outline"
                //               size={24}
                //               color="#0084ff"
                //             /> */}
                //           </View>
                //         {/* </Send> */}
                //       </View>
                //       </View>
                //     )}
                //   />
                // )}
                user={{
                  _id: 1,
                  avatar: { url: userData?.profilePic },
                  name: userData?.username,
                }}
                renderBubble={(props) => (
                  // Custom bubble component
                  <Bubble
                    {...props}
                    wrapperStyle={{
                      left: styles.bubbleLeft,
                      right: styles.bubbleRight,
                    }}
                    textStyle={{
                      left: styles.textLeft,
                      right: styles.textRight,
                    }}
                  />
                )}

                wrapInSafeArea={false}
                inverted={false}
                loadEarlier={state.loadEarlier}
                onLoadEarlier={() => {
                  if (!_.isEmpty(socketObj)) {
                    getPreviousMessages();
                  }
                }}
                isLoadingEarlier={state.isLoadingEarlier}
                scrollToBottom
                isCustomViewBottom
                minInputToolbarHeight={Dimensions.get('screen').width / 4.2}
              />
            )}
            {/* </ScrollView> */}
          </View>
        </View>
      </KeyboardAvoidingView>

    </>
  );
};

export default ChatScreen;