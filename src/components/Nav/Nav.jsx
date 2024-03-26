import styles from "./Nav.module.css";
import X from "../X/X";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

export default function Nav() {
  const { user } = useUserContext();
  const nav = useRef(null);

  const navLinks = [
    {
      path: "/home",
      name: "Home",
    },
    {
      path: "https://www.yrgo.se/",
      name: "Yrgo.se",
    },
    {
      path: user ? "/logout" : "/login",
      name: user ? "Logout" : "Login",
      className: styles.space,
    },
  ];

  const handleNavToggle = () => {
    if (!nav) return;

    nav.current.classList.toggle(styles.toggled);
  };

  return (
    <>
      <div onClick={handleNavToggle} className={styles["nav-btn-container"]}>
        <div />
        <div />
      </div>
      <nav ref={nav} className={styles.nav}>
        <X onClick={handleNavToggle} />
        <div className={styles.content}>
          {navLinks.map((link, idx) => (
            <Link
              className={link.className || ""}
              onClick={handleNavToggle}
              to={link.path}
              key={`${link.name}-${idx}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
