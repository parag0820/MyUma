// MapScreen.js
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  // Sample list of multiple coordinates
  const locations = [
    {id: 1, latitude: 23.1785, longitude: 75.7917, title: 'Location A'},
    {id: 2, latitude: 23.1805, longitude: 75.795, title: 'Location B'},
    {id: 3, latitude: 23.182, longitude: 75.789, title: 'Location C'},
  ];

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.1785,
          longitude: 75.7917,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
          />
        ))}
      </MapView> */}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
