import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import styles from "./Search.module.css";

export default function Search({ handleSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (ev) => {
    const value = ev.target.value;

    handleSearch(value);

    setSearch(value);
  };

  return (
    <div className={styles.container}>
      <SearchIcon size={18} />
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}
