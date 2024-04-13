import styles from "./Hamburger.module.css";

export default function Hamburger({ ...props }) {
  return (
    <div {...props} className={styles.container}>
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
}
