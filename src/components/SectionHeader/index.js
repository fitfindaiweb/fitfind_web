import React from "react";
import classes from "./SectionHeader.module.css";
export default function SectionHeader({ subTitle, title, description }) {
  return (
    <div className={classes.headerSection}>
      <span>{subTitle}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
