import { useEffect, useState } from "react";
import X from "../../components/X/X";
import Button from "../../components/Button/Button";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import OnboardingCard from "../../components/OnboardingCard/OnboardingCard";
import styles from "./Onboarding.module.css";
import OnboardingTextArea from "../../components/OnboardingTextArea/OnboardingTextArea";
import OnboardingRadio from "../../components/OnboardingRadio/OnboardingRadio";
import onboardingMap from "../../lib/onboardingMap.json";
import ChipsGrid from "../../components/ChipsGrid/ChipsGrid";
import { ArrowRight } from "lucide-react";
import OnboardingFooter from "../../components/OnboardingFooter/OnboardingFooter";
import GeoLocation from "../../components/GeoLocation/GeoLocation";
import OnboardingCheckBoxes from "../../components/OnboardingCheckBoxes/OnboardingCheckBoxes";
import UserTypeSelect from "../../components/UserTypeSelect/UserTypeSelect";
import GDPR from "../../components/GDPR/GDPR";

export default function Onboarding() {
  const [onboarding, setOnboarding] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentField, setCurrentField] = useState(null);
  const [isGdprConfirmed, setIsGdprConfirmed] = useState(false);
  const [userType, setUserType] = useState(null);

  const setOnboardingValues = (value) => {
    const property = currentField.property;

    setOnboarding((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (currentFieldIndex !== onboardingMap[userType].length - 1) {
      // There are still more questions
      const nextIndex = currentFieldIndex + 1;
      nextField(nextIndex);
      setCurrentFieldIndex(nextIndex);
    } else {
      // All questions answered
      console.log(onboarding);
    }
  };

  useEffect(() => {
    if (isGdprConfirmed && userType) nextField(currentFieldIndex);
  }, [userType]);

  const nextField = (index) => {
    const current = onboardingMap[userType][index];

    // Set default value for property
    setOnboarding((prev) => ({
      ...prev,
      [current.property]: current.defaultValue,
    }));

    setCurrentField(current);
  };

  const handleSkip = () => {
    // Check if user alreay enter a value in field
    if (onboarding[currentField.property]) {
      const onboardinObj = onboarding;

      delete onboardinObj[currentField.property];

      setOnboarding(onboardinObj);
    }

    handleSubmit(new Event("submit"));
  };

  if (!currentField) {
    return (
      <div className={styles.wrapper}>
        <GDPR setIsConfirmed={setIsGdprConfirmed} />
        <UserTypeSelect
          disabled={!isGdprConfirmed}
          types={["company", "student"]}
          setType={setUserType}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <X to={"/"} />
      </div>
      <form
        autoComplete="off"
        autoCorrect="off"
        className={styles.container}
        onSubmit={handleSubmit}
      >
        <OnboardingHeader>{currentField.question}</OnboardingHeader>
        <OnboardingCard>
          {currentField.type === "map" && (
            <GeoLocation handleProperty={setOnboardingValues} />
          )}
          {currentField.type === "check" && (
            <OnboardingCheckBoxes
              handleProperty={setOnboardingValues}
              options={currentField.options}
              checkedValues={onboarding[currentField.property]}
            />
          )}
          {currentField.type === "radio" && (
            <OnboardingRadio
              options={currentField.options}
              handleProperty={setOnboardingValues}
              selectedValue={onboarding[currentField.property]}
            />
          )}
          {["text", "link"].includes(currentField.type) && (
            <OnboardingTextArea
              handleSubmit={handleSubmit}
              handleProperty={setOnboardingValues}
              propertyValue={onboarding[currentField.property]}
            />
          )}
          {currentField.type === "chip" && (
            <ChipsGrid
              isEdit
              handleProperty={setOnboardingValues}
              selectedChips={onboarding[currentField.property]}
            />
          )}
          <OnboardingFooter
            style={{ marginBottom: "16px", marginRight: "16px" }}
          >
            {!currentField.required && (
              <Button onClick={handleSkip} type="button" variant="secondary">
                Skip
              </Button>
            )}
            <Button square type="submit">
              <ArrowRight size={24} />
            </Button>
          </OnboardingFooter>
        </OnboardingCard>
      </form>
    </div>
  );
}
