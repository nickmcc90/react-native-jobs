import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";

import useFetch from '../../../hooks/useFetch'


const Nearbyjobs = () => {

  // const { refetch } = useFetch()

  return (
    <View style={styles.container}>
      <Text>Nearbyjobs</Text>
    </View>
  );
};

export default Nearbyjobs;
