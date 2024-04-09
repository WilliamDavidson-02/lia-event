import styles from "./Nav.module.css";
import X from "../X/X";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { Loader2 } from "lucide-react";
import Hamburger from "../Hamburger/Hamburger";
import Spline from "@splinetool/react-spline";

export default function Nav() {
  const { user, signOut } = useUserContext();
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [isSigningOutLoading, setIsSigningOutLoading] = useState(false);

  const nav = useRef(null);
  const backdrop = useRef(null);

  const handleNavToggle = () => {
    if (!nav) return;

    if (backdrop.current) {
      if (!isNavToggled) {
        backdrop.current.classList.add(styles.backdrop);
      } else {
        setTimeout(() => {
          backdrop.current.classList.remove(styles.backdrop);
        }, 400);
      }
      backdrop.current.classList.toggle(styles.fade);
    }

    nav.current.classList.toggle(styles.toggled);

    setIsNavToggled((prev) => !prev);
  };

  const handleSignOut = async () => {
    setIsSigningOutLoading(true);
    await signOut();

    setIsSigningOutLoading(false);
    handleNavToggle();
  };

  const userID = user?.id;
  const userType = user?.user_metadata?.user_type;

  return (
    <header className={styles.container}>
      <Link to={"/"} className={styles.logo}>
        <Spline scene="https://prod.spline.design/HVznlJBnAVDAGnbj/scene.splinecode" />
      </Link>
      <Hamburger onClick={handleNavToggle} />
      <div
        ref={backdrop}
        className={`${styles.wrapper} ${styles.fade}`}
        onClick={handleNavToggle}
      />
      <nav ref={nav} className={styles.nav}>
        <X onClick={handleNavToggle} />
        <div className={styles.content}>
          <Link onClick={handleNavToggle} to={"/"}>
            Home
          </Link>
          {user && (
            <Link onClick={handleNavToggle} to={"/finder"}>
              Finder
            </Link>
          )}
          {user && (
            <Link
              onClick={handleNavToggle}
              to={`/profile/${userID}/${userType}`}
            >
              Profile
            </Link>
          )}
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
    </header>
  );
}
