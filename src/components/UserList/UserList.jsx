import { useEffect } from "react";
import styles from "./UserList.module.css";
import stylesCard from "../UserCard/UserCard.module.css";
import UserCard from "../UserCard/UserCard";
import MatchRating from "../MatchRating/MatchRating";
import { useNavigate } from "react-router-dom";

export default function UserList({
  users,
  setUsers,
  filterOptions,
  handleShowMatches,
  showMatches,
}) {
  const navigate = useNavigate();

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

  const filterUsersfromWishlist = (users) => {
    if (!filterOptions.wishlist) return users;

    return users.filter((u) => u.isSaved);
  };

  const setSave = (id, isSaved) => {
    setUsers((prev) => {
      const users = prev.map((u) => {
        if (u.id === id) u.isSaved = isSaved;
        return u;
      });

      return filterUsersfromWishlist(users);
    });
  };

  const withStopPropagation = (callback) => (ev) => {
    ev.stopPropagation();
    callback(ev);
  };

  return (
    <>
      {users.length > 0 ? (
        <section id={"finder-user-list-container"} className={styles.content}>
          {users.map((profile) => (
            <UserCard
              onClick={() =>
                navigate(`/profile/${profile.user_type}/${profile.id}`)
              }
              style={{ cursor: "pointer" }}
              setSave={setSave}
              profile={profile}
              key={profile.id}
            >
              <MatchRating
                onClick={withStopPropagation(() =>
                  handleShowMatches(profile.id)
                )}
                show={showMatches.includes(profile.id)}
                rating={profile.rating}
              />
            </UserCard>
          ))}
        </section>
      ) : (
        <div className={styles.empty}>No users found</div>
      )}
    </>
  );
}
