import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";

const Map = () => {
  const origin = useSelector(selectOrigin);
  return (
    <MapView
      initialRegion={{
        latitude: origin?.location.lat || 37.78825,
        longitude: origin?.location.lng || -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      mapType="mutedStandard"
      style={tw`h-full`}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          title="origin"
          identifier="origin"
          description={origin?.description}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
