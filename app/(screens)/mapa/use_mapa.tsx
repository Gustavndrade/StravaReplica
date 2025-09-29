import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";


export default function LocationWatcher() {
  const [location, setLocation] = useState<
  { latitude: number; longitude: number }[]
  >([]);

  const [start, setStart] = useState<boolean>(false);
  const startRef = useRef(start);

  const [tempoDeCorrida, setTempoDeCorrida] = useState<number>(0);

  useEffect(() => { 
    let interval: any
    if (start) {
       setTempoDeCorrida(0);
       interval = setInterval(() => {
        setTempoDeCorrida((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval)

  }, [start]);


  useEffect(() => {
    startRef.current = start;
  }, [start]);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const comecarLocal = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (loc) => {
          if (startRef.current) {
            setLocation((antLocal) => [
              ...antLocal,
              {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              },
            ]);
          } else {
            console.log("start é falso, não salvando localização");
          }
        }
      );
    };

    comecarLocal();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('tempoDeCorrida:', tempoDeCorrida);
  }, [tempoDeCorrida]); 
  
  useEffect(()=>{
    console.log('localizacao: ', location)
  },[location]);


  return {
    location,
    setStart,
    start,
    tempoDeCorrida,
    setTempoDeCorrida
  };
}