import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";

const Popularjobs = () => {

  return (
    <View style={styles.container}>
      <Text>Popularjobs</Text>
    </View>
  );
};

export default Popularjobs;
