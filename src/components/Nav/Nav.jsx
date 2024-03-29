import styles from "./Nav.module.css";
import X from "../X/X";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

export default function Nav() {
  const { user, signOut } = useUserContext();
  const nav = useRef(null);

  const handleNavToggle = () => {
    if (!nav) return;

    nav.current.classList.toggle(styles.toggled);
  };

  const handleSignOut = async () => {
    await signOut();

    handleNavToggle();
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
          <Link onClick={handleNavToggle} to={"/"}>
            Home
          </Link>
          <Link onClick={handleNavToggle} to={"https://www.yrgo.se/"}>
            Yrgo.se
          </Link>
          {user ? (
            <div className={styles.space} onClick={handleSignOut}>
              Logout
            </div>
          ) : (
            <>
              <Link
                onClick={handleNavToggle}
                className={styles.space}
                to={"/login"}
              >
                Login
              </Link>
              <Link onClick={handleNavToggle} to={"/onboarding"}>
                Create account
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
