import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import styles from "./GeoLocation.module.css";
import Map from "../Map/Map";
import { defaultCords } from "../Map/Map";
import "./geocoderOverride.css";

export default function GeoLocation() {
  const geocoder = useRef(null);
  const geolocate = useRef(null);
  const [cords, setCords] = useState(defaultCords);

  useEffect(() => {
    if (geocoder.current) return;

    // Search geocoder
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
    });

    geocoder.current.on("result", ({ result }) =>
      setCords(mapboxgl.LngLat.convert(result.center))
    );

    geocoder.current.addTo("#geocoder-container");
  }, []);

  return (
    <div className={styles.container}>
      <div id="geocoder-container"></div>
      <Map position={cords} />
    </div>
  );
}
