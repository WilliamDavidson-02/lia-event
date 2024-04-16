import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import styles from "./ProfileAbout.module.css";
import Map from "../Map/Map";
import Chips from "../Chips/Chips";
import { areaTitle, areaValue } from "../../lib/areaData";
import MapMarker from "../MapMarker/MapMarker";

export default function ProfileAbout({ profile }) {
  const { profileType } = useParams();
  const [map, setMap] = useState(null);

  const size = useWindowSize();

  useEffect(() => {
    if (!map || !profile.location.length) return;

    // Create Marker
    const markerElement = document.createElement("div");
    markerElement.innerHTML = ReactDOMServer.renderToString(<MapMarker size={24} />);

    new mapboxgl.Marker({
      draggable: false,
      element: markerElement,
    })
      .setLngLat(profile.location)
      .addTo(map);

    map.setCenter(profile.location);
    map.setZoom(14);
  }, [map]);

  const formatArea = (area) => {
    const values = areaValue[area];
    let titles = [];

    for (const a of values) {
      titles.push(areaTitle[a]);
    }

    return titles.join(" & ");
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.title}>{profileType === "company" ? "Looking for" : "Education"}</div>
          <p>{formatArea(profile.area)}</p>
          {size.width < 760 && <div className={styles.seperator} />}
        </div>
        <div className={styles.content}>
          <div className={styles.expertice}>
            {profileType === "company" ? "Expertise wanted" : "Expertice"}
          </div>
          <Chips variant="transparent" defaultValue={profile.keywords} />
          {profileType === "company" && size.width < 760 && <div className={styles.seperator} />}
        </div>
      </div>
      {profileType === "company" && (
        <div className={styles.card}>
          <div className={styles.title}>Location</div>
          <Map getMap={(map) => setMap(map)} />
        </div>
      )}
    </section>
  );
}
