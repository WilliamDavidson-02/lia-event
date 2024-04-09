import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useParams } from "react-router-dom";

import supabase from "../../config/supabaseConfig";

import styles from "./Profile.module.css";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import UserCard from "../../components/UserCard/UserCard";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import Nav from "../../components/Nav/Nav";

export default function Profile() {
  const { user } = useUserContext();
  const [profileData, setProfileData] = useState(null);
  const { profileID, profileType } = useParams();
  const [doEdit, setDoEdit] = useState(false);

  let displayEdit = false;

  if (user?.id === profileID) {
    displayEdit = true;
  }

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

  /* Doesn't work - needs fixing */
  //const setSave = async (profileID) => {};

  const openEdit = () => {
    setDoEdit(true);
  };

  const cancelEdit = () => {
    setDoEdit(false);
  };
  return (
    <div className={styles.container}>
      <Nav />
      {profileData && (
        <>
          {doEdit ? (
            <ProfileEdit profileData={profileData} profileType={profileType} closeEdit={cancelEdit} />
          ) : (
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
                showEdit={displayEdit}
                openEdit={openEdit}
              />
              <ProfileAbout profileType={profileType} profileData={profileData} />
            </>
          )}
        </>
      )}
    </div>
  );
}
