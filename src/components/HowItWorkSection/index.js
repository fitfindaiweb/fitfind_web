import InfoCard from "@/components/InfoCard";
import { imageUrl } from "@/config/apiUrl";
import Image from "next/image";
import { Container } from "react-bootstrap";
import SectionHeader from "../SectionHeader";
import classes from "./HowItWorkSection.module.css";

export default function HowItWorkSection({ data }) {
  return (
    <div className={classes.howItWorkSection}>
      <Container>
        <div className={classes.contentWrapper}>
          <SectionHeader
            subTitle={data?.title || "How It Works"}
            title={
              data?.heading || "Effortless Styling with AI-Powered Fitting"
            }
            description={
              data?.description ||
              "Try on outfits virtually with our AI-powered fitting room. Upload your image and see how different styles look on you, stress-free!"
            }
          />

          <div className={classes.gridContainer}>
            <div className={classes.phoneContainer}>
              <div className={classes.phoneWrapper}>
                <Image src={imageUrl(data?.image)} alt="FitFind App" fill />
              </div>
            </div>

            {data?.cards?.map((card) => (
              <div key={card.id} className={classes.infoCardWrapper}>
                <InfoCard data={card} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
