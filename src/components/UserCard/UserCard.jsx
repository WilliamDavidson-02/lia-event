import styles from "./UserCard.module.css";
import Image from "../Image/Image";
import { Bookmark } from "lucide-react";
import useUserContext from "../../hooks/useUserContext";
import supabase from "../../config/supabaseConfig";

export default function UserCard({ setLike, company, children, ...props }) {
  const { user } = useUserContext();

  const handleLike = async () => {
    // Toggle like for company
    setLike(company.id);

    if (!company.isLiked) {
      const { error } = await supabase
        .from("student_like_company")
        .insert({ student_id: user.id, company_id: company.id });

      if (error) {
        console.log("Error handling like", error);
      }
    } else {
      const { error } = await supabase
        .from("student_like_company")
        .delete()
        .eq("company_id", company.id)
        .eq("student_id", user.id);

      if (error) {
        console.log("Error handling like", error);
      }
    }
  };

  return (
    <div {...props} className={styles.card}>
      <Bookmark
        onClick={handleLike}
        className={company.isLiked ? styles.liked : ""}
        style={{ marginLeft: "auto" }}
      />
      <div className={styles.content}>
        <Image
          src={company.avatar}
          style={{
            aspectRatio: 1 / 1,
            width: "5.3rem",
            borderRadius: "100vmax",
            zIndex: "2",
          }}
        />
        <div>
          <div className={styles.title}>{company.profile.name}</div>
          <div className={styles.paragraph}>{company.href}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
