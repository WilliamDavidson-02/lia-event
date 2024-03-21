import React, { cloneElement } from "react";
import styles from "./OnboardingHeader.module.css";

function OnboardingHeader({ header }) {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
}

export default OnboardingHeader;
