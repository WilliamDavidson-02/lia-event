import styles from "./UserTypeSelect.module.css";

export default function UserTypeSelect({ disabled, types, setType }) {
  const selectType = (type) => {
    if (disabled) return;

    setType(type);
  };

  return (
    <div className={styles.container}>
      {types.map((type, i) => (
        <div
          key={`${type}-${i}`}
          onClick={() => selectType(type)}
          className={`${styles.select} ${disabled ? styles.disabled : ""}`}
        >
          <p>{type}</p>
        </div>
      ))}
    </div>
  );
}
