import styles from "./Footer.module.css";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.yrgo}>
        <div className={styles.title}>YRGO</div>
        <Link className={styles.text} to="">
          Contact
        </Link>
        <Link className={styles.text} to="">
          GDPR
        </Link>
        <Link className={styles.text} to="">
          About Yrgo
        </Link>
      </div>
      <div className={styles.socials}>
        <div className={styles.title}>Social Media</div>
        <div className={styles.profiles}>
          <div className={styles["social-card"]}>
            <div className={styles.text}>Digital Designer</div>
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
            <div className={styles.text}>Web Developer</div>
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
