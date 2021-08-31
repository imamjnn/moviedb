import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { connect } from 'react-redux'
import { save } from 'services/storage'
import { setTheme } from 'store/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from 'styles'
import { MText } from 'components'

const AboutScreen = ({theme, setTheme}) => {

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    console.log('about')
  }, [])

  const onChangeTheme = () => {
    if(isDarkMode){
      setIsDarkMode(false)
      setTheme(colors.light)
      save('theme', 'light')
    }else{
      setIsDarkMode(true)
      setTheme(colors.dark)
      save('theme', 'dark')
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.card, {backgroundColor: theme.foreground}]}>
        <MText textStyle={{color: theme.text, textAlign: 'center'}}>Aplikasi ini dibuat dengan React native dan menggunakan API dari The Movie Database (TMDB)</MText>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
          <Icon name={isDarkMode ? 'weather-night' : 'white-balance-sunny'} color={theme.text} size={24} />
          <Switch
            onValueChange={() => onChangeTheme()}
            value={isDarkMode}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '80%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})


const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
})

const mapDistpatchToProps = {
  setTheme: setTheme,
}

export default connect(mapStateToProps, mapDistpatchToProps) (AboutScreen)