import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import "./mapboxOverride.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(11.936338877853077);
  const [lat, setLat] = useState(57.70590087708176);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/oatmeal02/clu2g5ydm01ql01nrfpbihe3r",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.AttributionControl(), "top-left");
  }, []);

  return (
    <div className={styles.container}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
