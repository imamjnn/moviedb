import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native'
import { MButton, MText } from 'components'
import { connect } from 'react-redux'
import { getMovieDetail, IMG_HOST, IMG_IMDB } from 'services/api'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { loadAll, removeById, saveById } from 'services/storage'
import { addFavorite } from 'store/actions'
import MovieCredit from 'components/MovieCredit'

const MovieDetailScreen = ({ route, theme, addFavorite, favoriteList }) => {

  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    loadMovieDetail()
    checkFavorite()
  }, [])

  const loadMovieDetail = () => {
    getMovieDetail(route.params.itemData.id).then(res => {
      console.log(res)
      setLoading(false)
      if (res.status == 200) {
        setMovie(res.data)
      }
    })
  }

  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  const checkFavorite = async () => {
    const favorites = await loadAll('movieFavorites')
    const check = favorites.find(item => item.id == route.params.itemData.id)
    setIsFavorite(check ? true : false)
  }

  const onAddFavorite = (item) => {
    console.log(item)
    if(isFavorite){
      removeById('movieFavorites', item.id).then(res => {
        loadAll('movieFavorites').then(b => {
          setIsFavorite(false)
          addFavorite(b)
        })
      })
    }else{
      saveById('movieFavorites', item.id, {...item, created: new Date().getTime()})
      .then(res => {
        loadAll('movieFavorites').then(b => {
          setIsFavorite(true)
          addFavorite(b)
        })
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.background }}>
      {
        !loading && movie ?
          <View>
            <Image
              source={{ uri: `${IMG_IMDB}${movie.backdrop_path}` }}
              style={{ height: 240, width: '100%' }}
              resizeMode='cover'
            />
            <View style={styles.content}>
              <View style={{ width: '30%' }}>
                <Image
                  source={{ uri: `${IMG_HOST}${movie.poster_path}` }}
                  style={{ height: 160, width: 110, borderRadius: 4 }}
                  resizeMode='cover'
                />
              </View>
              <View style={{ width: '70%' }}>
                <MText bold textStyle={{ color: theme.text, fontSize: 16 }}>{movie.title}</MText>
                <FlatList
                  keyExtractor={item => item.name}
                  data={movie.genres}
                  renderItem={({ item }) => (
                    <View style={{ paddingRight: 10, height: 20 }}>
                      <MText textStyle={{ color: theme.text }}>{item.name}</MText>
                    </View>
                  )}
                  horizontal={true}
                  style={{ height: 20, flexGrow: 0, marginBottom: 10 }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='star' size={16} color='orange' />
                    <MText bold textStyle={{ color: theme.text }}>{movie.vote_average} </MText>
                  </View>
                  <MText textStyle={{ color: theme.text }}>| {moment(movie.release_date).format('YYYY')} </MText>
                  <MText textStyle={{ color: theme.text }}>| {movie.runtime}m</MText>
                </View>
              </View>
              <View style={{position: 'absolute', right: 10}}>
                <Icon onPress={() => onAddFavorite(movie)} name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={isFavorite ? 'red' : 'darkgrey'} />
              </View>
            </View>
            <View style={{ top: -40, padding: 10 }}>
              <MText bold textStyle={{ color: theme.text }}>Overview</MText>
              <MText textStyle={{ color: theme.text }}>{movie.overview}</MText>
              <View style={styles.card}>
                <View>
                  <MText textStyle={{ color: theme.text }}>Status</MText>
                  <MText textStyle={{ color: 'darkgrey', paddingBottom: 8 }}>{movie.status}</MText>
                  <MText textStyle={{ color: theme.text }}>Original Language</MText>
                  <MText textStyle={{ color: 'darkgrey', paddingBottom: 8 }}>{movie.original_language}</MText>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <MText textStyle={{ color: theme.text }}>Budget</MText>
                  <MText textStyle={{ color: 'darkgrey', paddingBottom: 8 }}>${format(movie.budget)}</MText>
                  <MText textStyle={{ color: theme.text }}>Revenue</MText>
                  <MText textStyle={{ color: 'darkgrey', paddingBottom: 8 }}>${format(movie.revenue)}</MText>
                </View>
              </View>
              <View style={{paddingTop: 20}}>
                <MText bold textStyle={{ color: theme.text }}>Top Billed Cast</MText>
                <MovieCredit
                  movieId={movie.id}
                />
              </View>
            </View>
          </View> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color={theme.text} />
          </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    height: 140, 
    width: '100%', 
    top: -50, 
    paddingRight: 10, 
    paddingLeft: 10, 
    flexDirection: 'row', 
    alignItems: 'flex-end'
  },
  card: {
    padding: 8, 
    borderWidth: 0.4, 
    marginTop: 10, 
    borderColor: 'lightgrey', 
    borderRadius: 4, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
})

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
  favoriteList: state.Favorite.favoriteList,
})

const mapDistpatchToProps = {
  addFavorite: addFavorite
}

export default connect(mapStateToProps, mapDistpatchToProps)(MovieDetailScreen)