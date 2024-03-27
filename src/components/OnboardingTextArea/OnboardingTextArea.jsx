import { useState } from "react";
import styles from "./OnboardingTextArea.module.css";

export default function OnboardingTextArea({ handleSubmit, handleProperty }) {
  const [text, setText] = useState("");

  const handleChange = (ev) => {
    const value = ev.target.value;
    setText(value);

    handleProperty(value);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      handleSubmit(ev);

      setText("");
    }
  };

  return (
    <textarea
      className={styles.textarea}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type ..."
    ></textarea>
  );
}
