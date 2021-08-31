import React, { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { IMG_HOST, multiSearch } from 'services/api'
import { fonts } from 'styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MText } from 'components'
import moment from 'moment'

const MovieSearchScreen = ({theme, navigation}) => {

  const [searchString, setSearchString] = useState('')
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    console.log('search')
  }, [])

  const onSearch = () => {
    setLoading(true)
    multiSearch(searchString).then(res => {
      console.log(res)
      setLoading(false)
      if(res.status == 200){
        setMovies(res.data.results)
      }
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{padding: 10}}>
        <View style={[styles.search, {backgroundColor: theme.foreground}]}>
          <TextInput
            style={{width: '100%', height: 40, color: theme.text, fontSize: 16, fontFamily: fonts.medium}}
            placeholder='Search movie title, genre, etc'
            placeholderTextColor='darkgrey'
            onChangeText={txt => setSearchString(txt)}
            autoFocus={true}
            returnKeyType='search'
            onSubmitEditing={() => onSearch()}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', {itemData: item})} activeOpacity={0.6} style={[styles.itemList, {backgroundColor: theme.foreground}]}>
            <View style={{width: '20%'}}>
              <Image
                source={{ uri: `${IMG_HOST}${item.poster_path}` }}
                style={{ height: 100, width: 70, backgroundColor: 'lightgrey' }}
                resizeMode='cover'
              />
            </View>
            <View style={{width: '60%'}}>
              <MText bold textStyle={{fontSize: 16, color: theme.text}}>{item.title}</MText>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='star' size={16} color='orange' />
                  <MText bold textStyle={{ color: theme.text }}>{item.vote_average} </MText>
                </View>
                <MText textStyle={{ color: theme.text }}>| {moment(item.release_date).format('YYYY')} </MText>
              </View>
              <MText textStyle={{ color: 'darkgrey', fontSize: 12 }} numberOfLines={2}>{item.overview}</MText>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{flexGrow: 1, padding: 10}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  itemList: {
    height: 100, 
    width: '100%', 
    flexDirection: 'row', 
    marginBottom: 10,
  }
})


const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
})

export default connect(mapStateToProps) (MovieSearchScreen)