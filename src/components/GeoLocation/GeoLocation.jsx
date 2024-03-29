import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import styles from "./GeoLocation.module.css";
import Map from "../Map/Map";
import { defaultCords } from "../Map/Map";
import "./geocoderOverride.css";
import MapMarker from "../MapMarker/MapMarker";
import markerStyles from "../MapMarker/MapMarker.module.css";

export default function GeoLocation({ handleProperty }) {
  const geocoder = useRef(null);
  const marker = useRef(null);
  const [cords, setCords] = useState(defaultCords);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (geocoder.current) return;

    // Search geocoder
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      language: "se-SV",
    });

    geocoder.current.addTo("#geocoder-container");
  }, []);

  useEffect(() => {
    if (!map) return;

    geocoder.current.on("result", handleGeoCoderResult);
    map.on("click", ({ lngLat }) => handleMarker(lngLat));

    // Create Marker
    const markerElement = document.createElement("div");
    markerElement.innerHTML = ReactDOMServer.renderToString(
      <MapMarker size={24} />
    );

    marker.current = new mapboxgl.Marker({
      draggable: true,
      element: markerElement,
    })
      .setLngLat(defaultCords)
      .addTo(map);

    marker.current.addClassName(markerStyles.hidden);

    marker.current.on("dragend", () => {
      const cords = marker.current.getLngLat();

      setCords(cords);
      handleProperty(cords);
    });

    return () => {
      marker.current.remove();
    };
  }, [map]);

  const getMap = (map) => setMap(map);

  const handleGeoCoderResult = ({ result }) => {
    const cords = mapboxgl.LngLat.convert(result.center);

    if (map) {
      map.flyTo({
        center: [cords.lng, cords.lat],
      });
    }

    setCords(cords);
    handleProperty(cords);
    handleMarker(cords);
  };

  const handleMarker = (lngLat) => {
    marker.current.setLngLat(lngLat);
    marker.current.removeClassName(markerStyles.hidden);

    handleProperty([lngLat.lng, lngLat.lat]);
  };

  return (
    <div className={styles.container}>
      <div id="geocoder-container"></div>
      <Map position={cords} getMap={getMap} />
    </div>
  );
}
