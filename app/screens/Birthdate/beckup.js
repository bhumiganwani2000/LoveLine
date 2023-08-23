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
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import CInput from '../../components/CInput';
import { BaseColors } from '../../config/theme';
// import Icon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import DatePicker from '@react-native-community/datetimepicker';
import moment, { months } from 'moment';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import Toast from 'react-native-toast-message'
import SelectDropdown from 'react-native-select-dropdown';



const Birthdate = ({ navigation, route }) => {
  const alldata = route.params?.data;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
  const [bDate, setBDate] = useState(moment().format("DD/MM/YYYY"));

  const [birtadateErr, setBirthErr] = useState(false);
  const [birthdateErrTxt, setBirthdateErrTxt] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(''); // Add a state to keep track of the selected month
  const [selectedDay, setSelectedDay] = useState('');


  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const date = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ];

  let countYear = []
  for(let i=0; i<=30;i++){
    let currentYear = 2023;
    countYear.push(currentYear - i)
  }
  const yearNew = countYear;

  console.log("New years ", yearNew)
  const year = [
    '2023', '2022', '2021',
    '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011',
    '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001',
    '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991',
    '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981',
    '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971',
  ];

  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  // };
  // const [dates, setDates] = useState(date);

  // const handleOptionSelect = (option) => {
  //   setSelectedMonth(option);
  //   const maxDays = moment(option, 'MMMM').daysInMonth();
  //   if (selectedDay && parseInt(selectedDay) > maxDays) {
  //     setSelectedDay('');
  //   }
  //   const updatedDates = date.slice(0, maxDays);
  //   setDates(updatedDates);
  // };



  const maxDays = moment(selectedMonth, 'MMMM').daysInMonth();
  const dates = Array.from({ length: maxDays }, (_, i) => (i + 1).toString());
  const handleOptionSelect = (option) => {
    setSelectedMonth(option);
    if (parseInt(selectedDay) > maxDays) {
      setSelectedDay('');
    }
  };


  // ... (previous code)

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    console.log("===>>", alldata);


  }, [])
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
  // const handleButtonPress = () => {
  //   handleDateChange();

  //   if (birthdateErrTxt === '') {
  //     updateUserAPI();
  //     // Call your API function here
  //   }
  // };
  // API for updateUserAPI
  async function updateUserAPI() {
    setLoader(true);
    const data = {
      contact_no: alldata.mobile,
      password: alldata.password,
      username: alldata?.name,
      gender: alldata?.gender,
      dob: bDate,
      is_register: true
    };
    console.log('>allData>>>>>', data);
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.updateUser}`,
        data,
        {},
        true
      );
      console.log("res====>", response);
      if (response?.status === "success") {
        setLoader(false);
        console.log("status====>", response?.status);
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "User Registered Successfully",
          position: 'Top',
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
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
      console.log('error =======>>>', error);
    }
  }




  return (
    <>
      <View style={styles.mainView}>
        <Toast />
        <StatusBar
          backgroundColor={BaseColors.white}
          barStyle="dark-content"
          translucent
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.uprView}>
            <View style={{ paddingHorizontal: 28 }}>
              <Text style={styles.header}>When’s your birthday</Text>
              <Text style={styles.subHeading}>Your age information will be updated
                on your profile page and this will displayed
                publicly on your dashboard</Text>
            </View>

            <View style={styles.container}>
              <TouchableOpacity onPress={showDatePickerModal} style={styles.inputView}>
                <Text style={styles.inputText}>{formattedDate}</Text>
              </TouchableOpacity>

              {/* {showDatePicker && (
                // <DatePicker
                //   value={selectedDate}
                //   mode="date"
                //   display="default"
                //   onChange={handleDateChange}
                // />
              )} */}
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <SelectDropdown
                  data={months}
                  onSelect={handleOptionSelect}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  defaultButtonText="MM"
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  renderDropdownIcon={() => <Text>▼</Text>}
                  dropdownStyle={styles.dropdown}
                  dropdownTextStyle={styles.dropdownText}
                />
                <SelectDropdown
                  data={dates}
                  onSelect={handleOptionSelect}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  defaultButtonText="DD"
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  renderDropdownIcon={() => <Text>▼</Text>}
                  dropdownStyle={styles.dropdown}
                  dropdownTextStyle={styles.dropdownText}
                />
                <SelectDropdown
                  data={year}
                  onSelect={handleOptionSelect}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  defaultButtonText="YYYY"
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  renderDropdownIcon={() => <Text>▼</Text>}
                  dropdownStyle={styles.dropdown}
                  dropdownTextStyle={styles.dropdownText}
                />
              </View>
              {birtadateErr ? <Text style={styles.errorText}>{birthdateErrTxt}</Text> : null}
            </View>

          </View>
          <View style={styles.btmView}>
            <Text style={styles.btmTxt}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum </Text>
            <CButton
              loading={loader}
              containerStyle={{ marginTop: 20 }}
              btnTitle={"continue"}
              onPress={() => handleButtonPress()}
            />
          </View>
        </SafeAreaView>

      </View>
    </>

  );
};

export default Birthdate;
