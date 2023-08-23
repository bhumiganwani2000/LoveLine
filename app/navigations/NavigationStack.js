import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './NavigationServices';
// import { Provider } from 'react-redux';
import { store } from '../redux/store/configureStore';
import SplashScreen from '../screens/SplashScreen';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Otp from '../screens/Otp';
import Password from '../screens/Password';
import Name from '../screens/Name';
import Gender from '../screens/Gender';
import Birthdate from '../screens/Birthdate';
import LocationAllow from '../screens/LocationAllow';
import ChangePassword from '../screens/ChangePassword';
import NearByUsers from '../screens/NearByUsers';
import LikeMeList from '../screens/LikeMeList';
import Profile from '../screens/Profile';
import BottomTabBar from './BottomTabBar';
import Message from '../screens/Message';
import BulidDate from '../screens/BulidDate';
import Settings from '../screens/Settings';
import EditProfile from '../screens/EditProfile';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsofService from '../screens/TermsofService';
import Notification from '../screens/Notification';
import Feedback from '../screens/Feedback';
import Help from '../screens/Help';
import HomeS from '../screens/HomeS';
import List from '../screens/List';
import TodayTopic from '../screens/TodayTopic';
import StartSwiping from '../screens/StartSwiping';
import StartChatting from '../screens/StartChatting';
import ChatScreen from '../screens/ChatScreen';
import VideoCall from '../screens/VideoCall';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
console.disableYellowBox = false;

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'HomeS'}
      tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="HomeS"
        component={HomeS}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="LikeMeList"
        component={LikeMeList}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="BulidDate"
        component={BulidDate}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Tab.Navigator>
  );
};
const NavigationStack = () => {


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Password"
          component={Password}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Name"
          component={Name}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Gender"
          component={Gender}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Birthdate"
          component={Birthdate}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="LocationAllow"
          component={LocationAllow}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="HomeS"
          component={BottomTabsNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="NearByUsers"
          component={NearByUsers}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="LikeMeList"
          component={BottomTabsNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Profile"
          component={BottomTabsNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Message"
          component={BottomTabsNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="TermsofService"
          component={TermsofService}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="TodayTopic"
          component={TodayTopic}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="StartSwiping"
          component={StartSwiping}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="StartChatting"
          component={StartChatting}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;