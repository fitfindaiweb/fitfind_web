import React from "react";
import classes from "./InfoCard.module.css";
import Image from "next/image";
import { imageUrl } from "@/config/apiUrl";

export default function InfoCard({ data }) {
  return (
    <div className={classes.infoCard}>
      <div className={classes.iconWrapper}>
        <Image src={imageUrl(data?.image)} alt="icon" width={30} height={30} />
      </div>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>
    </div>
  );
}
