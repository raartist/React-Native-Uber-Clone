import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

const NavigateCard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.navigate("RideOptionsCard")}>
        <Text>NavigateCard</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
