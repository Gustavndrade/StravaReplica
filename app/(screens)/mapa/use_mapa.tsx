import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";


export default function LocationWatcher() {
  const [location, setLocation] = useState<
  { latitude: number; longitude: number }[]
  >([]);

  //const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const [start, setStart] = useState<boolean>(false);
  const startRef = useRef(start);

  const [tempoDeCorrida, setTempoDeCorrida] = useState<number>(0);
  const ultimoTempoRef = useRef<number>(0);


  useEffect(() => {
    setTempoDeCorrida(0);

    if (start) {
      timerRef.current = setInterval(() => {
        setTempoDeCorrida((prev) => {
          ultimoTempoRef.current = prev + 1;
          return prev + 1
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

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


  useEffect(() => {
    console.log("ultimoTempo", ultimoTempoRef);
  });

  return {
    location,
    setStart,
    start,
    tempoDeCorrida,
    ultimoTempoRef
  };
}
