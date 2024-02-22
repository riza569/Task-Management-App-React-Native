import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formattedDate = () => {
    const day = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const year = currentTime.getFullYear();

    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formattedTime()}</Text>
      <Text style={styles.dateText}>{formattedDate()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 10,
    color: "#E966A0",
  },
  dateText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontStyle: "italic",
    color: "#E966A0",
  },
});

export default Timer;
