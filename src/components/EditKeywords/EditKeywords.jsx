import { useEffect, useState } from "react";
import styles from "./EditKeywords.module.css";
import Chips from "../Chips/Chips";
import keywords from "../../lib/keywords.json";
import Search from "../Search/Search";
import { areaValue } from "../../lib/areaData";
import { CircleX } from "lucide-react";

export default function EditKeywords({ handleProperty, selected = [], area }) {
  const [suggestins, setSuggestions] = useState([]);
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const keywords = getKeywords(area);

    setSuggestions(keywords);
    setWords(keywords);
  }, []);

  const getKeywords = (area) => {
    const keywordProps = areaValue[area];

    let keywordsArray = [];

    // Add selected areas of work keywords
    keywordProps.forEach((item) => {
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

  const clearSelected = () => {
    handleProperty([]);
    setSuggestions(words);
  };

  const handleSearch = (search) => {
    setSearch(search);

    const unSelectedWords = words.filter((w) => !selected.includes(w));
    const result = unSelectedWords.filter((w) =>
      w.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(result);
  };

  return (
    <section className={styles.container}>
      <Search value={search} onChange={(ev) => handleSearch(ev.target.value)} />
      <div className={styles.content}>
        <p className={styles.title}>
          Selected:
          {selected.length > 0 && (
            <CircleX
              title={"Clear all"}
              onClick={clearSelected}
              style={{ cursor: "pointer" }}
              size={20}
            />
          )}
        </p>
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
