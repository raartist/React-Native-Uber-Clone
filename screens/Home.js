import { MAPS_KEY } from "@env";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "../components/NavFavourites";
import NavOptions from "../components/NavOptions";
import { setDestination, setOrigin } from "../slices/navSlice";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          nearbyPlacesAPI="Where from?"
          placeholder="Search"
          returnKeyType="search"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({ location: details.geometry.location, description: data.description })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          query={{
            key: MAPS_KEY,
            language: "en",
          }}
          debounce={400}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    color: "pink",
  },
});
