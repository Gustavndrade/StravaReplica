import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function LocationWatcher({
  mapRef
}: {
  mapRef: React.RefObject<MapView | null>
}) {
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ latitude: number; longitude: number }[]>([]);

  const timerRef = useRef<number | null>(null);
  const [start, setStart] = useState<boolean>(false);
  const startRef = useRef(start);
  const [tempoDeCorrida, setTempoDeCorrida] = useState<number>(0);
  const ultimoTempoRef = useRef<number>(0);

  const headingHistory = useRef<number[]>([]);

  const lastPosition = location.length > 0 ? location[location.length - 1] : {
    latitude: -20.209094,
    longitude: -50.9295278,
  };

const smoothHeading = (newHeading: number) => {
  const maxHistory = 10;
  headingHistory.current.push(newHeading);

  if (headingHistory.current.length > maxHistory) {
    headingHistory.current.shift();
  }

  const sinSum = headingHistory.current.reduce((acc, val) => acc + Math.sin(val * Math.PI / 180), 0);
  const cosSum = headingHistory.current.reduce((acc, val) => acc + Math.cos(val * Math.PI / 180), 0);

  const avgAngle = Math.atan2(sinSum / headingHistory.current.length, cosSum / headingHistory.current.length) * 180 / Math.PI;

  return (avgAngle + 360) % 360;
};


  useEffect(() => {
    let lastHeading = 0;
    let subscription: Location.LocationSubscription;

    const startHeading = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission denied for heading");
        return;
      }

      subscription = await Location.watchHeadingAsync((headingData) => {
        const newHeading = headingData.trueHeading; 

        if (Math.abs(newHeading - lastHeading) >= 5 ) {
          lastHeading = newHeading;
          const smoothed = smoothHeading(newHeading);
         setHeading(smoothed);
        }
      });
    };

    startHeading();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (mapRef.current && heading != null && !isNaN(heading)) {
  //     mapRef.current.animateCamera(
  //       {
  //         heading,
  //         pitch: 90,
  //         zoom: 25,
  //         center: lastPosition,
  //       },
  //       { duration: 500 }
  //     );
  //   }
  // }, [heading]);

  // Timer
  useEffect(() => {
    setTempoDeCorrida(0);

    if (start) {
      timerRef.current = setInterval(() => {
        setTempoDeCorrida((prev) => {
          ultimoTempoRef.current = prev + 1;
          return prev + 1;
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

  // Ref para start
  useEffect(() => {
    startRef.current = start;
  }, [start]);

  // Monitoramento de posição
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
          accuracy: Location.Accuracy.Highest,
          timeInterval: 100,
          distanceInterval: 1.5,
        },
        (loc) => {
          if (!startRef.current) {
            console.log("start é falso, não salvando localização");
            return;
          }

          console.log(loc.coords);
          setLocation((antLocal) => [
            ...antLocal,
            {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            },
          ]);
        }
      );
    };

    comecarLocal();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Log da quantidade de localizações
  useEffect(() => {
    console.log("LATS:", location.length);
  }, [location]);

  return {
    location,
    setStart,
    start,
    tempoDeCorrida,
    ultimoTempoRef,
    heading,
    lastPosition
  };
}
