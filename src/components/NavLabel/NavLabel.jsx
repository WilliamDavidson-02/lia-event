import styles from "./NavLabel.module.css";

export default function NavLabel({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.light}>{children}</div>
      <div className={styles.dark}>{children}</div>
    </div>
  );
}
