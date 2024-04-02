import { useEffect, useRef } from "react";
import styles from "./UserList.module.css";
import stylesCard from "../UserCard/UserCard.module.css";
import UserCard from "../UserCard/UserCard";
import MatchRating from "../MatchRating/MatchRating";
import Skeleton from "../Skeleton/Skeleton";

export default function UserList({ users }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current || !users.length) return;

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
  }, [container, users]);

  if (!users.length) {
    return (
      <div className={styles.skeleton}>
        <Skeleton style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  return (
    <section ref={container} className={styles.content}>
      {users.map((user) => (
        <UserCard user={user} key={user.id}>
          <MatchRating />
        </UserCard>
      ))}
    </section>
  );
}
