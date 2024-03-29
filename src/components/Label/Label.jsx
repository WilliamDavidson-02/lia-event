import styles from "./Label.module.css";

export default function Label({ children, ...props }) {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
}
