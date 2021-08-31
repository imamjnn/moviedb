import React from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IMG_HOST } from 'services/api';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { setTheme } from 'store/actions';
import { connect } from 'react-redux';
import MText from './MText';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({data, title='Title', loading=false, type='movie', theme}) => {

  const navigation = useNavigation()

  return (
    <View style={[styles.card, {backgroundColor: theme.foreground}]}>
      <View style={{paddingBottom: 12, paddingLeft: 12}}>
        <MText textStyle={{fontSize: 18, color: theme.text}}>{title}</MText>
      </View>
      {
        loading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color='tomato' />
        </View> :
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', {itemData: item})} activeOpacity={0.6} style={[styles.item, {marginRight: index == 19 ? 12 : 0}]}>
                <ImageBackground
                  source={{uri: `${IMG_HOST}${item.poster_path}`}}
                  style={{height: 220, width: 150}}
                  imageStyle={{borderRadius: 4}}
                >
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]} style={styles.gradient}>
                    <MText numberOfLines={2} textStyle={{color: 'white'}}>{type == 'movie' ? item.title : item.name}</MText>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <MText textStyle={{fontSize: 12, color: 'lightgrey'}}>{moment(item.release_date).format('YYYY')}</MText>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name='star' size={14} color='yellow' />
                        <MText textStyle={{color: 'lightgrey', fontSize: 12}}> {item.vote_average}/{item.vote_count}</MText>
                      </View>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <MText>No data</MText>
            </View>
          )}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 12, 
    paddingRight: 0, 
    paddingLeft: 0, 
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 1,
    marginBottom: 10
  },
  item: {
    height: 220,
    width: 150,
    backgroundColor: 'lightgrey',
    marginLeft: 12,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  gradient: {
    height: 220, 
    width: 150, 
    borderRadius: 4,
    justifyContent: 'flex-end',
    padding: 10
  }
});

const mapStateToProps = state => ({
  theme: state.LocalTheme.theme
})

const mapDistpatchToProps = {
  setTheme: setTheme
}

export default connect(mapStateToProps, mapDistpatchToProps) (MovieList)