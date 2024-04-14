import styles from "./Chips.module.css";
import { CircleX } from "lucide-react";

export default function Chips({
  defaultValue,
  selected = [],
  select,
  variant = "default",
  ...props
}) {
  const handleSelect = (word) => {
    // If no select is passed, chips are view only
    if (!select) return;

    select(word);
  };

  return (
    <div {...props} className={styles.container}>
      {defaultValue.map((word) => (
        <span
          key={word}
          onClick={() => handleSelect(word)}
          className={`${styles.chip} ${styles[variant]} ${
            selected.includes(word) ? styles.selected : ""
          }`}
          style={{ cursor: select ? "pointer" : "default" }}
        >
          <p>{word}</p>
          {selected.includes(word) && <CircleX size={20} />}
        </span>
      ))}
    </div>
  );
}
