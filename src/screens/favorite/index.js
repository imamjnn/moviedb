import { MText } from 'components'
import MHeader from 'components/MHeader'
import React, { useEffect } from 'react'
import { Alert, FlatList, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { IMG_HOST } from 'services/api'
import { addFavorite } from 'store/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { loadAll, removeById } from 'services/storage'

const FavoriteScreen = ({theme, favoriteList, addFavorite}) => {

  useEffect(() => {
    console.log(favoriteList)
  }, [favoriteList])

  const deleteFavorite = (item) => {
    Alert.alert(
      '',
      `Are you sure you want to delete ${item.title} from favorite!`,
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {text: 'DELETE', onPress: () => {
          removeById('movieFavorites', item.id).then(res => {
            loadAll('movieFavorites').then(b => {
              addFavorite(b)
            })
          })
        }},
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <MHeader
        title='My Favorite Movies'
      />
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={favoriteList}
        renderItem={({item}) => (
          <View style={[styles.itemList, {backgroundColor: theme.foreground}]}>
            <View style={{width: '20%'}}>
              <Image
                source={{ uri: `${IMG_HOST}${item.poster_path}` }}
                style={{ height: 100, width: 70 }}
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
                <MText textStyle={{ color: theme.text }}>| {item.runtime}m</MText>
              </View>
              <MText textStyle={{ color: 'darkgrey', fontSize: 12 }} numberOfLines={2}>{item.overview}</MText>
            </View>
            <View style={{position: 'absolute', right: 10, bottom: 10}}>
              <Icon onPress={() => deleteFavorite(item)} name='delete' size={24} color='red' />
            </View>
          </View>
        )}
        contentContainerStyle={{flexGrow: 1, padding: 10}}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  itemList: {
    height: 100, 
    width: '100%', 
    flexDirection: 'row', 
    marginBottom: 10,
  }
})


const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
  favoriteList: state.Favorite.favoriteList,
})

const mapDistpatchToProps = {
  addFavorite: addFavorite
}

export default connect(mapStateToProps, mapDistpatchToProps) (FavoriteScreen)