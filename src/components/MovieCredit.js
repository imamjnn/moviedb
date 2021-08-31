import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { getMovieCredit, IMG_HOST } from 'services/api';
import MText from './MText';

const MovieCredit = ({theme, movieId}) => {

  const [credits, setCredits] = useState([])

  useEffect(() => {
    getMovieCredit(movieId).then(res => {
      setCredits(res.data.cast)
    })
  }, [])

  const _renderItem = ({item}) => (
    <View style={{width: 76, alignItems: 'center',  marginRight: 8}}>
      <Image
        source={{uri: `${IMG_HOST}/${item.profile_path}`}}
        style={{height: 100, width: 76, borderRadius: 4, backgroundColor: 'lightgrey'}}
      />
      <MText numberOfLines={2} textStyle={{fontSize: 12, textAlign: 'center', color: theme.text}}>{item.name}</MText>
    </View>
  )

  return (
    credits.length == 0 ?
    <View style={{height: 160, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <MText textStyle={{color: theme.text}}>No Data</MText>
    </View> :
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={credits}
      renderItem={_renderItem}
      horizontal={true}
      contentContainerStyle={{paddingTop: 12}}
    />
  )
}

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme,
})

export default connect(mapStateToProps) (MovieCredit)
