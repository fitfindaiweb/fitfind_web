import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import classes from "./HomeHeroSection.module.css";
import { imageUrl } from "@/config/apiUrl";
import parse from "html-react-parser";
import Link from "next/link";

export default function HomeHeroSection({ data }) {
  return (
    <div className={classes.homeHeroSection}>
      {/* Decorative images positioned absolutely */}
      {/* <div className={classes.decorativeImages}>
        <Image
          src={"/images/image_1.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage1}
        />
        <Image
          src={"/images/image_2.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage2}
        />
        <Image
          src={"/images/image_3.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage3}
        />
        <Image
          src={"/images/image_4.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage4}
        />
        <Image
          src={"/images/image_5.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage5}
        />
        <Image
          src={"/images/image_6.png"}
          alt="decorative"
          width={70}
          height={70}
          className={classes.decorativeImage6}
        />
      </div> */}
      <Container>
        <div className={classes.heroWrapper}>
          <div className={classes.homeHeroSectionContent}>
            <div className={classes.heroTitle}>
              <p>{data?.tagline || "FitFind - Discover Your Perfect Look"}</p>
            </div>
            <div className={classes.heroHeading}>
              {(data?.title && parse(data?.title)) ||
                "Unleash Your Perfect Style"}{" "}
              {/* <span className={classes.highlight}>Effortlessly</span> */}
            </div>
            <p className={classes.heroDescription}>
              {data?.description ||
                "Find your perfect look with AI-powered virtual try-ons and personalized style recommendations."}
            </p>
            <div className={classes.appStoreContainer}>
              <Link href={data?.appStoreLink} target="_blank">
                <Image
                  src={"/images/app_store.png"}
                  alt="app_store"
                  width={200}
                  height={55}
                />
              </Link>
              <Link href={data?.playStoreLink} target="_blank">
                <Image
                  src={"/images/play_store.png"}
                  alt="google_play"
                  width={200}
                  height={55}
                />
              </Link>
            </div>
          </div>

          <div className={classes.heroImageContainer}>
            <Image
              src={imageUrl(data?.image)}
              alt="hero_image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
