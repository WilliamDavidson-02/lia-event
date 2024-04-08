import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import styles from "./Search.module.css";

export default function Search({ ...props }) {
  return (
    <div className={styles.container}>
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
