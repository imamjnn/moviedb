import { combineReducers } from 'redux'
import { LocalTheme, Favorite } from './reducers'

const reducers = combineReducers({
  LocalTheme,
  Favorite
})

export default reducers;