import GDPR from "../../components/GDPR/GDPR";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* <h1>LIA-Event</h1> */}
      <GDPR />
    </main>
  );
}
