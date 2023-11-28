import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import {useState} from 'react'

export default function App() {
  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState([])

  const onChangeTextHandler = (text) => {
    setTextItem(text)
  }

  const addItemToList = () => {
    setItemList(prevState => [...prevState,{id: Math.random().toString(),value:textItem}])
    console.log(itemList)
    setTextItem('')
  }

  return (
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
      <View></View>
    </View>
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
  }
});
