import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Button
      onPress={() => router.push('/')}
      >
        <ButtonText>Sair</ButtonText>
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
