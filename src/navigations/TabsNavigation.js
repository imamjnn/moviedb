import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';

import HomeScreen from 'screens/home'
import FavoriteScreen from 'screens/favorite'
import AboutScreen from 'screens/about'
import { fonts } from 'styles';

const Tab = createBottomTabNavigator();

const TabsNavigation = ({theme}) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'movie' : 'movie-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information' : 'information-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontFamily: fonts.medium
        },
        style: {
          backgroundColor: theme.background,
          borderTopWidth: 0,
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Movies'}} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{title: 'Favorite'}} />
      <Tab.Screen name="About" component={AboutScreen} options={{title: 'About'}} />
    </Tab.Navigator>
  );
}

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
})

export default connect(mapStateToProps) (TabsNavigation)