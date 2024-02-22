import React, { useContext, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TaskContext } from "../components/TaskContext";
import { Image } from "react-native";
import pana from "../assets/pana.png";
const TaskDetailScreen = ({ route, navigation }) => {
  const { taskList, deleteTask, updateTask } = useContext(TaskContext);
  const taskId = route.params?.taskId;
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const task = taskList.find((item) => item.id === taskId);
    setEditedTask(task);
  }, [taskList, taskId]);

  const handleEditTask = () => {
    if (!editedTask) {
      return;
    }
    updateTask(editedTask);
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    if (!editedTask) {
      return;
    }
    deleteTask(editedTask.id);
    navigation.goBack();
  };

  if (!editedTask) {
    return (
      <ScrollView contentContainerStyle={styles.notaskcontainer}>
        <Text style={styles.notasktext}>No task selected</Text>
        <Image source={pana} style={styles.notextimage} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={styles.taskDetailContainer}
      >
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={editedTask.title}
          onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={editedTask.description}
          onChangeText={(text) =>
            setEditedTask({ ...editedTask, description: text })
          }
          multiline
        />
        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Status</Text>
          <TouchableOpacity
            style={[
              styles.statusButton,
              editedTask.status && styles.completedStatus,
            ]}
            onPress={() =>
              setEditedTask({ ...editedTask, status: !editedTask.status })
            }
          >
            <Text style={styles.statusButtonText}>
              {editedTask.status ? "Completed" : "Pending"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleEditTask}>
            <Text style={styles.buttontext}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDeleteTask}
            color="#FF0000"
          >
            <Text style={styles.buttontext}>Delete </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: StatusBar.currentHeight,
    backgroundColor: "#F1EAFF",
  },
  taskDetailContainer: {
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
  label: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  toggleContainer: {
    marginBottom: 15,
  },

  statusButton: {
    backgroundColor: "#E966A0",
    padding: 10,
    borderRadius: 8,
  },
  completedStatus: {
    backgroundColor: "#711DB0",
  },

  statusButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginBottom:
      useWindowDimensions.height && useWindowDimensions.width > 500
        ? "10%"
        : "10%",
  },

  deleteBtn: {
    backgroundColor: "#E966A0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  buttontext: {
    color: "white",
  },
  notaskcontainer: {
    flexGrow: 1,
    backgroundColor: "#E5D4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  notasktext: {
    fontSize: 36,
  },
  notextimage: {
    width: 250,
    height: 250,
  },
});

export default TaskDetailScreen;
