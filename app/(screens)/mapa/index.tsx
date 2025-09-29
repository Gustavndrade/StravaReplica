import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import LocationWatcher from './use_mapa';
import { twMerge } from 'tailwind-merge';
import { Pause, Play } from 'lucide-react-native';

  const play = () => {
    return(
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

  const {
    location,
    setStart,
    start,
    tempoDeCorrida
  } = LocationWatcher();

  const botaoSair = twMerge(
    "bg-[#FFA700] rounded-full w-[30%]",
    start ? "opacity-50" : " "
  )

  return (
    <View
      className='flex-1  relative bg-green-500 h-full items-center'>

      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: location[location.length - 1]?.latitude || -20.209094,
          longitude: location[location.length - 1]?.longitude || -50.9295278,
          latitudeDelta: 0.001,
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
      </MapView>

      <View className='z-1 absolute bottom-[25%] bg-black p-3 pt-7 rounded-md items-center justify-center w-[95%]'>
        <Text
          className='color-white'
        >{tempoDeCorrida}</Text>
        <Text
          className='color-white text-xs'
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
          className='bg-[#FFA700] rounded-full w-[30%]'
          onPress={() => { setStart(!start) }
          }
        >
          {start ? <Pause size={18} color="white" /> : <Play size={18} color="white" />}
          <ButtonText>
            {start ? "Parar" : "Iniciar"}
          </ButtonText>
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
