import styles from "./Home.module.css";
import Map from "../../components/Map/Map";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>LIA-Event</h1>
      <Map />
    </main>
  );
}
