import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import UserCard from "../../components/UserCard/UserCard";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";

export default function Profile() {
  const { user } = useUserContext();
  const { profileID, profileType } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [doEdit, setDoEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!["student", "company"].includes(profileType)) {
      navigate("/");
    }

    const getSavedUser = async (id) => {
      const { count } = await supabase
        .from("saved_users")
        .select("", { count: "exact" })
        .eq("user_id", user.id)
        .eq("saved_id", id);

      return count > 0;
    };

    async function fetchProfileData() {
      let query = supabase
        .from("profile")
        .select()
        .eq("id", profileID)
        .single();

      if (profileType === "company") {
        query = query.select("*, company_profile(*)");
      }

      let { data, error } = await query;

      if (error) {
        console.log("error fetching profile", error);
        return;
      }

      if (!data) return;

      if (user.id !== data.id) {
        const isSaved = await getSavedUser(data.id);

        data.isSaved = isSaved;
      }

      setProfileData(data);
    }

    fetchProfileData();
  }, [profileID, profileType]);

  const setSave = (id, isSaved) => {
    setProfileData((prev) => ({ ...prev, isSaved }));
  };

  return (
    <main className={styles.container}>
      {profileData &&
        (doEdit ? (
          <ProfileEdit
            profileData={profileData}
            setProfileData={setProfileData}
            closeEdit={() => setDoEdit(false)}
          />
        ) : (
          <section>
            <UserCard
              profile={profileData}
              setSave={setSave}
              showEdit={user?.id === profileID}
              openEdit={() => setDoEdit(true)}
              variant="profile"
            />
            <ProfileAbout profileData={profileData} />
          </section>
        ))}
    </main>
  );
}
