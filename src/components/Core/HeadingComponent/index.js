import React from "react";
import classes from "./HeadingComponent.module.css";

export default function HeadingComponent({ heading, isBottomLine = false }) {
  return (
    <div>
      <h2 className={classes.heading}>{heading}</h2>
      {isBottomLine && <hr className={classes.bottomLine} />}
    </div>
  );
}
