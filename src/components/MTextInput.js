import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { fonts } from 'styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const MTextInput = ({
  placeholder='Text input ..',
  iconRight='account',
  iconColor='grey',
  txtColor='black',
  ...props
}) => {
  return (
    <View style={[styles.txtInput]} >
      <View style={{width: '90%'}}>
        <TextInput
          {...props}
          placeholder={placeholder}
          style={{width: '100%', height: 40, color: txtColor, fontFamily: fonts.normal, paddingRight: 8, paddingLeft: 8}}
          placeholderTextColor='grey'
        />
      </View>
      {
        iconRight ?
        <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={iconRight} size={26} color={iconColor} />
        </View> : null
      }
    </View>
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


export default MTextInput