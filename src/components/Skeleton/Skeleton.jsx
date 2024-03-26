import styles from "./Skeleton.module.css";

export default function Skeleton({ ...props }) {
  return <div className={styles.container} {...props} />;
}
