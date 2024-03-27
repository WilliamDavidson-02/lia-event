import { useEffect, useRef, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import "./mapboxOverride.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const defaultCords = { lat: 57.70590087708176, lng: 11.936338877853077 };

export default function Map({ position = defaultCords, getMap, ...props }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(position.lng);
  const [lat, setLat] = useState(position.lat);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/oatmeal02/clu2g5ydm01ql01nrfpbihe3r",
      center: [lng, lat],
      zoom: 11,
      attributionControl: false,
    });

    // GeoLocation needs acces to map.current
    if (getMap) getMap(map.current);

    map.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "top-left"
    );

    //   Navigation
    map.current.addControl(new mapboxgl.NavigationControl());

    // Mapbox event handlers
    map.current.on("moveend", () => {
      const { lng, lat } = map.current.getCenter();

      setLng(lng);
      setLat(lat);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div {...props} className={styles.container} ref={mapContainer} />;
}
