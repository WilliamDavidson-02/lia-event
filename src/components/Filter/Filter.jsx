import { useRef, useState } from "react";
import styles from "./Filter.module.css";
import Search from "../Search/Search";
import EditKeywords from "../EditKeywords/EditKeywords";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  SlidersHorizontal,
} from "lucide-react";
import Toggle from "../Toggle/Toggle";
import Button from "../Button/Button";
import { useClickAway } from "@uidotdev/usehooks";

export default function Filter({
  filterOptions,
  setFilterOptions,
  resetOffset,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSideMenu, setActiveSideMenu] = useState(false);
  const [timer, setTimer] = useState(null);

  const content = useRef(null);
  const modal = useClickAway(() => handleMenuToggle(false));

  function handleMenuToggle(toggle) {
    if (!content.current) return;

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (toggle) {
      setShowOptions(toggle);
      setActiveSideMenu(false);

      const time = setTimeout(() => {
        content.current.classList.remove(styles.up);
        setTimer(null);
      }, 10);
      setTimer(time);
    } else {
      content.current.classList.add(styles.up);

      const time = setTimeout(() => {
        setShowOptions(toggle);
        setActiveSideMenu(false);
        setTimer(null);
      }, 400);
      setTimer(time);
    }
  }

  const handleSearch = () => {};

  const handleSave = () => {
    handleMenuToggle(false);
    resetOffset(filterOptions.wishlist);
  };

  const handleFilterOptions = (prop, value) => {
    setFilterOptions((prev) => ({ ...prev, [prop]: value }));
  };

  const handleWishlistToggle = () => {
    handleFilterOptions("wishlist", !filterOptions.wishlist);
    resetOffset(!filterOptions.wishlist);
  };

  return (
    <div className={styles.container}>
      <Search handleSearch={handleSearch} />
      <div className={styles.header}>
        <div
          onClick={() => handleMenuToggle(!showOptions)}
          className={styles.trigger}
        >
          <SlidersHorizontal size={24} />
          <span>Filter</span>
        </div>
        <div
          style={{
            color: "var(--yrgo-white)",
            backgroundColor: "var(--yrgo-red)",
          }}
          className={styles.trigger}
        >
          <HeartHandshake size={24} />
          <span>Match Me</span>
        </div>
      </div>
      <div
        ref={modal}
        className={styles.wrapper}
        style={{ display: showOptions ? "block" : "none" }}
      >
        <div ref={content} className={`${styles.content} ${styles.up}`}>
          <div className={styles.option}>
            <div className={styles.trigger}>
              <Bookmark />
              <span>My WishList</span>
            </div>
            <Toggle onClick={handleWishlistToggle} />
          </div>
          <div className={styles.separator} />
          <div
            onClick={() => setActiveSideMenu((prev) => !prev)}
            className={styles.option}
          >
            <div className={styles.trigger}>Keywords</div>
            <ChevronRight />
          </div>
          <div className={styles.separator} />
          <div
            style={{ display: showOptions ? "flex" : "none" }}
            className={`${styles.side} ${
              activeSideMenu ? styles["side-open"] : ""
            }`}
          >
            <EditKeywords
              style={{ maxHeight: "calc(100vh - 5rem - 232px)" }}
              handleProperty={(words) => handleFilterOptions("keywords", words)}
              selected={filterOptions.keywords}
              area={"all"}
            />
            <div className={styles.footer}>
              <Button variant="blue" onClick={() => setActiveSideMenu(false)}>
                <ChevronLeft />
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
