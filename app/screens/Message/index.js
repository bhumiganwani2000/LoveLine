// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Animated,
  UIManager,
  LayoutAnimation,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import { isArray, isEmpty, isNull } from 'lodash';
import { BaseColors } from '../../config/theme';
import CHeader from '../../components/CHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getApiDataProgress } from '../../utils/apiHelper';
import BaseSetting from '../../config/setting';
import CButton from '../../components/CButton';
import AIcon from 'react-native-vector-icons/AntDesign';
import NoDataFound from '../../components/NoData';
import authActions from '../../redux/reducers/auth/actions';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const Message = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  console.log("MsgAsš>>>>accessToken", accessToken)
  const [messageList, setMessageList] = useState([]);
  const [newMatchesList, setNewMatchesList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [refreshLoader, setRefreshLoader] = useState(false);

  const [sendId, setSendId] = useState('');

  const [mathcPageLoader, setMatchPageLoader] = useState(true);

  const { setActiveScreen } = authActions;
  const userData = useSelector(state => state.auth.userData);
  const socketObj = useSelector(state => state.socket.socketObj);

  // const socketObj = useSelector(state => state.socketActions);
  console.log("<>>>socketObj", socketObj);
  // refresh function
  function onRefresh() {
    setRefreshLoader(true);
    getMessageList();
  }

  // API getNewMatchesList
  async function getNewMatches() {
    setMatchPageLoader(true);
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.newMatches}`,
        null,
        header,
        true
      );
      if (response?.status === "success") {
        setMatchPageLoader(false);
        setSendId(response?.data?.senderId);
        setNewMatchesList(response?.data?.detail);
        console.log("NewMatchesListList", response?.data?.detail);
      } else {
        setMatchPageLoader(false);
        console.log('erro>>Something went wrong');
      }
    } catch (error) {
      setMatchPageLoader(false);
      console.log('error =======>>>', error);
    }
  }
  // API FOR MESSAGE LIST
  async function getMessageList() {
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.messageList}`,
        null,
        header,
        true
      );
      if (response?.status === "success") {
        setSendId(response?.data?.senderId);
        setMessageList(response?.data?.detail);
      }
      // Update the loading state to false after getting the response
      setPageLoader(false);
      setRefreshLoader(false);
    } catch (error) {
      setPageLoader(false);
      setRefreshLoader(false);
      console.log('error =======>>>', error);
    }
  }

  useEffect(() => {
    // Set the loading state initially to true
    setPageLoader(true);
    getMessageList(); // Fetch the message list
  }, []);

  useEffect(() => {
    getNewMatches();
  }, []);

  // Empty view
  function renderEmptyComponent() {
    return (
      <NoDataFound title={"Start a Conversation to Fill Your Chat List"} />
    );
  }
  // New Matches list

  const rederItemMatch = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        // console.log(">>>MEsss>", item);
        navigation.navigate('ChatScreen', { chatItem: item, senderID: sendId });
      }}
      style={styles.MatchesView}
    >
      {/* <Image
        style={styles.userImg}
        source={{ uri: item?.profilePic }}
      /> */}
      {item?.profilePic && (
        <Image
          style={styles.userImg}
          source={{ uri: item?.profilePic }}
        />
      )}
      <Text style={styles.mathcesTxt}>{item?.username}</Text>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <View style={styles.rowView}>
      <TouchableOpacity
        onPress={() => {
          // console.log("MessageITem>>>>", item);
          navigation.navigate('ChatScreen', { chatItem: item, senderID: sendId });
        }}
        style={styles.subRowView}>

        <Image
          style={styles.userImg}
          source={{ uri: item?.profilePic }}
        />
        <Text numberOfLines={1} style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
      <View style={styles.btnView}>
        <CButton
          onPress={() => {
            // console.log(">>>>", item);
            navigation.navigate('ChatScreen', { chatItem: item, senderID: sendId });
          }}
          containerStyle={{ borderColor: BaseColors.borderColor }}
          txtSty={{ color: BaseColors.greyColor }}
          btnTitle={"View"}
          type="outlined" />
      </View>

    </View>
  );




  return (

    <View style={styles.mainView}>
      <CHeader
        leftIcon
        onLeftIconClick={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.searchInput}>
          <AIcon name="search1" size={20} color="black" style={styles.icon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.input}
          />
        </View>
        <View style={styles.subView}>
          {/* New MATCHES  */}

          <>
            {mathcPageLoader ? (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator
                  size="large"
                  color={BaseColors.secondary}
                />
              </View>
            ) :
              (
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.heading}>NEW MATCHES</Text>
                  <FlatList
                    ListEmptyComponent={renderEmptyComponent}
                    horizontal={true}
                    data={newMatchesList}
                    renderItem={rederItemMatch}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
          </>


          <>
            {pageLoader ? (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator
                  size="large"
                  color={BaseColors.secondary}
                />
              </View>
            ) :
              (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.heading}>Message</Text>
                  <FlatList
                    ListEmptyComponent={renderEmptyComponent}
                    data={messageList}
                    renderItem={renderMessageItem}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                      <RefreshControl
                        colors={[BaseColors.secondary]}
                        tintColor={BaseColors.secondary}
                        refreshing={refreshLoader}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                </View>
              )}
          </>

        </View>
      </View>
    </View>


  );
};

export default Message;
