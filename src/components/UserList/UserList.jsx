import { useEffect, useRef } from "react";
import styles from "./UserList.module.css";
import stylesCard from "../UserCard/UserCard.module.css";
import UserCard from "../UserCard/UserCard";
import MatchRating from "../MatchRating/MatchRating";
import Skeleton from "../Skeleton/Skeleton";

export default function UserList({
  users,
  handleOffset,
  setUsers,
  filterOptions,
}) {
  useEffect(() => {
    const container = document.querySelector("#finder-user-list-container");

    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(stylesCard.fade);
        } else {
          entry.target.classList.add(stylesCard.fade);
        }
      });
    });

    container.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => {
      container.childNodes.forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, [users]);

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

  const filterUsersfromWishlist = (users) => {
    if (!filterOptions.wishlist) return users;

    return users.filter((u) => u.isSaved);
  };

  const setSave = (id) => {
    setUsers((prev) => {
      let users = prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            isSaved: !u.isSaved,
          };
        }

        return u;
      });

      users = filterUsersfromWishlist(users);

      return users;
    });
  };

  return (
    <section
      id={"finder-user-list-container"}
      onScroll={handleScroll}
      className={styles.content}
    >
      {users.map((profile) => (
        <UserCard setSave={setSave} profile={profile} key={profile.id}>
          <MatchRating />
        </UserCard>
      ))}
    </section>
  );
}
