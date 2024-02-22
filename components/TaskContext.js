import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) {
          setTaskList(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage:", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(taskList));
      } catch (error) {
        console.error("Error saving tasks to AsyncStorage:", error);
      }
    };

    saveTasks();
  }, [taskList]);

  const addTask = (newTask) => {
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTaskList);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTaskList(updatedTaskList);
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        addTask,
        deleteTask,
        updateTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
