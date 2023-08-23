import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../VideoCall/styles";
import { useDispatch, useSelector } from 'react-redux';
import { Image } from "react-native-elements";
import { Images } from '../../config/images';
import AIcon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '../../config/theme';


const VideoCall = ({navigation,route}) => {
  const cadata = route?.params?.d;
      const accessToken = useSelector(state => state.auth.accessToken);
    console.log('accessToken----VideoCall----', accessToken);
    console.log("allData>>>",cadata);

    return (
      <View style={styles.container}>
      <Image
      //  source={Images.vcProfile}  
      source={{uri:cadata?.receiverPic}}
      resizeMode='cover'
      style={styles.bgImg}/>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backArrow}>
        <AIcon name="left" size={25} color={BaseColors.white} />
        </TouchableOpacity>       
        
      {/* bottomView */}
      <View style={{position:'absolute',bottom:0}}>
      <View style={styles.namestyl}>
      <Text style={styles.name}>
        {/* Bhumi */}
        {cadata?.receiverName}
        </Text>
      <Text style={styles.subTitle}>
        {/* Devoloper  */}
        {cadata?.receiverOccupation}
      </Text>
      <View style={styles.timerView}>
      <Text style={styles.timer}>00:03:45</Text>
      </View>
      </View>
      <View style={styles.btmVlImg}>       
      <Image
      //  source={Images.secUserVl}  
      source={{uri:cadata?.callerPic}}
      resizeMode='cover'
      style={styles.vclIMG}
      />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.callingView}>
      <Image
       source={Images.phnIcon}  
      resizeMode='cover'
      style={styles.phnIconStyl}
      />
      </TouchableOpacity>             
      <Image source={Images.footer}  
      resizeMode='cover'
      style={styles.footerImg}/>
      </View>
        </View>
    );
};
export default VideoCall;