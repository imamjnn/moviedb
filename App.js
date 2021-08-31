/**
 * React Navigation Boilerplate By Imam Jinani
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import RootNavigation from 'navigations'

import { Provider } from 'react-redux'
import { createStore } from 'redux' 
import reducers from 'store'
import { load } from 'services/storage'
import { setTheme } from 'store/actions'
import { colors } from 'styles'

const store = createStore(reducers)

const App = () => {

  useEffect(() => {
    console.log('redux store', store)
    checkCurrentTheme()
  }, [])

  const checkCurrentTheme = async () => {
    const theme = await load('theme')
    console.log('theme', theme)
    if(theme != 'NotFoundError'){
      store.dispatch(setTheme(theme == 'dark' ? colors.dark : colors.light))
    }else{
      store.dispatch(setTheme(colors.light))
    }
  }

  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  )
}

export default App;
