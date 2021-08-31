// In App.js in a new project

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { fonts } from 'styles'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { Host } from 'react-native-portalize'

import MovieDetailScreen from 'screens/home/MovieDetailScreen'
import TabsNavigation from './TabsNavigation'
import MovieSearchScreen from 'screens/home/MovieSearchScreen'

const Stack = createStackNavigator();

const RootNavigation = ({theme}) => {
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {fontFamily: fonts.medium},
            headerStyle: Platform.OS == 'ios' ? {backgroundColor: theme.foreground, shadowColor: 'transparent'} : {height: 52, backgroundColor: theme.foreground},
            headerBackTitleStyle: {fontFamily: fonts.medium},
            headerPressColorAndroid: 'rgba(0, 0, 0, 0.20)',
            headerTintColor: theme.text,
            animationEnabled: true,
            headerBackTitle: false,
          }}
          headerMode='screen'
        >
          <Stack.Screen name="Tabs" component={TabsNavigation} options={{headerShown: false}} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{headerTransparent: true, title: ''}} />
          <Stack.Screen name="MovieSearch" component={MovieSearchScreen} options={{title: 'Search Movie'}} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
})

export default connect(mapStateToProps) (RootNavigation);