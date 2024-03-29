import { Link } from "react-router-dom";
import styles from "./X.module.css";

export default function X({ ...props }) {
  return (
    <Link {...props} className={styles.x}>
      <div>(X)</div>
    </Link>
  );
}
