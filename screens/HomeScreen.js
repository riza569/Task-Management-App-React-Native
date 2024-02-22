import React, { useContext, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskContext } from "../components/TaskContext";
import Timer from "../components/Timer";
import Ionicon from "@expo/vector-icons/Ionicons";

const logo = require("../assets/amico.png");

const HomeScreen = ({ navigation }) => {
  const { taskList, toggleTaskCompletion, deleteTask } =
    useContext(TaskContext);

  const movetocreatescreen = () => {
    navigation.navigate("TaskCreate");
  };

  const movetotaskscreen = (taskId) => {
    navigation.navigate("TaskDetail", { taskId });
  };

  const renderHeader = () => (
    <ScrollView>
      <Timer />
      <View style={styles.imagecontainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.taskheadercontainer}>
        <Text style={styles.taskheader}>Task List</Text>
        <Ionicon
          name="add-circle-outline"
          size={36}
          color="#E966A0"
          onPress={movetocreatescreen}
        />
      </View>
    </ScrollView>
  );

  return (
    <FlatList
      style={styles.container}
      data={taskList}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.taskItem,
            item.status ? styles.completedTask : styles.incompleteTask,
          ]}
          onPress={() => toggleTaskCompletion(item.id)}
        >
          <Text style={styles.taskStatus}>
            {item.status ? "Completed" : "Pending"}
          </Text>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => movetotaskscreen(item.id)}
              style={[styles.actionButton, styles.editButton]}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Ionicon name="trash-outline" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5D4FF",
  },
  imagecontainer: {
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  taskheadercontainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  taskheader: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: "#E966A0",
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 9,
    marginBottom: 16,
    alignItems: "center",
  },
  completedTask: {
    backgroundColor: "#711DB0",
  },
  incompleteTask: {
    backgroundColor: "#E966A0",
  },
  taskTitle: {
    alignSelf: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    flex: 1,
  },
  taskStatus: {
    color: "white",
    fontSize: 16,
    alignSelf: "flex-start",
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  editButton: {},
  deleteButton: {},
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  editText: {},
});

export default HomeScreen;
