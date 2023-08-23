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
import io from 'socket.io-client';



const ChatScreen = ({ navigation, route }) => {
  const { userData } = useSelector(state => state.auth);
  const accessToken = useSelector(state => state.auth.accessToken);
  // const socketObj = useSelector((state) => state.socket.socketObj);
  const chatDataValue = useSelector((state) => state.socket.chatData);

  const chatItemData = route?.params?.chatItem;
  const sender_ID = route?.params?.senderID;
  const reciver_ID = chatItemData?._id;
  const ChatUserName = chatItemData?.username;
  const profileImg = chatItemData?.profilePic

  const refJouinedSheet = useRef();
  const [pageLoad, setPageLoad] = useState(false);
  const [newData, setNewData] = useState('');

  const chatItem = route?.params?.chatItem || {};
  const chatArray =
    _.isArray(route?.params?.chatItem?.chats) &&
      !_.isEmpty(route?.params?.chatItem?.chats)
      ? route?.params?.chatItem?.chats
      : [];
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(chatArray);
  const socketURL = io.connect("http://192.168.1.18:3030/");

  // const [state, setState] = useState({
  //   loadEarlier: false,
  //   isLoadingEarlier: false,
  //   // page: 0,
  // });
  // useEffect(() => {

  //   console.log("messages every", messages);
  // }, [messages])

  // const [textMessage, setInputMessage] = useState('');
  // const { emit } = SocketAction;
  // let isTypingInput = false;
  // let stopTypingTimeout = false;
  // useEffect(() => {
  //   socketObj.on('newChatMessage', (msg) => {
  //     console.log("NEwMEssages><<><><>", msg);
  //     setMessages(msg);
  //   });

  //   // Clean up the socket connection on component unmount
  //   return () => {
  //     socketObj.off('newChatMessage');
  //     socketObj.disconnect();
  //   };
  // }, []);

  // const handleReceivedMessage = (msg) => {
  //   // Create a new message object with the required fields
  //   socketObj.emit('newChatMessage', msg);

  //   console.log('msg-------', msg);
  //   // const newMessage = {
  //   //   _id: msg.time, // Use the server timestamp as the unique _id
  //   //   text: msg.message,
  //   //   createdAt: new Date(msg.time),
  //   //   user: {
  //   //     _id: msg.sender === sender_ID ? 1 : 2, // Assign 1 for self, 2 for other user
  //   //     name: msg.sender === sender_ID ? 'Me' : msg.data.data.message,
  //   //   },
  //   // };

  //   // Update the state with the new received message
  //   setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
  // };

  // useEffect(() => {
  //   // Listen for incoming messages on the socket
  //   socketObj.on('newChatMessage', handleReceivedMessage);
  //   socketObj.on('newChatMessage', function (msg) {

  //     console.log("_______ayush", msg);
  // socketObj.emit('newChatMessage', msg);

  //     const newMessage = {
  //       _id: msg.time, // Use the server timestamp as the unique _id
  //       text: msg.message,
  //       createdAt: new Date(msg.time),
  //       user: {
  //         _id: msg.sender === sender_ID ? msg.data.data.sender : msg.data.data.receiver, // Assign 1 for self, 2 for other user
  //         name: msg.sender === sender_ID ? 'Me' : msg.data.data.message,
  //       },
  //     };
  //     socketObj.emit('newChatMessage', msg);

  //     // Update the state with the new received message
  //     setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
  //   });

  //   // Clean up the socket connection on component unmount
  //   return () => {
  //     socketObj.off('newChatMessage', handleReceivedMessage);
  //     socketObj.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   getMessages();
  // }, [])

  // Function to send a new message through the socket
  // const handleSend = (newMessages) => {
  //   // console.log("newMessages:", newMessages);
  //   const msg = newMessages[0];
  //   const data = {
  //     senderId: sender_ID,
  //     receiverId: reciver_ID,
  //     message: msg?.text || 'static message',
  //   };

  //   socketObj && socketObj.emit('chatMessageSave', data, (res) => {
  //     console.log("Chat", res?.data?.data);
  //     setNewData(res?.data?.data)
  //   });
  //   setInputMessage('');

  // };

  // const handleSend = (newMessages) => {
  //   const msg = newMessages[0];
  //   const data = {
  //     senderId: sender_ID,
  //     receiverId: reciver_ID,
  //     message: msg?.text || 'static message',
  //   };

  //   socketObj && socketObj.emit('chatMessageSave', data, (res) => {
  //     console.log("Chat", res?.data?.data);

  //     // Create a new message object with the required fields
  //     // const newMessage = {
  //     //   _id: res?.data?.data?.time, // Use a unique identifier for _id, here I'm using the server timestamp
  //     //   text: res?.data?.data?.message,
  //     //   createdAt: new Date(res?.data?.data?.time),
  //     //   user: {
  //     //     _id: 1, // Assuming the sender's _id is 1 (you)
  //     //     name: userData?.username || 'Me', // Replace with your name
  //     //     // Add the avatar field here if needed
  //     //   },
  //     // };

  //     // Update the state with the new sent message
  //     setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
  //   });

  //   setInputMessage('');
  // };

  // const getMessages = () => {
  //   // console.log("newMessages:", newMessages);
  //   const msgObj = {
  //     senderId: sender_ID,
  //     receiverId: reciver_ID,
  //   };

  //   socketObj && socketObj.emit('getMessages', msgObj, (res) => {
  //     console.log("getMessages>>>", JSON.stringify(res?.data));
  //     setNewData(res);
  //   });

  // };




  // useEffect(() => {
  //   // Connect to the socket server when the component mounts
  //   const socket = io(socketURL);

  //   // Event listener for socket connection
  //   socket.emit('connect', () => {
  //     console.log('Socket connected!');
  //   });

  //   // Event listener for socket disconnection
  //   // socket.on('disconnect', () => {
  //   //   console.log('Socket disconnected!');
  //   // });

  //   // Clean up the socket connection when the component unmounts
  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, []);

  socketURL.on('connect', () => {
    console.log('Connected to server');
  });
  
  socketURL.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  useEffect(() => {
    console.log(">>>>>");
    const socket = io('http://192.168.1.18:3030/');
    socket.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    // socket.on('connect', () => {
    //   console.log('Connected to server.>>>>>>');
    //   socket.emit('message', 'Hello from React Native!');
    // });

    socket.on('message', (data) => {
      // console.log('Received message from server:', data);r
      // Handle the received message here
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected.');
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);




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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={true}>
              {pageLoad ? (
                renderLoader()
              ) : (
                <GiftedChat
                  messages={messages}
                  placeholder="Type message..."
                  alwaysShowSend
                  showUserAvatar={false}
                  renderChatEmpty={renderChatEmpty}
                  onSend={(msg) => {
                    if (!_.isEmpty(socketObj)) {
                      handleSend(msg);
                    }
                  }}

                  user={{
                    _id: 1,
                    avatar: userData?.profilePic ? { uri: userData.profilePic } : null,
                    name: userData?.username || 'Me',
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
                  loadEarlier={true}
                  scrollToBottom
                  isCustomViewBottom
                  minInputToolbarHeight={Dimensions.get('screen').width / 4.2}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>

    </>
  );
};

export default ChatScreen;







// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, FlatList } from 'react-native';
// import { Button } from 'react-native-elements';

// import io from 'socket.io-client';


// const ChatScreen = ({ navigation, route }) => {
//   console.log('route========', route);
//   // const [socketStatus, setSocketStatus] = useState('Disconnected');
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   let socket = io.connect('http://192.168.1.18:3030/'); 
//   const [socketID, setSocketId] = useState("")

// const receiverId = route?.params?.chatItem?._id;
// const senderId= route?.params?.senderID;
// const socketid = route?.params?.chatItem?.socketId
// console.log("v=++========================",receiverId,senderId,socketid);

// // console.log(socketId,senderIds,receiverId,"three============================");
//   // console.log(socket.id); // undefined
//   socket.on("connect",(socketConn) =>{


//     console.log("connected",socketConn);
//     socket.on('newChatMessage', (data) => {
//       console.log("data=======================",data); // an alphanumeric id...
//     });

    
//       socket.on("newChatMessage",(socketData)=>{
//         console.log("==========================================");
//         console.log("newChatMessage event recieved", socketData);
//         console.log("==========================================");
//       });



//   })

//   // useEffect(() => {
//   //   const establishWebSocketConnection = () => {
//   //     // Replace 'your_websocket_server_url' with your actual WebSocket server URL
//   //     const url = 'http://192.168.1.18:3030/';

//   //     // Connect to the WebSocket server
//   //     socket = io(url, {
//   //       transports: ['websocket'], // Use only WebSocket transport in React Native
//   //     });

//   //     // Socket.io event listeners


//   //     console.log(socket.id); // undefined
//   //     socket.on('connect', () => {
//   //       console.log("=======================================", socket.id);
//   //       const socketId = socket.id
//   //       setSocketId(socket.id)

//   //     });

//   //     socket.on("newChatMessage",(socketData)=>{
//   //       console.log("newChatMessage event recieved", socketData);
//   //     });


//   //     socket.on('disconnect', () => {
//   //       console.log("disconnect sucees full");
//   //     });

//   //     socket.on('error', (error) => {
//   //       console.error('Socket.io Error:', error);
//   //     });
//   //   };
//   //   establishWebSocketConnection();
//   //   return () => {
//   //     if (socket) {
//   //       socket.disconnect();
//   //     }
//   //   };
//   // }, []);
//   useEffect(() => {
//     if (socketID !== "") {
//       socketAPI();
//     }
//   }, [socketID]);

//   async function socketAPI() {
//     const header = {
//       token: accessToken,
//     };
//     const data = {
//       socketId: socketID,
//     }
//     try {
//       const response = await getApiDataProgress(
//         `${BaseSetting.endpoints.socketApi}`,
//         data,
//         header,
//         true
//       );
//       console.log("response-------", response);
//       if (response) {
//         console.log(response, "ayush");
//       } else {
//       }
//     } catch (error) {
//       console.log('error =======>>>', error);
//     }
//   }
//   const handleSendMessage = () => {
// console.log(socketid,"rsocketId");
//     console.log({message,receiverId,senderId},"ayushhhhhhhhhhhhhhhhhhhhhh");
//     socket.emit('chatMessageSave',
//     {message,receiverId,senderId});
    
//     mockSendMessage(message, setMessage, setMessages);
//   };
//   const mockSendMessage = (msg, setMessage, setMessages) => {
//     // Simulating sending a message to a server (local mock)
//     if (msg.trim() !== '') {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//       setMessage('');
//     }
//   };



//   return (
//     <View style={styles.container}>
//       <Text style={{ color: 'red' }}></Text>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => <Text>{item}</Text>}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <TextInput
//         value={message}
//         onChangeText={setMessage}
//         placeholder="Type your message..."
//       />
//       <Button
//         title="Send"
//         onPress={handleSendMessage}
//       />
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// };

// export default ChatScreen;
