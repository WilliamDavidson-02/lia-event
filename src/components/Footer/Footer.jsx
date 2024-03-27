import styles from "./Footer.module.css";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.yrgo}>
        <div className={styles.title}>YRGO</div>
        <Link to="">Contact</Link>
        <Link to="">GDPR</Link>
        <Link to="">About Yrgo</Link>
      </div>
      <div className={styles.socials}>
        <div className={styles.title}>Social Media</div>
        <div className={styles.profiles}>
          <div className={styles["social-card"]}>
            <div>Digital Designer</div>
            <Image
              src="/IMG_9049.JPG"
              style={{
                width: "5rem",
                aspectRatio: 1 / 1,
                borderRadius: "100vmax",
              }}
            />
          </div>
          <div className={styles["social-card"]}>
            <div>Web Developer</div>
            <Image
              src="/IMG_9049.JPG"
              style={{
                width: "5rem",
                aspectRatio: 1 / 1,
                borderRadius: "100vmax",
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
