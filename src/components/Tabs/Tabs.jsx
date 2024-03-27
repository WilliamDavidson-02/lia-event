import { Children, useState } from "react";
import styles from "./Tabs.module.css";

export default function Tabs({ children, ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const movement = 10;

  const handleTabClick = (index) => {
    if (index >= children.length) index = 0;

    setActiveTab(index);
  };

  const handleMouseMove = ({ movementX }) => {
    if (!isMouseDown) return;

    if (movementX >= movement) {
      setActiveTab((prev) => (prev - 1 >= 0 ? prev - 1 : children.length - 1));
      setIsMouseDown(false);
    } else if (movementX <= -movement) {
      setActiveTab((prev) => (prev + 1 < children.length ? prev + 1 : 0));
      setIsMouseDown(false);
    }
  };

  const handleTouchStart = (ev) => {
    const { clientX, clientY } = ev.touches[0];

    setTouchStartX(clientX);
    setTouchStartY(clientY);
  };

  const handleTouchMove = (ev) => {
    if (!touchStartX) return;

    const touchMoveX = ev.touches[0].clientX;
    const movementX = touchMoveX - touchStartX;

    const touchMoveY = ev.touches[0].clientY;
    const movementY = touchMoveY - touchStartY;

    if (Math.abs(movementY) > movement) return;

    if (movementX >= movement) {
      setActiveTab((prev) => (prev - 1 >= 0 ? prev - 1 : children.length - 1));
      setTouchStartX(null);
    } else if (movementX <= -movement) {
      setActiveTab((prev) => (prev + 1 < children.length ? prev + 1 : 0));
      setTouchStartX(null);
    }
  };

  return (
    <div className={styles.container} {...props}>
      <div className={styles["pill-container"]}>
        {Children.map(children, (child, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(index)}
            className={`${styles.pill} ${
              activeTab === index ? styles["pill-selected"] : ""
            }`}
          />
        ))}
      </div>
      {Children.map(children, (child, index) => (
        <div
          onMouseMove={handleMouseMove}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={() => setTouchStartX(null)}
          className={styles.content}
          style={{ display: activeTab !== index ? "none" : "flex" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
