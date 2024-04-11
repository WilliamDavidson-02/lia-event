import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import "./mapboxOverride.css";
import { defaultCords } from "../../lib/mapData.js";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Map({
  position = defaultCords,
  getMap,
  zoom = 11,
  dragPan = true,
  ...props
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lngLat, setLngLat] = useState([position.lng, position.lat]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/oatmeal02/clu2g5ydm01ql01nrfpbihe3r",
      center: lngLat,
      zoom: zoom,
      attributionControl: false,
      dragPan: dragPan,
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
      setLngLat([lng, lat]);
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
