import actions from './actions'
import { colors } from 'styles'

const initState = {
  theme: colors.light
}

const initStateFavorite = {
  favoriteList: []
}


export const LocalTheme = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_THEME:
      return {...state, theme: action.theme}
    default:
      return state
  }
}

export const Favorite = (state = initStateFavorite, action) => {
  switch (action.type) {
    case actions.ADD_FAVORITE:
      return {...state, favoriteList: action.favoriteList}
    default:
      return state
  }
}

