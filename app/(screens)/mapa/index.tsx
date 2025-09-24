import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import LocationWatcher from './use_mapa';

export default function App() {
  const router = useRouter();
  const { location, setStart, start } = LocationWatcher();

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: location[location.length -1]?.latitude || -20.209094,
          longitude: location[location.length -1]?.longitude || -50.9295278,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}

        style={styles.map}>
<Polyline
    coordinates={location}
    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
    strokeColors={[
      '#FF6B00'
    ]}
    strokeWidth={6}
  />
        </MapView>
      <Button
        onPress={() => router.push('/')}
      >
        <ButtonText>Sair</ButtonText>
      </Button>
        <Button
        onPress={()=> {setStart(!start)}
        }
        >
          <ButtonText>
            {start ? "Parar" : "Iniciar"}
          </ButtonText>
        </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    width: '90%',
    height: '90%',
  },
});
