import { useEffect, useRef, useState } from "react";
import styles from "./UserList.module.css";
import stylesCard from "../UserCard/UserCard.module.css";
import UserCard from "../UserCard/UserCard";
import MatchRating from "../MatchRating/MatchRating";
import Skeleton from "../Skeleton/Skeleton";

export default function UserList({ companies, handleOffset, setCompanies }) {
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
  }, [container]);

  const handleScroll = (ev) => {
    const { scrollTop, scrollHeight, clientHeight } = ev.target;
    const isScrollInRange = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (isScrollInRange) handleOffset();
  };

  if (!companies.length) {
    return (
      <div className={styles.skeleton}>
        <Skeleton style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  const setLike = (id) => {
    setCompanies((prev) => {
      return prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            isLiked: !c.isLiked,
          };
        }

        return c;
      });
    });
  };

  return (
    <section onScroll={handleScroll} ref={container} className={styles.content}>
      {companies.map((company) => (
        <UserCard setLike={setLike} company={company} key={company.id}>
          <MatchRating />
        </UserCard>
      ))}
    </section>
  );
}
