import Carousel from "@/components/Carousel";
import GetTheAppSection from "@/components/GetTheAppSection";
import HomeHeroSection from "@/components/HomeHeroSection";
import HowItWorkSection from "@/components/HowItWorkSection";
import MainFeaturesSection from "@/components/MainFeaturesSection";
import SectionHeader from "@/components/SectionHeader";
import StyleCompanionCard from "@/components/StyleCompanionCard";
import { BaseURL } from "@/config/apiUrl";
import { notFound } from "next/navigation";
import { Container } from "react-bootstrap";
import classes from "./Home.module.css";

const getHomeCmsData = async () => {
  try {
    const response = await fetch(BaseURL("cms/page/home"), {
      cache: "no-store",
    });
    const responseData = await response.json();
    return {
      homeData: responseData?.home,
    };
  } catch (error) {
    notFound();
  }
};

export default async function HomePage() {
  const { homeData } = await getHomeCmsData();
  // const cmsData = landingPageData;
  const slides = homeData?.companionSection?.cards?.map((card, index) => (
    <StyleCompanionCard key={index} data={card} />
  ));

  return (
    <>
      <div id="home">
        <HomeHeroSection data={homeData?.heroSection} />
      </div>
      <div id="how-it-works">
        <HowItWorkSection data={homeData?.howItWorksSection} />
      </div>
      <MainFeaturesSection data={homeData?.mainFeaturesSection} />
      <section
        id="why-choose-find-fit"
        className={classes.styleCompanionSection}
      >
        <Container>
          <div className={classes.companionContent}>
            <SectionHeader
              subTitle={homeData?.companionSection?.title}
              title={homeData?.companionSection?.heading}
              description={homeData?.companionSection?.description}
            />
            <Carousel
              slides={slides}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={20}
              isCustomNavigation={true}
              navigationCentered={true}
              showPagination={false}
              loop={true}
            />
          </div>
        </Container>
      </section>

      <GetTheAppSection data={homeData?.getTheAppSection} />
    </>
  );
}
