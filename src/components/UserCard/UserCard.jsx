import styles from "./UserCard.module.css";
import Image from "../Image/Image";
import { Bookmark, UserCog } from "lucide-react";
import useUserContext from "../../hooks/useUserContext";
import supabase from "../../config/supabaseConfig";

export default function UserCard({
  setSave,
  profile,
  children,
  showEdit,
  openEdit,
  ...props
}) {
  const { user } = useUserContext();

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

  return (
    <div {...props} className={styles.card}>
      {showEdit ? (
        <UserCog onClick={openEdit} style={{ marginLeft: "auto" }} />
      ) : (
        <Bookmark
          onClick={handleSave}
          className={profile.isSaved ? styles.saved : ""}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        />
      )}
      <div className={styles.content}>
        <Image
          src={profile.avatar}
          style={{
            aspectRatio: 1 / 1,
            width: "5.3rem",
            borderRadius: "100vmax",
          }}
        />
        <div>
          <div className={styles.title}>{profile.name}</div>
          <div className={styles.paragraph}>{profile.href}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
