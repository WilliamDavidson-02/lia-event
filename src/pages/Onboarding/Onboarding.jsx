import { useState } from "react";

import X from "../../components/X/X";
import Button from "../../components/Button/Button";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import OnboardingCard from "../../components/OnboardingCard/OnboardingCard";
import styles from "./Onboarding.module.css";
import OnboardingTextArea from "../../components/OnboardingTextArea/OnboardingTextArea";
import onboardingMap from "../../lib/onboardingMap.json";
import ChipsGrid from "../../components/ChipsGrid/ChipsGrid";

export default function Onboarding() {
  const [onboaring, setOnboarding] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentField, setCurrentField] = useState(
    onboardingMap.copmpany[currentFieldIndex]
  );

  const setOnboardingValues = (value) => {
    const property = currentField.property;

    setOnboarding((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    console.log(onboaring);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <X />
      </div>
      <form onSubmit={handleSubmit}>
        <OnboardingHeader>
          <h1>{currentField.question}</h1>
        </OnboardingHeader>
        <OnboardingCard>
          {/* <OnboardingTextArea
            handleSubmit={handleSubmit}
            handleProperty={setOnboardingValues}
          /> */}
          <ChipsGrid isEdit handleProperty={setOnboardingValues} />
          <Button type="submit" variant="continue">
            Continue
          </Button>
        </OnboardingCard>
      </form>
    </div>
  );
}
