import styles from "./Toggle.module.css";

export default function Toggle({ checked, ...props }) {
  const handleToggle = (ev) => {
    ev.target.classList.add(styles.toggled);
  };
  return (
    <div {...props} className={styles.container}>
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
