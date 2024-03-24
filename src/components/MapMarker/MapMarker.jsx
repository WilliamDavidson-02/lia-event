import { MapPin } from "lucide-react";
import styles from "./MapMarker.module.css";

export default function MapMarker({ ...props }) {
  return <MapPin {...props} className={styles.pin} />;
}
