import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import TaskCreateScreen from "./screens/TaskCreateScreen";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TaskProvider } from "./components/TaskContext";
import Ionicon from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "purple",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Task Manager",
              tabBarIcon: () => (
                <Ionicon name="home" color="purple" size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{
              title: "Task Detail",
              tabBarIcon: () => (
                <Ionicon name="settings-outline" color="purple" size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="TaskCreate"
            component={TaskCreateScreen}
            options={{
              title: "Create Task",
              tabBarIcon: () => (
                <Ionicon name="add-circle-outline" color="purple" size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
