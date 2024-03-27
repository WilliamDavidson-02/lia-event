import React, { useState } from "react";
import styles from "../GDPRconfirm/GDPRconfirm.module.css";
import { ArrowRight } from "lucide-react";

export default function GDPRconfirm() {
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = (event) => {
    setConfirm(event.target.checked);
    //console.log(event.target.checked);
  };
  return (
    <div className={styles.container}>
      <img alt="GDPR-logo" src="GDPR_logo.svg" />
      <h3>GDPR</h3>
      <p>Vi informerar dig om vår hantering av personuppgifter enligt GDPR (artikel 13)</p>
      <a
        href="https://gdpr.eu/wp-content/uploads/2019/01/Our-Company-Privacy-Policy.pdf"
        target="_blank"
        className={styles.readMore}>
        <p>Läs mer</p>
        <ArrowRight />
      </a>
      <label key={"confirmGDPR"}>
        <input className="checkbox" type="checkbox" checked={confirm} onChange={handleConfirm} />
        <p>{"Härmed godkänner jag GDPR"}</p>
      </label>
    </div>
  );
}
