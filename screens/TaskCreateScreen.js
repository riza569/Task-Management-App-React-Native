import React, { useState, useContext } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TaskContext } from "../components/TaskContext";

const taskimg = require("../assets/task.png");

const TaskCreateScreen = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddTask = () => {
    const newTask = {
      id: Math.random().toString(),
      title: title,
      description: description,
      status: isCompleted,
    };

    addTask(newTask);

    setDescription("");
    setTitle("");

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior="padding"
        style={styles.createcontainer}
      >
        <Text style={styles.inputText}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter Title"
        />
        <Text style={styles.inputText}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Task Status:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#E966A0" }}
            thumbColor={isCompleted ? "#E966A0" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsCompleted(!isCompleted)}
            value={isCompleted}
          />
        </View>
        <TouchableOpacity
          style={styles.buttoncontainer}
          onPress={handleAddTask}
        >
          <Text style={styles.button}>Create New Task</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={taskimg} resizeMode="contain" />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#F1EAFF",
    justifyContent: "center",
  },
  createcontainer: {
    flex: 1,
    backgroundColor: "#E5D4FF",
    padding: 20,
    borderRadius: 25,
    shadowColor: "#FFC7C7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#E966A0",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleText: {
    marginRight: 10,
    fontSize: 16,
  },
  buttoncontainer: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#E966A0",
    marginBottom: 20,
  },
  button: {
    color: "#F1EAFF",
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    marginBottom:
      useWindowDimensions.height && useWindowDimensions.width > 500
        ? "10%"
        : "10%",
  },
});

export default TaskCreateScreen;
