import { MAPS_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectUserName, setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Pressable onPress={() => navigation.navigate("RideOptionsCard")}>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, {userName}!</Text>
      </Pressable>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="Where from?"
          placeholder="Where to?"
          returnKeyType="search"
          styles={toInputBoxStyles}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({ location: details.geometry.location, description: data.description })
            );

            navigation.navigate("RideOptionsCard");
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          query={{
            key: MAPS_KEY,
            language: "en",
          }}
          debounce={400}
        />
        <NavFavourites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EatScreen")}
          style={tw`flex justify-between flex-row bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="fast-food-outline" type="ionicon" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#dddddf",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
