import React from "react";
import classes from "./StyleCompanionCard.module.css";
import Image from "next/image";
import { imageUrl } from "@/config/apiUrl";

export default function StyleCompanionCard({ data }) {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.icon}>
            <Image
              src={imageUrl(data?.icon) || "/images/shirt.png"}
              alt="style-companion-icon"
              width={36}
              height={36}
            />
          </div>
          <div className={classes.textContent}>
            <h3 className={classes.title}>{data?.title || "Tailored Fit"}</h3>
            <p className={classes.description}>
              {data?.description ||
                "Get recommendations based on your body type and personal style."}
            </p>
          </div>
        </div>
        <div className={classes.phoneMockups}>
          <div className={classes.phoneWrapper}>
            <Image
              src={imageUrl(data?.image) || "/images/slider_img_1.png"}
              alt="phone-mockup-1"
              width={200}
              height={400}
              className={classes.phoneImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
