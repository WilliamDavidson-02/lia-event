import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useParams } from "react-router-dom";

import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import UserCard from "../../components/UserCard/UserCard";

export default function Profile() {
  const { user } = useUserContext;
  const [profileData, setProfileData] = useState(null);
  const { profileID, profileType } = useParams();
  const [doEdit, setDoEdit] = useState(false);

  console.log(profileID);
  console.log(profileType);

  useEffect(() => {
    async function fetchProfileData() {
      let data, error;

      if (profileType === "company") {
        ({ data, error } = await supabase
          .from("profile")
          .select("*, company_profile(*)")
          .eq("id", profileID)
          .single());
      } else if (profileType === "student") {
        ({ data, error } = await supabase.from("profile").select("*").eq("id", profileID).single());
      } else {
        console.log("Invalid profile type:", profileType);
      }

      if (error) {
        console.log("error fetching profile", error);
        return;
      }
      setProfileData(data);
    }

    fetchProfileData();
  }, [profileID]);

  console.log(profileData);
  /* Doesn't work - needs fixing */
  //const setSave = async (profileID) => {};

  const openEdit = () => {
    console.log("edit mode");
    setDoEdit(true);
    console.log(doEdit);
  };

  return (
    <div className={styles.container}>
      {profileData && (
        <>
          <UserCard
            profile={{
              id: profileData.id,
              name: profileData.name,
              avatar: profileData.avatar,
              href: profileData.href,
            }}
            key={profileData.id}
            //setSave={setSave(profileID)}
            //showEdit={user.id === userData.profile.id}
            showEdit={true}
            openEdit={openEdit}
          />
          <ProfileAbout profileType={profileType} profileData={profileData} />
        </>
      )}
    </div>
  );
}
