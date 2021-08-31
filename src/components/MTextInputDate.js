import React, { useState, useRef } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import MText from './MText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

const MTextInputDate = ({
  txtColor='black',
  bgColor='white',
  onChangeDate
}) => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const modalizeRef = useRef(null)

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const onChange = (currentDate) => {
    setDate(currentDate)
    onChangeDate(currentDate)
  }

  return (
    <>
      <Pressable onPress={() => onOpen()} style={styles.txtInput}>
        <View style={{width: '90%'}}>
          <MText textStyle={{paddingLeft: 8, color: txtColor}}>{moment(date).format('DD-MM-YYYY')}</MText>
        </View>
        <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name='calendar-month' size={26} color='grey' />
        </View>
      </Pressable>
      <Portal>
        <Modalize 
          ref={modalizeRef} 
          adjustToContentHeight={true}
          modalStyle={{backgroundColor: bgColor}}
          HeaderComponent={
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View>
                <MText medium textStyle={{fontSize: 16, color: 'grey'}}>Select Date</MText>
              </View>
              <Pressable onPress={() => modalizeRef.current?.close()} style={{justifyContent: 'center'}}>
                <MText bold textStyle={{fontSize: 16, color: txtColor}}>Done</MText>
              </Pressable>
            </View>
          }
        >
          <View style={{alignItems: 'center'}}>
            <DatePicker
              date={date}
              mode='date'
              style={{backgroundColor: bgColor, width: 400}}
              textColor={txtColor}
              is24hourSource='locale'
              onDateChange={onChange}
              // locale='id-ID'
              // androidVariant='nativeAndroid'
              fadeToColor='none'
            />
          </View>
        </Modalize>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  txtInput: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'lightgrey'
  }
})

export default MTextInputDate