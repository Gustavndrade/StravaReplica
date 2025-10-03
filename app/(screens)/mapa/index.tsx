import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import LocationWatcher from './use_mapa';
import { twMerge } from 'tailwind-merge';
import { Pause, Play } from 'lucide-react-native';
import { useRef, useState } from 'react';

const play = () => {
  return (
    <Play />
  );
}

const pause = () => {
  return (
    <Pause />
  );
};

export default function App() {
  const router = useRouter();

  const mapRef = useRef<MapView>(null)


  const {
    location,
    setStart,
    start,
    tempoDeCorrida,
    heading,
    lastPosition
  } = LocationWatcher({
    mapRef
  });

  const botaoSair = twMerge(
    "flex flex-col bg-[#FFA700] rounded-[50%] w-20 h-20",
    start ? "opacity-50" : " "
  )


  return (
    <View
      className='flex-1 relative h-full items-center'>

      <MapView
        ref={mapRef}
        //rotateEnabled={false}
        showsUserLocation={false}
        initialRegion={{
          latitude: location[location.length - 1]?.latitude || -20.209094,
          longitude: location[location.length - 1]?.longitude || -50.9295278,
          latitudeDelta: 0.002,
          longitudeDelta: 0.001,
        }}
        style={styles.map}>
        <Polyline
          coordinates={location}
          strokeColor="#FF6B00"
          strokeColors={[
            '#FF6B00'
          ]}
          strokeWidth={10}
        />
        <Marker.Animated
          coordinate={lastPosition} 
          anchor={{ x: 0.5, y: 0.5 }}
          rotation={heading}
          //flat={true}
          image={require('../../../assets/images/logos-icons/car.png')}
        />
      </MapView>

      <View className='z-1 absolute bottom-[20%] bg-black/60 p-7 rounded-lg items-center justify-center w-[90%] shadow-lg '>
        <Text
          className='color-white font-extrabold text-2xl'
        >{tempoDeCorrida}</Text>
        <Text
          className='color-white'
        >Tempo de Corrida</Text>
      </View>

      <View
        className='z-2 absolute bg-gray-700 bottom-0 flex-row w-full h-[18%] flex items-center rounded-3xl justify-center gap-4'
      >
        <Button
          disabled={start}
          className={botaoSair}
          onPress={() => {
            router.push('/')
          }}

        >
          <ButtonText>Sair</ButtonText>
        </Button>

        <Button
          className='flex flex-col bg-[#FFA700] rounded-[50%] w-20 h-20'
          onPress={() => { setStart(!start) } 
          }
        >
          {start ? <Pause size={18} color="white" /> : <Play size={18} color="white" />}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});