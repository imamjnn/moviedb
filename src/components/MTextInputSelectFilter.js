import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import MText from './MText'
import MTextInput from './MTextInput'

const MTextInputSelectFilter = ({
  placeholder='Select Items',
  txtColor='black',
  bgColor='white',
  onChangeItem,
  data=[{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}]
}) => {

  const [itemSelected, setItemSelected] = useState(null)
  const [filterText, setFilterText] = useState('')

  const modalizeRef = useRef(null)

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const onSelectItem = (item) => {
    setItemSelected(item)
    onChangeItem(item)
    modalizeRef.current?.close()
  }

  return (
    <>
      <Pressable onPress={() => onOpen()} style={styles.txtInput}>
        <View style={{width: '90%'}}>
          <MText textStyle={{paddingLeft: 8, color: itemSelected ? txtColor : 'grey'}}>{itemSelected ? itemSelected.name : placeholder}</MText>
        </View>
        <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name='chevron-down' size={26} color='grey' />
        </View>
      </Pressable>
      <Portal>
        <Modalize 
          ref={modalizeRef} 
          snapPoint={400}
          adjustToContentHeight={false}
          modalStyle={{backgroundColor: bgColor}}
          HeaderComponent={
            <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
              <MText medium textStyle={{paddingBottom: 10, fontSize: 16, color: 'grey'}}>{placeholder}</MText>
              <MTextInput
                placeholder='Search'
                iconRight='text-box-search-outline'
                onChangeText={txt => setFilterText(txt)}
                txtColor={txtColor}
              />
            </View>
          }
          flatListProps={{
            keyExtractor: (item, index) => index.toString(),
            data: data.filter(a => a.name.toLowerCase().includes(filterText.toLowerCase())),
            contentContainerStyle: {flexGrow: 1},
            renderItem: ({item}) => (
              <Pressable onPress={() => onSelectItem(item)} style={{padding: 10}}>
                <MText textStyle={{color: txtColor}}>{item.name}</MText>
              </Pressable>
            )
          }}
          modalHeight={400}
        >
        </Modalize>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  txtInput: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'lightgrey'
  }
})

export default MTextInputSelectFilter