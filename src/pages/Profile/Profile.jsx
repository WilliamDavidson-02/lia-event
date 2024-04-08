import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useParams } from "react-router-dom";

import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import UserCard from "../../components/UserCard/UserCard";

export default function Profile() {
  const { user } = useUserContext;
  const [userData, setUserData] = useState(null);
  const { userID, userType } = useParams();
  const [doEdit, setDoEdit] = useState(false);

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
      setUserData(data);
    }

    fetchUserData();
  }, [userID]);

  /* Doesn't work - needs fixing */
  const setSave = async (userID) => {
    if (!userData.profile.isSaved) {
      await supabase.from("saved_users").insert({ user_id: user.id, saved_id: userData.profile.id });
    } else {
      await supabase.from("saved_users").delete().eq("saved_id", userData.profile.id).eq("user_id", user.id);
    }

    setUserData((prevUserData) => ({
      ...prevUserData,
      profile: {
        ...prevUserData.profile,
        isSaved: !prevUserData.profile.isSaved,
      },
    }));
  };

  const openEdit = () => {
    console.log("edit mode");
    setDoEdit(true);
    console.log(doEdit);
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
            setSave={setSave(userID)}
            //showEdit={user.id === userData.profile.id}
            showEdit={true}
            openEdit={openEdit}
          />
          <ProfileAbout userType={userType} userData={userData} />
        </>
      )}
    </div>
  );
}
