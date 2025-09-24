import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

export default function LocationWatcher() {
  const [setLocation] = useState<{ latitude: number; longitude: number }[]>([]);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada para acessar localização");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 0,
        },
        (loc) => {
          setLocation((prevLocation) => {
            const proxLocation =[...prevLocation];
            prevLocation.push(latitude: loc.coords.latitude, longitude: loc.coords.longitude);
          });
        }
      );
    };

    startWatching();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

return{
    console.log(`Latitude: ${loc.latitude}, Longitude: ${loc.longitude}`);
    
}
}
