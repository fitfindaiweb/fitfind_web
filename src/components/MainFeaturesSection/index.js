import { imageUrl } from "@/config/apiUrl";
import { cn } from "@/helper/HelperFunction";
import Image from "next/image";
import { Container } from "react-bootstrap";
import classes from "./MainFeaturesSection.module.css";

const MainFeaturesSection = ({ data, isReversed = false }) => {
  return (
    <Container>
      <div
        className={cn(
          classes.mainFeaturesSection,
          isReversed && classes.isReversed
        )}
      >
        <div className={classes.imageWrapper}>
          <Image
            className={classes.mainImage}
            src={imageUrl(data?.MainImage)}
            alt="MainImage"
            fill
          />
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.content}>
            <h2>{data?.heading}</h2>
            <p>{data?.description}</p>
          </div>
          <div className={classes.sideImageWrapper}>
            <Image
              className={classes.sideImage}
              src={imageUrl(data?.sideImage)}
              alt="sideImage"
              fill
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainFeaturesSection;
