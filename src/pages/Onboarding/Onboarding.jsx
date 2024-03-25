import { useState } from "react";
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

export default function Onboarding() {
  const [onboaring, setOnboarding] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(1);
  const [currentField, setCurrentField] = useState(onboardingMap.copmpany[currentFieldIndex]);

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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <X to={"/"} />
      </div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <OnboardingHeader>{currentField.question}</OnboardingHeader>
        <OnboardingCard>
          {/* <OnboardingRadio options={currentField.options} handleProperty={setOnboardingValues} /> */}
          <GeoLocation handleProperty={setOnboardingValues} />
          {/* <OnboardingTextArea handleSubmit={handleSubmit} handleProperty={setOnboardingValues} /> */}
          {/* <ChipsGrid isEdit handleProperty={setOnboardingValues} /> */}
          <OnboardingFooter>
            <Button square type="submit" style={{ marginBottom: "16px", marginRight: "16px" }}>
              <ArrowRight size={24} />
            </Button>
          </OnboardingFooter>
        </OnboardingCard>
      </form>
    </div>
  );
}
