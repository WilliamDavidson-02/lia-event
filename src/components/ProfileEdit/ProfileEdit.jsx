import { useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import supabase from "../../config/supabaseConfig";
import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import Radios from "../Radios/Radios";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import Initials from "../Initials/Initials";
import Button from "../Button/Button";
import EditKeywords from "../EditKeywords/EditKeywords";
import GeoLocation from "../GeoLocation/GeoLocation";
import useUserContext from "../../hooks/useUserContext";

const baseUrl = import.meta.env.VITE_SUPABASE_AVATARS_BASE_URL;

export default function ProfileEdit({
  profileData,
  setProfileData,
  closeEdit,
}) {
  const { user } = useUserContext();
  const { profileType } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const size = useWindowSize();

  const handleInputChange = (prop, value) => {
    setProfileData((prev) => ({ ...prev, [prop]: value }));
  };

  const handlePropertyChange = (prop, callback) => (value) => {
    callback((prev) => ({ ...prev, [prop]: value }));
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!event.target.files && !event.target.files[0]) return;

    const file = event.target.files[0];

    const { error: errorRemove } = await supabase.storage
      .from("avatars")
      .remove([profileData.avatar]);

    if (errorRemove) {
      console.log("No image found");
      return;
    }

    const fileName = file.name.trim().replace(/[-\s]/g, "_").toLowerCase();
    const avatarFileName = `${new Date().getTime()}_${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image", error.message);
      return;
    }

    const { error: userError } = await supabase
      .from("profile")
      .update({ avatar: avatarFileName })
      .eq("id", user.id);

    if (userError) {
      console.error("Error updating user avatar", userError.message);
      return;
    }

    setProfileData((prev) => ({ ...prev, avatar: avatarFileName }));
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();

    const { name, href, area, user_email, keywords, avatar } = profileData;

    let updateUserData = {
      data: { name, href, area, user_email, keywords, avatar },
    };

    if (profileType === "company") {
      updateUserData.data.contact = profileData.contact;
      updateUserData.data.location = profileData.location;
    }

    if (user_email !== user.email) {
      updateUserData.data.email = user_email;
    }

    if (newPassword) {
      updateUserData.password = newPassword;
    }

    const { error: userError } = await supabase.auth.updateUser(updateUserData);

    if (userError) {
      console.error("Error updating user profile: ", userError.message);
      return;
    }

    closeEdit();
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} autoComplete="off" autoCorrect="off">
        <div className={styles.card}>
          <div className={styles.section}>
            <label htmlFor={"imgUpload"} className={styles.editImage}>
              <div className={styles.avatar}>
                {profileData.avatar ? (
                  <Image
                    src={`${baseUrl}/${profileData.avatar}`}
                    style={{ aspectRatio: 1 / 1 }}
                  />
                ) : (
                  <Initials
                    name={profileData.name}
                    size={profileType && size.width >= 760 ? "lg" : "md"}
                    style={{ aspectRatio: 1 / 1 }}
                  />
                )}
              </div>
              <p className={styles.editImgParagraph}>Edit</p>
              <input
                id="imgUpload"
                type="file"
                accept="image/"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className={styles.section}>
            <h2>Editing profile</h2>
            <div className={styles.field}>
              <Label htmlFor={"name"}>
                {profileType === "company" ? "Company name" : "Name"}
              </Label>
              <Input
                id="name"
                variant="dark-blue"
                placeholder={"Name"}
                onChange={(ev) => handleInputChange("name", ev.target.value)}
                value={profileData.name}
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={"href"}>
                {profileType === "company"
                  ? "Company website"
                  : "Portfolio link"}
              </Label>
              <Input
                variant="dark-blue"
                placeholder="Website"
                id="href"
                onChange={(ev) => handleInputChange("href", ev.target.value)}
                value={profileData.href}
              />
            </div>
            {profileType === "company" && (
              <div className={styles.field}>
                <Label htmlFor={"contact-email"}>Contact mail</Label>
                <Input
                  variant="dark-blue"
                  placeholder="Enter mail"
                  id="contact-email"
                  onChange={(ev) =>
                    handleInputChange("contact", ev.target.value)
                  }
                  value={profileData.contact}
                />
              </div>
            )}
          </div>
          <div className={styles.section}>
            <h2>Login details</h2>
            <div className={styles.field}>
              <Label htmlFor={"email"}>Email</Label>
              <Input
                variant="dark-blue"
                placeholder="Enter mail"
                id="email"
                onChange={(ev) =>
                  handleInputChange("user_email", ev.target.value)
                }
                value={profileData.user_email}
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={"new-password"}>Password</Label>
              <Input
                variant="dark-blue"
                id="new-password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.about}>
          <div className={styles.card}>
            <div className={styles.section}>
              <h2>{profileType === "company" ? "Looking for" : "Education"}</h2>
              <div className={styles.radioBg}>
                <Radios
                  variant="profile"
                  name="area"
                  variantInput="profileRadio"
                  options={
                    profileType === "company"
                      ? onboardingMap.company[1].options
                      : onboardingMap.student[1].options
                  }
                  selected={profileData.area}
                  handleProperty={handlePropertyChange("area", setProfileData)}
                />
              </div>
              <div className={styles.keywordsContainer}>
                <h2>
                  {profileType === "company" ? "Expertise wanted" : "Expertise"}
                </h2>
                <EditKeywords
                  name="keywords"
                  handleProperty={handlePropertyChange(
                    "keywords",
                    setProfileData
                  )}
                  selected={profileData.keywords}
                  area={profileData.area}
                />
              </div>
            </div>
          </div>
          {profileType === "company" && (
            <div className={styles.card}>
              <div className={styles.section}>
                <h2>Location</h2>
                <div className={styles.geoContainer}>
                  <GeoLocation
                    position={profileData.location}
                    handleProperty={handlePropertyChange(
                      "location",
                      setProfileData
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={closeEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
