import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useParams } from "react-router-dom";

import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import BusinessCard from "../../components/BusinessCard/BusinessCard";
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
  return (
    <div className={styles.container}>
      {userData && (
        <>
          <BusinessCard name={userData.profile.name} url={userData.href || "url not set"} profileImg="#" />
          {/* <UserCard /> */}
          <ProfileAbout userType={userType} userData={userData} />
        </>
      )}
    </div>
  );
}
