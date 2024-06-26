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
  getSavedUsers,
  getUsers,
  handleShowAllMatches,
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

  const handleSave = () => {
    handleMenuToggle(false);
    filterOptions.wishlist ? getSavedUsers() : getUsers();
  };

  const handleFilterOptions = (prop, value) => {
    setFilterOptions((prev) => ({ ...prev, [prop]: value }));
  };

  const handleWishlistToggle = () => {
    !filterOptions.wishlist ? getSavedUsers() : getUsers();
    handleFilterOptions("wishlist", !filterOptions.wishlist);
  };

  return (
    <div className={styles.header}>
      <Search
        variant={filterOptions.search ? "default" : "ghost"}
        style={{ borderRadius: "var(--rounded-md)" }}
        value={filterOptions.search}
        onChange={(ev) => handleFilterOptions("search", ev.target.value)}
      />
      <div className={styles.menu}>
        <div
          onClick={() => handleMenuToggle(!showOptions)}
          className={styles.trigger}
        >
          <SlidersHorizontal size={24} />
          <span>Filter</span>
        </div>
        <div
          style={{ backgroundColor: "var(--yrgo-red)" }}
          className={styles.trigger}
          onClick={handleShowAllMatches}
        >
          <HeartHandshake size={24} />
          <span>Match Me</span>
        </div>
        <div
          ref={modal}
          className={styles.wrapper}
          style={{ display: showOptions ? "flex" : "none" }}
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
              style={{ display: showOptions ? "grid" : "none" }}
              className={`${styles.side} ${
                activeSideMenu ? styles["side-open"] : ""
              }`}
            >
              <EditKeywords
                handleProperty={(words) =>
                  handleFilterOptions("keywords", words)
                }
                selected={filterOptions.keywords}
                setSelected={(words) => handleFilterOptions("keywords", words)}
                area={"all"}
                variant="dark"
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
    </div>
  );
}
