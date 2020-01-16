import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback,Keyboard } from "react-native";
import Header from "./components/header";
import ToDoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";

export default function App() {
  const [todos, setTodos] = useState([
    {
      text: "buy coffee",
      key: "1"
    },
    {
      text: "create an app",
      key: "2"
    },
    {
      text: "play on the PC",
      key: "3"
    }
  ]);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = text => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("Oops!", "ToDos must be over 3 Chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={
      ()=>{
        Keyboard.dismiss();
      }
    }>
    <View style={styles.container}>
      <Header />
      {/* header */}
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <ToDoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
     </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 40,
    flex:1
  },
  list: {
    marginTop: 20,
       flex:1
  }
});
