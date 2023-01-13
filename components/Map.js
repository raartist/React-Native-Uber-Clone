import { MAPS_KEY } from "@env";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, botton: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin && !destination) return;

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=kilometers&origins=${origin.description}&destinations=${destination.description}&key=${MAPS_KEY}`;

      fetch(url)
        .then((res) => res.json())
        .then((result) => dispatch(setTravelTimeInformation(result.rows[0].elements[0])))
        .catch("ERROR >>>> ");
    };
    getTravelTime();
  }, [origin, destination, MAPS_KEY]);

  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: origin?.location.lat || 37.78825,
        longitude: origin?.location.lng || -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      mapType="mutedStandard"
      style={tw`h-full`}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={MAPS_KEY}
          strokeColor="black"
          strokeWidth={3}
        />
      )}
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
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title="destination"
          identifier="destination"
          description={destination?.description}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
