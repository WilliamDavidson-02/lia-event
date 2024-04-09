import { Search as SearchIcon } from "lucide-react";
import styles from "./Search.module.css";

export default function Search({ style, variant = "default", ...props }) {
  return (
    <div style={style} className={`${styles.container} ${styles[variant]}`}>
      <SearchIcon size={18} />
      <input
        {...props}
        className={styles.input}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
