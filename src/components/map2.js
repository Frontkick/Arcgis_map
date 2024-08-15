import MapView from "@arcgis/core/views/MapView"
import Map from "@arcgis/core/Map"
import { useEffect, useRef } from "react"

const Map2 = () => {
    const mapRef = useRef(null)
    useEffect(() =>{
        if(!mapRef?.current) return;
        const map = new Map({
            basemap:"osm",
        });
        const view = new MapView({
            map:map,
            container: mapRef.current,
        });
    },[]);
  return (
    <div className="viewDiv" ref={mapRef}></div>
  )
}

export default Map2