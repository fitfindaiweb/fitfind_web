import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import classes from "./HeroSection.module.css";

export default function HeroSection({ data }) {
  return (
    <div className={classes.homeHeroSection}>
      <Container>
        <div className={classes.homeHeroSectionContent}>
          <h1>{data?.title || data?.hero_title || "Privacy Policy"}</h1>
        </div>
      </Container>
    </div>
  );
}
