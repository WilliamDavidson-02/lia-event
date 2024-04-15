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

  const handleKeywordsChange = (keywords) => {
    setSelectedKeywords(keywords);
  };

  const handlePropertyChange = (prop, callback) => (value) => {
    console.log({ prop, callback, value });

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
      <form className={styles.field} autoComplete="off" autoCorrect="off">
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
        <h2>Editing Profile</h2>
        <Label htmlFor={"name"} style={{ color: "white" }}>
          Company name
          <Input
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
            id="name"
            className={styles.inputField}
            placeholder="Name"
            onChange={(ev) => handleInputChange("name", ev.target.value)}
            value={profileData.name}
          />
        </Label>
        {profileType === "company" && (
          <>
            <Label htmlFor={"href"} style={{ color: "white" }}>
              Website
              <Input
                className={styles.inputField}
                placeholder="Website"
                id="href"
                onChange={(ev) => handleInputChange("href", ev.target.value)}
                value={profileData.href}
              ></Input>
            </Label>
            <Label htmlFor={"contact-email"} style={{ color: "white" }}>
              Contact mail
              <Input
                className={styles.inputField}
                placeholder="Enter mail"
                id="contact-email"
                onChange={(ev) => handleInputChange("contact", ev.target.value)}
                value={profileData.contact}
              ></Input>
            </Label>

            <div className={styles.elementContainer}>
              <h2>Login Details:</h2>
              <Label htmlFor={"email"} style={{ color: "white" }}>
                Email
                <Input
                  className={styles.inputField}
                  placeholder="Enter mail"
                  id="email"
                  onChange={(ev) =>
                    handleInputChange("user_email", ev.target.value)
                  }
                  value={profileData.user_email}
                ></Input>
              </Label>
              <Label htmlFor={"new-password"} style={{ color: "white" }}>
                Password
                <Input
                  className={styles.inputField}
                  id="new-password"
                  placeholder="New password"
                  onChange={(event) => setNewPassword(event.target.value)}
                ></Input>
              </Label>
            </div>

            <div className={styles.elementContainer}>
              <h2>Looking for</h2>
              <div className={styles.radioBg}>
                <Radios
                  variant="profile"
                  name="area"
                  variantInput="profileRadio"
                  options={onboardingMap.company[1].options}
                  selected={profileData.area}
                  handleProperty={handlePropertyChange("area", setProfileData)}
                />
              </div>
            </div>

            <EditKeywords
              name="keywords"
              handleProperty={handleKeywordsChange}
              selected={profileData.keywords}
              area={profileData.area}
            />
            <div className={styles.geoContainer}>
              <h2>Location</h2>
              <GeoLocation
                position={profileData.location}
                handleProperty={handlePropertyChange(
                  "location",
                  setProfileData
                )}
              />
            </div>
          </>
        )}
        {profileType === "student" && (
          <>
            <div>
              Education
              <Radios
                variant="profile"
                variantInput="profileRadio"
                name="area"
                options={onboardingMap.student[1].options}
                selected={profileData.area}
                handleProperty={handlePropertyChange("area", setProfileData)}
              />
            </div>
            <Label htmlFor={"href"}>
              <Input
                className={styles.inputField}
                placeholder="Website"
                id="href"
                value={profileData.href}
                onChange={(ev) => handleInputChange("href", ev.target.value)}
              ></Input>
            </Label>
            <Chips defaultValue={profileData.keywords} />
            <div className={styles.loginInfo}>
              <h2>Login Details:</h2>
              <Label htmlFor={"email"} style={{ color: "white" }}>
                Email
                <Input
                  className={styles.inputField}
                  placeholder="Email"
                  id="email"
                  onChange={(ev) =>
                    handleInputChange("user_email", ev.target.value)
                  }
                ></Input>
              </Label>
              <Label htmlFor={"new-password"} style={{ color: "white" }}>
                Password
                <Input
                  className={styles.inputField}
                  id="new-password"
                  placeholder="New password"
                  onChange={(ev) => setNewPassword(ev.target.value)}
                ></Input>
              </Label>
            </div>
          </>
        )}
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
