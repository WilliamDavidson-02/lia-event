import styles from "./UserCard.module.css";
import Image from "../Image/Image";
import { Bookmark, Pencil } from "lucide-react";
import useUserContext from "../../hooks/useUserContext";
import supabase from "../../config/supabaseConfig";
import Initials from "../Initials/Initials";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

export default function UserCard({
  setSave,
  profile,
  children,
  showEdit,
  openEdit,
  variant = "default",
  ...props
}) {
  const { user } = useUserContext();
  const { profileType } = useParams();

  const size = useWindowSize();

  const handleSave = async () => {
    /**
     * Display optimistic ui change for saved users.
     * If there is an error from supabase, saved users is toggled back to it's initial value.
     */

    if (!profile.isSaved) {
      setSave(profile.id, true);

      const { error } = await supabase
        .from("saved_users")
        .insert({ user_id: user.id, saved_id: profile.id });

      if (error) setSave(profile.id, false);
    } else {
      setSave(profile.id, false);

      const { error } = await supabase
        .from("saved_users")
        .delete()
        .eq("saved_id", profile.id)
        .eq("user_id", user.id);

      if (error) setSave(profile.id, true);
    }
  };

  const withStopPropagation = (callback) => (ev) => {
    ev.stopPropagation();
    callback(ev);
  };

  return (
    <div {...props} className={`${styles[variant]} ${styles.card}`}>
      {showEdit ? (
        <Pencil
          onClick={withStopPropagation(openEdit)}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        />
      ) : (
        <Bookmark
          onClick={withStopPropagation(handleSave)}
          className={profile.isSaved ? styles.saved : ""}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        />
      )}
      <div className={styles.content}>
        <div className={styles.avatar}>
          {profile.avatar ? (
            <Image src={profile.avatar} style={{ aspectRatio: 1 / 1 }} />
          ) : (
            <Initials
              name={profile.name}
              size={profileType && size.width >= 760 ? "lg" : "md"}
              style={{ aspectRatio: 1 / 1 }}
            />
          )}
        </div>
        <div>
          <div className={styles.title}>{profile.name}</div>
          {profile.href && (
            <div className={styles.paragraph}>
              <a href={profile.href} target="_blank" rel="noopener noreferrer">
                {profile.href}
              </a>
            </div>
          )}
          {profileType && (profile.user_email || profile.contact) && (
            <div
              className={styles.paragraph}
              style={{ marginTop: "var(--m-lg)" }}
            >
              <a
                href={`mailto:${
                  profile.user_type === "student"
                    ? profile.user_email
                    : profile.contact
                }`}
              >
                {profile.user_type === "student"
                  ? profile.user_email
                  : profile.contact}
              </a>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
