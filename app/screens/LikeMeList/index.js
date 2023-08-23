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
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import { BaseColors } from '../../config/theme';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import { useSelector } from 'react-redux';
import NoDataFound from '../../components/NoData';
import { useIsFocused } from '@react-navigation/native';

// import Icon from 'react-native-vector-icons/AntDesign';


const LikeMeList = ({ navigation, route }) => {
  const accessToken = useSelector(state => state.auth.accessToken);

  const [tab, setTab] = useState('Like ME')
  const [loader, setLoader] = useState(true);
  const [likeMeData, setLikeMeData] = useState([]);
  const [myLikeData, setMyLikeData] = useState([]);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const isFocused = useIsFocused();


  function renderEmptyComponent() {
    return <NoDataFound title={"Check Back Later for Likes"}/>;
  }

  // refresh function
  function onRefreshPending() {
    setRefreshLoader(true);
    setTimeout(() => {
      if (tab === "Like ME") {
        LikeMeAPI();
      } else {
        MyLikeAPI()
      }
    }, 2000);
  }

  // API for LikeMeAPI
  async function LikeMeAPI() {
    setLoader(true);
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.likeMe}`,
        null,
        header,
        true
      );
      // console.log("resLikeME listttt====>", response);
      // console.log("res====>", response?.data);
      if (response?.status) {
        setLikeMeData(response?.data);
        setLoader(false);
        setRefreshLoader(false);
      } else {
        setLoader(false);
        setRefreshLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setRefreshLoader(false);
      console.log('error =======>>>', error);
    }
  }
  // API for MyLikeAPI
  async function MyLikeAPI() {
    setLoader(true);
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.myLike}`,
        null,
        header,
        true
      );
      // console.log("resLikeME listttt====>", response);
      // console.log("res====>", response?.data);
      if (response?.status) {
        setMyLikeData(response?.data);
        setLoader(false);
        setRefreshLoader(false);
      } else {
        setLoader(false);
        setRefreshLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setRefreshLoader(false);
      console.log('error =======>>>', error);
    }
  }

  useEffect(() => {
    if (tab === "Like ME") {
      LikeMeAPI();
    } else {
      MyLikeAPI()
    }
  }, [tab]);

  // Render item component for each user
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: item?.profilePic }}
        style={styles.listImage} /> */}

      {item?.profilePic ? (
        <Image
          source={{ uri: item.profilePic }}
          style={styles.listImage}
        />
      ) : null}

    </View>
  );

  return (
    <>
      <View style={styles.mainView}  >
        {
          isFocused &&
          <StatusBar
            backgroundColor={BaseColors.lightGreyBg}
            barStyle="dark-content"
            translucent
          />
        }
        <View style={styles.container}>
          <View style={styles.headingView}>
            <View style={styles.tabView}>
              <TouchableOpacity onPress={() => setTab('Like ME')}>
                <Text style={[styles.tabTxt, { color: tab === "Like ME" ? BaseColors.secondary : BaseColors.bgColor }]}>Like Me</Text>
                <View style={[styles.underLine, { backgroundColor: tab === "Like ME" ? BaseColors.secondary : null }]} />
              </TouchableOpacity>
              <View style={styles.vrLine} />
              <TouchableOpacity onPress={() => setTab('My Like')}>
                <Text style={[styles.tabTxt, { color: tab === "My Like" ? BaseColors.secondary : BaseColors.bgColor }]}>My Like</Text>
                <View style={[styles.underLine, { backgroundColor: tab === "My Like" ? BaseColors.secondary : null }]} />
              </TouchableOpacity>
            </View>

            <Text style={styles.desTxt}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</Text>
          </View>
          <>
            {loader ? (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator
                  size="large"
                  color={BaseColors.secondary}
                />
              </View>)
              : (<FlatList
                contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
                ListEmptyComponent={renderEmptyComponent}
                data={tab === "Like ME" ? likeMeData : myLikeData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Display items in two columns
                columnWrapperStyle={styles.columnWrapper} // Apply styles to the column wrapper
                refreshControl={
                  <RefreshControl
                    colors={[BaseColors.secondary]}
                    tintColor={BaseColors.secondary}
                    refreshing={refreshLoader}
                    onRefresh={() => {
                      onRefreshPending();
                    }}
                  />
                }
              />)}
          </>
        </View>
      </View>
    </>

  );
};

export default LikeMeList;
