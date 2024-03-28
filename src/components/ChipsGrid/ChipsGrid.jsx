import { useEffect, useRef } from "react";
import Chip from "../Chip/Chip";
import keywords from "../../lib/keywords.json";
import styles from "./ChipsGrid.module.css";
import chipStyles from "../Chip/Chip.module.css";
import { CircleX } from "lucide-react";

export default function ChipsGrid({
  handleProperty,
  isEdit = false,
  selectedChips,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(chipStyles.visible);
          } else {
            entry.target.classList.remove(chipStyles.visible);
          }
        });
      },
      { threshold: 0.5 }
    );

    const chips = document.querySelectorAll("#chip-observer");
    chips.forEach((chip) => observer.observe(chip));

    return () => {
      chips.forEach((chip) => observer.unobserve(chip));
    };
  }, [containerRef]);

  const handleSelect = (word) => {
    if (!isEdit) return;

    let chips = selectedChips;

    if (selectedChips.includes(word)) {
      chips = chips.filter((chip) => chip !== word);
    } else {
      chips.push(word);
    }

    handleProperty(chips);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {keywords.developer.map((word) => (
        <Chip
          onClick={() => handleSelect(word)}
          selected={selectedChips.includes(word)}
          id="chip-observer"
          key={word}
        >
          <p>{word}</p>
          {isEdit && selectedChips.includes(word) && <CircleX size={20} />}
        </Chip>
      ))}
    </div>
  );
}
