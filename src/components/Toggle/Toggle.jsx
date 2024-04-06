import styles from "./Toggle.module.css";

export default function Toggle({ checked }) {
  const handleToggle = (ev) => {
    ev.target.classList.add(styles.toggled);
  };
  return (
    <div className={styles.container}>
      <input
        checked={checked}
        onChange={handleToggle}
        className={styles.checkbox}
        type="checkbox"
      />
      <div className={styles.track}>
        <div className={styles.thumb} />
      </div>
    </div>
  );
}
