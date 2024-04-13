import { ArrowUpRight } from "lucide-react";
import styles from "./NotFound.module.css";
import buttonStyles from "../../components/Button/Button.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div>
        <p className={styles.number}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.paragraph}>
          You seam to be lost, please return back home
        </p>
        <Link
          to={"/"}
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
        >
          Home
          <ArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
