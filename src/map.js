// src/MapComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [finaldistance,setFinalDistance]= useState(0);

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};
let points=[]

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const [Map, MapView, geometryEngine, Graphic] = await loadModules([
          'esri/Map',
          'esri/views/MapView',
          'esri/geometry/geometryEngine',
          'esri/Graphic',
        ]);

        const map = new Map({
          basemap: 'streets-navigation-vector',
        });

        const mapView = new MapView({
          container: mapRef.current,
          map: map,
          center: [-100.33, 43.69],
          zoom: 4,
        });

        setView(mapView);

        mapView.on('click', (event) => {
          const point = {
            type: 'point',
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude,
          };
          
          points.push(point)
          console.log(points)
          if(points.length===2)
          {
            console.log("2 points")
            const ans = calculateDistance(points[0].latitude,points[0].longitude,points[1].latitude,points[1].longitude)
            console.log(ans,"Kilometers")
            setFinalDistance(ans)
          }

          const graphic = new Graphic({
            geometry: point,
            symbol: {
              type: 'simple-marker',
              color: 'red',
              size: '8px',
            },
          });

          mapView.graphics.add(graphic);
        });
      } catch (error) {
        console.error('Map initialization failed: ', error);
      }
    };


    if (!view) {
      initializeMap();
    }
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [view]);

  return (
    <div>
      <div ref={mapRef} style={{ height: 500, width: '100%' }}></div>
      {finaldistance !== 0 && (
        <div>
          <h1 className='ml-96 pl-96'>Distance: {finaldistance} Kilometers</h1>
        </div>
        
      )}
    </div>
  );
};

export default MapComponent;
