import styles from "./Chip.module.css";

export default function Chip({
  children,
  className = "",
  selected = false,
  ...props
}) {
  return (
    <span
      {...props}
      className={`${styles.container} ${styles.visible} ${
        selected ? styles.selected : ""
      }`}
    >
      {children}
    </span>
  );
}
