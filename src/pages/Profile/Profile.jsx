import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useParams } from "react-router-dom";

import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import UserCard from "../../components/UserCard/UserCard";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { userID, userType } = useParams();
  const { user } = useUserContext;

  useEffect(() => {
    async function fetchUserData() {
      const { data, error } = await supabase
        .from("company_profile")
        .select("*, profile(*)")
        .eq("id", userID)
        .single();

      if (error) {
        console.log("error fetching profile", error);
        return;
      }
      console.log(data);
      setUserData(data);
    }

    fetchUserData();
  }, [userID]);

  const setSave = async (userID) => {
    await supabase.from("saved_users").insert({ user_id: userID, saved_id: userData.profile.id });
    //await supabase.from("saved_users").delete().eq("saved_id", id).eq("user_id", user.id);
  };
  return (
    <div className={styles.container}>
      {userData && (
        <>
          <UserCard
            profile={{
              id: userData.profile.id,
              name: userData.profile.name,
              avatar: userData.profile.avatar,
              href: userData.profile.href,
            }}
            key={userData.profile.id}
            setSave={setSave}
          />
          <ProfileAbout userType={userType} userData={userData} />
        </>
      )}
    </div>
  );
}
