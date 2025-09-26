import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import LocationWatcher from './use_mapa';
import { twMerge } from 'tailwind-merge';

export default function App() {
  const router = useRouter();

  const {
    location,
    setStart,
    start,
    ultimoTempoRef,
    tempoDeCorrida
  } = LocationWatcher();

  const opaco = twMerge(
    "bg-[#FFA700]",
    start ? "opacity-50" : " "
  )

  return (
    <View
      className='flex-1 justify-center p-4 pt-7 bg-slate-100'>
      <View className='mb-0 overflow-hidden rounded-lg shadow-sm h-[650px]'>
        <MapView
          showsUserLocation={true}
          initialRegion={{
            latitude: location[location.length - 1]?.latitude || -20.209094,
            longitude: location[location.length - 1]?.longitude || -50.9295278,
            latitudeDelta: 0.002,
            longitudeDelta: 0.01,
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
      </View>

      <View className='flex gap-4 flex-row p-5 justify-center'>
        <Button
          disabled={start}
          className={opaco}
          onPress={() => {
            router.push('/')
          }}
        >
          <ButtonText>Sair</ButtonText>
        </Button>

        <Button
          className='bg-[#FFA700]'
          onPress={() => { setStart(!start) }
          }
        >
          <ButtonText>
            {start ? "Parar" : "Iniciar"}
          </ButtonText>
        </Button>

      </View>

          //A intenção é usar o ultimoTempoRef, mas ele renderiza como "[object Object]"
        <Button>
          <Text className='color-white'>Tempo de Corrida: {`${ultimoTempoRef}`}</Text>
        </Button>

    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
