import { useEffect, useState } from "react";
import styles from "./EditKeywords.module.css";
import Chips from "../Chips/Chips";
import keywords from "../../lib/keywords.json";
import Search from "../Search/Search";

export default function EditKeywords({ handleProperty, selected = [], area }) {
  const [suggestins, setSuggestions] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const keywords = getKeywords(area);

    setSuggestions(keywords);
    setWords(keywords);
  }, []);

  const getKeywords = (area) => {
    // Student can only select one area/program, Check if area is a string and wrapp it in an array
    if (typeof area === "string") area = [area];

    let keywordsArray = [];

    // Add selected areas of work keywords
    area.forEach((item) => {
      if (keywords[item]) {
        keywordsArray = [...keywordsArray, ...keywords[item]];
      }
    });

    return keywordsArray;
  };

  const handleSelect = (word) => {
    let chips = selected;

    if (chips.includes(word)) {
      setSuggestions((prev) => [...prev, word]);
      chips = chips.filter((chip) => chip !== word);
    } else {
      chips.push(word);
      setSuggestions((prev) => prev.filter((w) => w !== word));
    }

    handleProperty(chips);
  };

  const handleSearch = (search) => {
    const unSelectedWords = words.filter((w) => !selected.includes(w));
    const result = unSelectedWords.filter((w) =>
      w.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(result);
  };

  return (
    <section className={styles.container}>
      <Search handleSearch={handleSearch} />
      <div className={styles.content}>
        <p className={styles.title}>Selected:</p>
        <Chips
          defaultValue={selected}
          selected={selected}
          select={handleSelect}
        />
        <p className={styles.title}>Suggestions:</p>
        <Chips defaultValue={suggestins} select={handleSelect} />
      </div>
    </section>
  );
}
