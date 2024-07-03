import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageUrl } from "../../../utils";


const Company = ({ companyLogo, jobTitle, companyName, Location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={{
          uri: checkImageUrl(companyLogo) ? companyLogo : "https://i.etsystatic.com/31545397/r/il/e4df84/4255233182/il_1140xN.4255233182_dxyv.jpg"
        }}
        style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{Location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
