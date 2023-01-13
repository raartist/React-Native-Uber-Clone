import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex items-center justify-center flex-1`}>
      <View>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />
        <View style={tw`flex flex-row items-center justify-center`}>
          {/* <TextInput style={tw`w-full bg-gray-200`} /> */}
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={tw`flex flex-1`}>
            <Text>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
