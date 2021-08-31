import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MText from './MText'

const MButton = ({
  title='Simple',
  onPress,
  bgColor='#fafafa',
  titleColor='black',
  rounded=false,
  roundedColor='black'
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.8}
      style={[styles.btn, {backgroundColor: bgColor, borderWidth: rounded ? 2 : 0, borderColor: rounded ? roundedColor : 'black'}]}
    >
      <MText medium textStyle={{color: titleColor}}>{title}</MText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }
})


export default MButton