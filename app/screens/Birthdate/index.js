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
  // const [bDate, setBDate] = useState(moment().format("DD/MM/YYYY"));
  // console.log('bDate==========', bDate);


  const [birtadateErr, setBirthErr] = useState(false);
  const [birthdateErrTxt, setBirthdateErrTxt] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  const [year, setYear] = useState([]);
  const [selectedBirthdate, setSelectedBirthdate] = useState('');
  console.log('selectedBirthdate%%%%%%%%%%%', selectedBirthdate);

  useEffect(() => {

    let countYear = []
    for (let i = 0; i <= 30; i++) {
      let currentYear = 2023;
      countYear.push(currentYear - i)
    }
    const yearNew = countYear;
    setYear(yearNew)
  }, [])

  // useEffect(() => {
  //   console.log("year updated ", year)
  // }, [year])

  const [dates, setDates] = useState(date);

  const handleMonthSelect = (option) => {
    setSelectedMonth(option);
    console.log('Selected month-----', option);
    const maxDays = moment(option, 'MMMM').daysInMonth();
    if (selectedDay && parseInt(selectedDay) > maxDays) {
      setSelectedDay('');
    }
    const updatedDates = date.slice(0, maxDays);
    setDates(updatedDates);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    console.log('Selected day--------', day);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    console.log('Selected year--------', year);
  };

  const updateSelectedBirthdate = () => {
    if (selectedMonth && selectedDay && selectedYear) {
      const formattedDate = moment(`${selectedMonth} ${selectedDay} ${selectedYear}`, 'MMMM DD YYYY').format('DD/MM/YYYY');
      setSelectedBirthdate(formattedDate);
      updateUserAPI(formattedDate);
    }
  };
  useEffect(() => {
    console.log('Selected month-----', selectedMonth);
    console.log('Selected day--------', selectedDay);
    console.log('Selected year--------', selectedYear);
    console.log('Complete birthdate-----', selectedBirthdate); // Log the complete birthdate
  }, [selectedMonth, selectedDay, selectedYear, selectedBirthdate]);

  const isBirthdateValid = () => {
    if (!selectedMonth || !selectedDay || !selectedYear) {
      setBirthErr(true);
      setBirthdateErrTxt("Please select a valid birthdate");
      return false;
    }

    const maxDays = moment(selectedMonth, 'MMMM').daysInMonth();
    if (parseInt(selectedDay) > maxDays) {
      setBirthErr(true);
      setBirthdateErrTxt("Invalid day for the selected month");
      return false;
    }

    const selectedDateObj = moment(`${selectedMonth} ${selectedDay} ${selectedYear}`, 'MMMM DD YYYY');
    if (!selectedDateObj.isValid()) {
      setBirthErr(true);
      setBirthdateErrTxt("Invalid birthdate");
      return false;
    }

    // If all validations pass, return true
    return true;
  };

  const handleButtonPress = () => {
    if (isBirthdateValid()) {
      const formattedDate = moment(`${selectedMonth} ${selectedDay} ${selectedYear}`, 'MMMM DD YYYY').format('DD/MM/YYYY');
      updateUserAPI(formattedDate);
    }
  };

  // API for updateUserAPI
  async function updateUserAPI(formattedDate) {
    setLoader(true);
    const data = {
      contact_no: alldata.mobile,
      password: alldata.password,
      username: alldata?.name,
      gender: alldata?.gender,
      dob: formattedDate,
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
              <SelectDropdown
                defaultValue={selectedMonth}
                data={months}
                onSelect={handleMonthSelect}
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
                defaultValue={selectedDay}
                data={dates}
                onSelect={handleDaySelect}
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
                defaultValue={selectedYear}
                data={year}
                onSelect={handleYearSelect}
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
