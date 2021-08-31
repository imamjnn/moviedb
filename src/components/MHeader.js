import React, { useState } from 'react'
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import MText from './MText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const MHeader = ({title='Title', subTitle='', iconRight=false, theme}) => {

  const navigation = useNavigation()

  return (
    <View style={[styles.header, {backgroundColor: theme.foreground}]}>
      <View style={{width: '80%'}}>
        <MText bold textStyle={{fontSize: 18, color: theme.text}} >{title}</MText>
        {
          subTitle ?
          <MText medium textStyle={{fontSize: 12, color: theme.text}} >{subTitle}</MText>
          : null
        }
      </View>
      <View style={{width: '20%'}}>
        {
          iconRight ?
          <TouchableOpacity onPress={() => navigation.navigate('MovieSearch')} activeOpacity={0.6} style={{alignItems: 'flex-end'}}>
            <Icon name='movie-search' color={theme.text} size={24} />
          </TouchableOpacity> : null
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 52, 
    width: '100%', 
    alignItems: 'center', 
    padding: 14,
    elevation: 2,
    flexDirection: 'row'
  }
});

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme
})

export default connect(mapStateToProps) (MHeader)
