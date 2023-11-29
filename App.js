import { StyleSheet, Text, View, TextInput, Button,FlatList, Modal } from 'react-native'
import {useState} from 'react'

export default function App() {
  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState([])
  const [itemSelectedToDelete, setItemSelectedToDelete] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const onChangeTextHandler = (text) => {
    setTextItem(text)
  }

  const addItemToList = () => {
    setItemList(prevState => [...prevState,{id: Math.random().toString(),value:textItem}])
    //console.log(itemList)
    setTextItem('')
  }

  const onSelectItemHandler = (id) => {
    setModalVisible(!modalVisible)
    setItemSelectedToDelete(itemList.find((item)=>item.id===id))
  }

  const onDeleteItemHandler = () => {
    setItemList(itemList.filter((item)=>item.id!==itemSelectedToDelete.id))
    setModalVisible(!modalVisible)
  }

  const renderListItem = ({item})=>(
      <View style={styles.itemList}>
        <Text>{item.value}</Text>
        <Button title="x" onPress={()=>onSelectItemHandler(item.id)} />
      </View>
    )
  

  return (
    <>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Ingresar tarea" 
          onChangeText={onChangeTextHandler}
          value={textItem}
        />
        <Button 
          title="Add" 
          color="#841584"
          onPress={addItemToList} 
        />
      </View>
      {/* <View>
        {itemList.map(item=><View key={item.id}><Text>{item.value}</Text></View>)}
      </View> */}
      <FlatList 
        data={itemList}
        renderItem={renderListItem}
        keyExtractor={item=>item.id}
      />
    </View>
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.modalMessageContainer}>
        <Text>Se eliminará: </Text>
        <Text>{itemSelectedToDelete.value}</Text>
      </View>
      <View style={styles.modalButtonContainer}>
        <Button title="Cancelar" color="#ccc" onPress={()=>setModalVisible(!modalVisible)} />
        <Button title="Si, eliminar" color="#ef233c" onPress={()=>onDeleteItemHandler()}/>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:30
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textInput: {
    width: 200,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, 
    margin: 10,
    backgroundColor: "#a2d2ff",
    borderRadius: 10,
  },
  modalMessageContainer: {
    marginTop: 50,
    alignItems: "center"
  },
  modalButtonContainer:{
    flexDirection:"row",
    justifyContent: "space-evenly",
    paddingTop: 20
  }
});
