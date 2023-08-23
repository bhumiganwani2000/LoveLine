// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  UIManager,
  LayoutAnimation,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import { BaseColors } from '../../config/theme';
import CHeader from '../../components/CHeader';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
// import { useSelector } from 'react-redux';
import CButton from '../../components/CButton';
import CInput from '../../components/CInput';
import Toast from 'react-native-toast-message'
import CountryInput from '../../components/CountryInput';
import { getApiDataProgress } from '../../utils/apiHelper';
import BaseSetting from '../../config/setting';
import { Dropdown } from 'react-native-element-dropdown';
import AuthAction from '../../redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';



// import Icon from 'react-native-vector-icons/AntDesign';


const EditProfile = ({ navigation, route }) => {

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState('');
  const [edit, setEdit] = useState(false);

  const [nationality, setnatinality] = useState('');
  const [nationErr, setNationErr] = useState(false);
  const [nationErrText, setNationErrText] = useState('');

  // const [emirates, setEmirates] = useState('');
  // const [emiErr, setemiErr] = useState(false);
  // const [emiErrText, setEmiErrText] = useState('');

  const [age, setAge] = useState('');
  const [ageErr, setAgeErr] = useState(false);
  const [ageErrText, setAgeErrText] = useState('');


  const [occupation, setOccupation] = useState('');
  const [occuErr, setOcuuErr] = useState(false);
  const [occuErrText, setOccuErrText] = useState('');

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrText, setEmailErrTxt] = useState('');

  const [code, setCode] = useState('+91');
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState(false);
  const [phoneNumErrTxt, setPhoneNumErrTxt] = useState('');
  const fullPhoneNumber = `${code}${phoneNum}`;



  const [aboutMe, setAboutMe] = useState('');
  const [abouttMeErr, setAboutMeErr] = useState(false);
  const [abouttMeErrText, setAbouttMeErrText] = useState('');

  const [myInterest, setMyInterest] = useState('');
  const [myInterestErr, setMyInterestErr] = useState(false);
  const [myInterestErrText, setMyInterestErrText] = useState('');

  const [userDataApi, setUserDataApi] = useState({});
  const { accessToken } = useSelector(state => state.auth);

  const [loader, setLoader] = useState(false);

  const [preferenceValue, setpreferenceValue] = useState('');
  const [preferenceErr, setPreferenceErr] = useState(false);
  const [preferenceErrText, setPreferenceErrText] = useState('');

  const [gender, setGender] = useState('');
  const [gendereErr, setGendereErr] = useState(false);
  const [gendereErrText, setGendereErrText] = useState('');

  const [bDate, setBDate] = useState(moment().format("MM/DD/YYYY"));
  const [birtadateErr, setBirthErr] = useState(false);
  const [birthdateErrTxt, setBirthdateErrTxt] = useState('');
  console.log("bDate-----", bDate);


  const dispatch = useDispatch();
  const { setEditProfileData } = AuthAction;
  const editProfileData = useSelector(state => state.auth.editProfileData);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = moment(selectedDate).format('MM/DD/YYYY');
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log('selectedDate-------', selectedDate);



  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);

      const today = moment();
      const minimumAgeDate = moment().subtract(18, 'years');

      if (date > today) {
        setBirthErr(true);
        setBirthdateErrTxt('Please select a valid date');
      } else if (date > minimumAgeDate) {
        setBirthErr(true);
        setBirthdateErrTxt('You must be at least 18 years old');
      } else {
        console.log("birtadate-----", bDate);
        setBDate(formattedDate);
        setBirthdateErrTxt('');
      }
    }
    setShowDatePicker(false);
  };

  const gData = [
    {
      id: 1,
      label: 'Male',
    },
    {
      id: 2,
      label: 'Female',
    }
  ]

  // useEffect(() => {
  //   if (edit === false) {
  //     updateUserAPI();
  //   }
  // }, []);

  useEffect(() => {
    setName(editProfileData?.username);
    setnatinality(editProfileData?.nationality);
    setAge(editProfileData?.age);
    setOccupation(editProfileData?.occupation);
    setEmail(editProfileData?.email);
    setPhoneNum(editProfileData?.contact);
    setAboutMe(editProfileData?.aboutMe);
    setMyInterest(editProfileData?.myInterest);
    setpreferenceValue(editProfileData?.preference);
    setGender(editProfileData?.gender);
  }, []);


  // validations
  const validations = (date) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = true;
    if (isEmpty(name)) {
      valid = false;
      setNameErr(true);
      setNameErrText('Please enter name');
    } else {
      setNameErr(false);
      setNameErrText('');
    }

    if (isEmpty(nationality)) {
      valid = false;
      setNationErr(true);
      setNationErrText('Please enter nationality');
    } else {
      setNationErr(false);
      setNationErrText('');
    }

    // if (isEmpty(emirates)) {
    //   valid = false;
    //   setemiErr(true);
    //   setEmiErrText('Please enter emirates');
    // } else {
    //   setemiErr(false);
    //   setEmiErrText('');
    // }

    if (isEmpty(age)) {
      valid = false;
      setAgeErr(true);
      setAgeErrText('Please enter age');
    } else {
      setAgeErr(false);
      setAgeErrText('');
    }

    if (isEmpty(occupation)) {
      valid = false;
      setOcuuErr(true);
      setOccuErrText('Please enter occupation');
    } else {
      setOcuuErr(false);
      setOccuErrText('');
    }

    if (isEmpty(email)) {
      valid = false;
      setEmailErr(true);
      setEmailErrTxt('Please enter email');
    } else if (!emailRegex.test(email)) {
      valid = false;
      setEmailErr(true);
      setEmailErrTxt('Please enter valid email');
    } else {
      setEmailErr(false);
      setEmailErrTxt('');
    }

    // const numVal = /^[0-9]+$/;
    // if (isEmpty(phoneNum)) {
    //   valid = false;
    //   setPhoneNumErr(true);
    //   setPhoneNumErrTxt('Please enter phone number');
    // } else if (
    //   (phoneNum.length > 10) ||
    //   !numVal.test(String(phoneNum)) ||
    //   phoneNum.length < 8
    // ) {
    //   valid = false;
    //   setPhoneNumErr(true);
    //   setPhoneNumErrTxt('Please enter valid phone number');
    // } else {
    //   setPhoneNumErr(false);
    //   setPhoneNumErrTxt('');
    //   // updateUserAPI();
    //   // navigation.navigate('Password',{lData: loginData});
    // }

    if (isEmpty(preferenceValue)) {
      valid = false;
      setPreferenceErr(true);
      setPreferenceErrText('Please enter preference');
    } else {
      setPreferenceErr(false);
      setPreferenceErrText('');
    }

    if (isEmpty(myInterest)) {
      valid = false;
      setMyInterestErr(true);
      setMyInterestErrText('Please enter my interest');
    } else {
      setMyInterestErr(false);
      setMyInterestErrText('');
    }

    if (isEmpty(aboutMe)) {
      valid = false;
      setAboutMeErr(true);
      setAbouttMeErrText('Please enter about me');
    } else {
      setAboutMeErr(false);
      setAbouttMeErrText('');
    }

    if (isEmpty(gender)) {
      valid = false;
      setGendereErr(true);
      setGendereErrText('Please enter gender');
    } else {
      setGendereErr(false);
      setGendereErrText('');
    }

    // if(date) {

    // }
    // if (date) {
    //   setSelectedDate(date);
    //   console.log('selectedDate-----', bDate);

    //   const today = moment();
    //   const minimumAgeDate = moment().subtract(18, 'years');

    //   if (date > today) {
    //     setBirthErr(true);
    //     setBirthdateErrTxt('Please select a valid date');
    //   } else if (date > minimumAgeDate) {
    //     setBirthErr(true);
    //     setBirthdateErrTxt('You must be at least 18 years old');
    //   } else {
    //     console.log("birtadate-----", bDate);
    //     setBDate(formattedDate);
    //     setBirthdateErrTxt('');
    //   }
    //   setShowDatePicker(false);
    // }
    if (date) {
      handleDateChange();
    }

    if (valid) {
      updateUserAPI();
    }
  }

  // API for updateUserAPI
  async function updateUserAPI() {
    const interestsArray = myInterest.split(',');
    setLoader(true);
    const data = {
      name: name,
      nationality: nationality,
      age: age,
      occupation: occupation,
      email: email,
      aboutMe: aboutMe,
      myInterest: JSON.stringify(interestsArray),
      preference: preferenceValue,
      gender: gender,
      dob: bDate,
      // contact: fullPhoneNumber,
    };
    const header = {
      token: accessToken,
    };
    console.log('>allData>>>>>', data);
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.editPRofile}`,
        data,
        header,
        true
      );
      console.log("res====>", response);
      if (response?.status === "success") {
        setLoader(false);
        console.log("status====>", response?.status);
        dispatch(setEditProfileData(response?.data));

        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "User Profile Added Successfully",
          position: 'Top',
        });
        setUserDataApi(response?.data);


        setEdit(false);
      } else {
        setLoader(false);
        console.log('erro>>Something went wrong');
        Toast.show({
          type: 'error',
          text1: response.message,
          position: 'Top',
        });
        // console.log(response.message);
      }
    } catch (error) {
      setLoader(false);
      console.log('error =======>>>', error);
    }
  }
  return (
    <>
      <View style={styles.mainView}>
        <Toast />
        <View style={styles.container}>
          <CHeader
            leftIcon
            headingwithbtn
            headerTitle="My Profile"
            rightBtnTitle={edit ? "Save" : "Edit"}
            rightBtnPress={() => { edit ? validations() : setEdit(true); }}
            //  title="Bank Detail"
            onLeftIconClick={() => navigation.goBack()} />
          <View style={styles.subView}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.listView}>
                <Text style={styles.heading}>Edit Profile</Text>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.subHeading}>Public Profile</Text>
                  <View style={{ paddingTop: 20 }}>

                    {/* Name */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="contacts" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>First Name</Text>
                      </View>
                      {edit ? (
                        <CInput
                          value={name}
                          placeHolder={"Enter Name"}
                          placeHolderColor={"gray"}
                          showError={nameErr}
                          showErrTxt={nameErrText}
                          onChangeText={(name) => setName(name)}
                          errCustomstyl={{ paddingHorizontal: 0 }}
                          // onSubmit={() => {
                          //   validations();
                          // }}
                          customstyl={styles.customInput}
                        />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.username}</Text>}
                    </View>

                    {/* {Nationality} */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="flag" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Nationality</Text>
                      </View>
                      {edit ? (<CInput
                        value={nationality}
                        placeHolder={"Enter Nationality"}
                        placeHolderColor={"gray"}
                        showError={nationErr}
                        showErrTxt={nationErrText}
                        onChangeText={(nationality) => setnatinality(nationality)}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.nationality}</Text>}
                    </View>

                    {/* Ages */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Ages</Text>
                      </View>
                      {edit ? (<CInput
                        value={age}
                        placeHolder={"Enter age"}
                        placeHolderColor={"gray"}
                        showError={ageErr}
                        showErrTxt={ageErrText}
                        onChangeText={(age) => setAge(age)}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.age}</Text>}
                    </View>

                    {/* Occupation */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Occupation</Text>
                      </View>
                      {edit ? (<CInput
                        value={occupation}
                        placeHolder={"Enter Occupation"}
                        placeHolderColor={"gray"}
                        showError={occuErr}
                        showErrTxt={occuErrText}
                        onChangeText={(occupation) => setOccupation(occupation)}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.occupation}</Text>}
                    </View>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={styles.subHeading}>Private Detail</Text>

                  <View style={{ marginTop: 20 }}>

                    {/* Email */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Email</Text>
                      </View>
                      {edit ? (<CInput
                        value={email}
                        placeHolder={"Enter Email"}
                        placeHolderColor={"gray"}
                        showError={emailErr}
                        showErrTxt={emailErrText}
                        onChangeText={(email) => setEmail(email)}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.email}</Text>}
                    </View>

                    {/*  Preference*/}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Preference</Text>
                      </View>
                      {edit ?
                        (
                          <View>
                            <Dropdown
                              style={styles.dropdown}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              iconStyle={styles.iconStyle}
                              data={gData}
                              maxHeight={300}
                              labelField="label"
                              valueField="label"
                              //prevValue => prevValue ? `${prevValue}, ${item.label}` : item.label  );
                              placeholder={('' ? 'Select item' : preferenceValue)}
                              value={preferenceValue}
                              onChange={item => {
                                setpreferenceValue(item.label);

                              }}
                            />
                            {preferenceErr ? <Text style={styles.errorText}>{preferenceErrText}</Text> : null}
                          </View>
                        )
                        :
                        <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.preference}</Text>}
                    </View>

                    {/* MyIntrest */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>My Intrest</Text>
                      </View>
                      {edit ? (<CInput
                        value={myInterest}
                        placeHolder={'Enter my Intrest'}
                        // placeholder={myInterest ? 'Enter my Interest' : 'Placeholder Text'}

                        placeHolderColor={"gray"}
                        showError={myInterestErr}
                        showErrTxt={myInterestErrText}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        onChangeText={(myInterest) => setMyInterest(myInterest)}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) :
                        <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.myInterest}</Text>}
                    </View>

                    {/* AboutMe */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>About me</Text>
                      </View>
                      {edit ? (<CInput
                        multiline={true}
                        numberOfLines={4}
                        value={aboutMe}
                        placeHolder={"Enter about Me"}
                        placeHolderColor={"gray"}
                        showError={abouttMeErr}
                        showErrTxt={abouttMeErrText}
                        errCustomstyl={{ paddingHorizontal: 0 }}
                        onChangeText={(aboutMe) => setAboutMe(aboutMe)}
                        // onSubmit={() => {
                        //   validations();
                        // }}
                        customstyl={styles.customInput}
                      />) : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.aboutMe}</Text>}
                    </View>

                    {/* {Gender} */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Gender</Text>
                      </View>
                      {edit ?
                        (
                          <View>
                            <Dropdown
                              style={styles.dropdown}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              iconStyle={styles.iconStyle}
                              data={gData}
                              maxHeight={300}
                              labelField="label"
                              valueField="label"
                              // placeholder={'Select item'}
                              placeholder={('' ? 'Select item' : gender)}
                              value={gender}
                              onChange={item => {
                                setGender(item.label);
                              }}
                            />
                            {gendereErr ? <Text style={styles.errorText}>{gendereErrText}</Text> : null}
                          </View>
                        )
                        : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.gender}</Text>}
                    </View>

                    {/* {Birtdate} */}
                    <View style={styles.rowView}>
                      <View style={styles.iconView}>
                        <AIcon name="lock" size={18} color={BaseColors.darkBlack} style={styles.iconSty} />
                        <Text style={styles.labeltyl}>Birthdate</Text>
                      </View>
                      {edit ?
                        (
                          <View>
                            <View style={styles.inputView}>
                              <TouchableOpacity onPress={showDatePickerModal} style={styles.inputView}>
                                <Text style={styles.inputText}>{formattedDate}</Text>
                              </TouchableOpacity>

                              {showDatePicker && (
                                <DatePicker
                                  value={selectedDate}
                                  mode="date"
                                  display="default"
                                  onChange={handleDateChange}
                                />
                              )}
                              {birtadateErr ? <Text style={styles.errorText}>{birthdateErrTxt}</Text> : null}
                            </View>

                          </View>
                        )
                        : <Text style={styles.nametxtStyl}>{loader ? "Loding..." : editProfileData?.dob}</Text>}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>


      </View>
    </>

  );
};

export default EditProfile;