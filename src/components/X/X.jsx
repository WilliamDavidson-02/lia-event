import { Link } from "react-router-dom";
import styles from "./X.module.css";

export default function X({ className, ...props }) {
  return (
    <Link {...props} className={`${styles.x} ${className}`}>
      <div>(X)</div>
    </Link>
  );
}
