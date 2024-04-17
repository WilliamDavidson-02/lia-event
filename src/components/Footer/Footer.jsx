import styles from "./Footer.module.css";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.yrgo}>
        <div className={styles.title}>YRGO</div>
        <Link className={styles.text} to="https://www.yrgo.se/kontakt/">
          Contact
        </Link>
        <Link
          className={styles.text}
          to="https://gdpr.eu/wp-content/uploads/2019/01/Our-Company-Privacy-Policy.pdf"
        >
          GDPR
        </Link>
        <Link className={styles.text} to="https://www.yrgo.se/om-yrgo/">
          About Yrgo
        </Link>
      </div>
      <div className={styles.socials}>
        <div className={styles.title}>Social Media</div>
        <div className={styles.profiles}>
          <div className={styles["social-card"]}>
            <div className={styles.text}>Digital Designer</div>
            <Link to="https://www.instagram.com/yrgo_digital_designer/">
              <Image
                src="/yrgo_logo.svg"
                style={{
                  width: "5rem",
                  aspectRatio: 1 / 1,
                  borderRadius: "100vmax",
                }}
              />
            </Link>
          </div>
          <div className={styles["social-card"]}>
            <div className={styles.text}>Web Developer</div>
            <Link to="https://www.yrgo.se/program/webbutvecklare/">
              <Image
                src="/yrgo_logo.svg"
                style={{
                  width: "5rem",
                  aspectRatio: 1 / 1,
                  borderRadius: "100vmax",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
