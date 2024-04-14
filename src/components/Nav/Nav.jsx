import styles from "./Nav.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { Loader2 } from "lucide-react";
import Hamburger from "../Hamburger/Hamburger";
import Spline from "@splinetool/react-spline";
import NavLabel from "../NavLabel/NavLabel";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Nav() {
  const { user, signOut } = useUserContext();
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [isSigningOutLoading, setIsSigningOutLoading] = useState(false);

  const size = useWindowSize();

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

  return (
    <header className={styles.container}>
      <Link to={"/"} className={styles.logo}>
        {size.width <= 760 ? (
          <Spline scene="https://prod.spline.design/HVznlJBnAVDAGnbj/scene.splinecode" />
        ) : (
          <img src={"/yrgo_logo_large.svg"} alt={"YRGO"} />
        )}
      </Link>
      <Hamburger onClick={handleNavToggle} />
      <div
        ref={backdrop}
        className={`${styles.wrapper} ${styles.fade}`}
        onClick={handleNavToggle}
      />
      <nav ref={nav} className={styles.nav}>
        <Link
          style={{ padding: "1rem 2rem" }}
          onClick={handleNavToggle}
          className={styles.x}
        >
          <div>X</div>
        </Link>
        <div className={styles.content}>
          <Link onClick={handleNavToggle} to={"/"}>
            <NavLabel>Home</NavLabel>
          </Link>
          {user && (
            <Link onClick={handleNavToggle} to={"/finder"}>
              <NavLabel>Finder</NavLabel>
            </Link>
          )}
          {user && (
            <Link
              onClick={handleNavToggle}
              to={`/profile/${user?.user_metadata.user_type}/${user.id}`}
            >
              <NavLabel>Profile</NavLabel>
            </Link>
          )}
          <Link onClick={handleNavToggle} to={"https://www.yrgo.se/"}>
            <NavLabel>Yrgo.se</NavLabel>
          </Link>
          {user ? (
            <div className={styles.space} onClick={handleSignOut}>
              <NavLabel>
                {isSigningOutLoading && (
                  <Loader2
                    className="loader"
                    size={24}
                    strokeWidth={3}
                    style={{ marginRight: "10px" }}
                  />
                )}
                <span>Logout</span>
              </NavLabel>
            </div>
          ) : (
            <>
              <Link
                onClick={handleNavToggle}
                className={styles.space}
                to={"/login"}
              >
                <NavLabel>Login</NavLabel>
              </Link>
              <Link onClick={handleNavToggle} to={"/onboarding"}>
                <NavLabel>Attend event</NavLabel>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
