import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { getMovies } from 'services/api'
import MovieList from 'components/MovieList'
import MHeader from 'components/MHeader'

const HomeScreen = ({theme}) => {

  const [loadingTopRated, setLoadingTopRated] = useState(true)
  const [loadingUpcoming, setLoadingUpcoming] = useState(true)
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true)
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [upcomingMovie, setUpcomingMovie] = useState([])
  const [nowPlayingMovie, setNowPlayingMovie] = useState([])

  useEffect(() => {
    loadMovie()
  }, [theme])

  const loadMovie = () => {
    getMovies('top_rated').then(res => {
      console.log(res)
      setLoadingTopRated(false)
      if(res.status == 200) {
        setTopRatedMovie(res.data.results)
      }
    })
    getMovies('upcoming').then(res => {
      console.log(res)
      setLoadingUpcoming(false)
      if(res.status == 200) {
        setUpcomingMovie(res.data.results)
      }
    })
    getMovies('now_playing').then(res => {
      console.log(res)
      setLoadingNowPlaying(false)
      if(res.status == 200) {
        setNowPlayingMovie(res.data.results)
      }
    })
  }

  return (
    <View style={{flex: 1}}>
      <MHeader
        title='MOVIEDB'
        iconRight
      />
      <ScrollView contentContainerStyle={[styles.container, {backgroundColor: theme.background}]}>
        <MovieList
          title='Top Rated Movie'
          data={topRatedMovie}
          loading={loadingTopRated}
        />
        <MovieList
          title='Upcoming Movie'
          data={upcomingMovie}
          loading={loadingUpcoming}
        />
        <MovieList
          title='Now Playing Movie'
          data={nowPlayingMovie}
          loading={loadingNowPlaying}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  }
})

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme
})

export default connect(mapStateToProps) (HomeScreen)