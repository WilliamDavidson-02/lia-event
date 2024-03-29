import styles from "./Nav.module.css";
import X from "../X/X";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { Loader2 } from "lucide-react";

export default function Nav() {
  const { user, signOut } = useUserContext();
  const [isSigningOutLoading, setIsSigningOutLoading] = useState(false);
  const nav = useRef(null);

  const handleNavToggle = () => {
    if (!nav) return;

    nav.current.classList.toggle(styles.toggled);
  };

  const handleSignOut = async () => {
    setIsSigningOutLoading(true);
    await signOut();

    setIsSigningOutLoading(false);
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
              {isSigningOutLoading && (
                <Loader2
                  className="loader"
                  size={24}
                  strokeWidth={3}
                  style={{ marginRight: "10px" }}
                />
              )}
              <span>Logout</span>
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
