const actions = {
  SET_THEME: 'SET_THEME',
  ADD_FAVORITE: 'ADD_FAVORITE'
}

export const setTheme = theme => ({
  type: actions.SET_THEME,
  theme
})

export const addFavorite = favoriteList => ({
  type: actions.ADD_FAVORITE,
  favoriteList
})


export default actions