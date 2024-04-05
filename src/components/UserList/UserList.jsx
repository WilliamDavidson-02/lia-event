import { useEffect, useRef } from "react";
import styles from "./UserList.module.css";
import stylesCard from "../UserCard/UserCard.module.css";
import UserCard from "../UserCard/UserCard";
import MatchRating from "../MatchRating/MatchRating";
import Skeleton from "../Skeleton/Skeleton";

export default function UserList({ users, handleOffset, setUsers }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(stylesCard.fade);
        } else {
          entry.target.classList.add(stylesCard.fade);
        }
      });
    });

    container.current.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => {
      container.current?.childNodes.forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, [container]);

  const handleScroll = (ev) => {
    const { scrollTop, scrollHeight, clientHeight } = ev.target;
    const isScrollInRange = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (isScrollInRange) handleOffset();
  };

  if (!users.length) {
    return (
      <div className={styles.skeleton}>
        <Skeleton style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  const setSave = (id) => {
    setUsers((prev) => {
      return prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            isSaved: !u.isSaved,
          };
        }

        return u;
      });
    });
  };

  return (
    <section onScroll={handleScroll} ref={container} className={styles.content}>
      {users.map((profile) => (
        <UserCard setSave={setSave} profile={profile} key={profile.id}>
          <MatchRating />
        </UserCard>
      ))}
    </section>
  );
}
