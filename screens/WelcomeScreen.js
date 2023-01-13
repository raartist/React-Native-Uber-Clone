import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectError, selectUserName, setError, setUserName } from "../slices/navSlice";

const WelcomeScreen = () => {
  const error = useSelector(selectError);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={tw`flex items-center justify-between `}>
      <View style={tw`mt-40`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />
      </View>
      <View style={tw`flex items-center justify-between mt-20`}>
        <Text style={tw`self-start pb-0 pl-5 text-lg`}>What's your name?</Text>
        <View style={tw`flex flex-row items-center p-5 pb-2 pt-2`}>
          <TextInput
            style={tw`w-80 bg-gray-200`}
            value={userName}
            onChangeText={(t) => {
              dispatch(setError(false));
              dispatch(setUserName(t));
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (!userName.trim()) {
                return dispatch(setError(true));
              }
              navigation.navigate("Home");
            }}
            style={tw`flex flex-1 bg-gray-300 `}
          >
            <Icon name="arrow-forward-outline" type="ionicon" color="black" size={24} />
          </TouchableOpacity>
        </View>
        {error && <Text style={tw`text-red-500 self-start pl-5`}>Name is required *</Text>}
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
