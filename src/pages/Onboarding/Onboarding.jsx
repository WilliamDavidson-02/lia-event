import React from "react";

import X from "../../components/X/X";
import Button from "../../components/Button/Button";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import OnboardingCard from "../../components/OnboardingCard/OnboardingCard";
import styles from "./Onboarding.module.css";

export default function Onboarding() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <X />
      </div>
      <div className="content">
        <OnboardingHeader header={"What expertise are you seeking?"} />
        <OnboardingCard>
          Content
          <Button type={"previous"}>Previous</Button>
          <Button>Continue</Button>
          <Button type={"skip"}>Skip</Button>
        </OnboardingCard>
      </div>
    </div>
  );
}
