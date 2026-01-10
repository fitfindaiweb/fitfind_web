import HeroSection from "@/components/HeroSection";
import { BaseURL } from "@/config/apiUrl";
import parse from "html-react-parser";
import { Container } from "react-bootstrap";
import { notFound } from "next/navigation";
import classes from "./PrivacyPolicy.module.css";

const getPrivacyPolicyCmsData = async () => {
  try {
    const response = await fetch(BaseURL("cms/page/privacyPolicy"), {
      cache: "no-store",
    });
    const responseData = await response.json();
    return {
      privacyData: responseData?.privacyPolicy,
    };
  } catch (error) {
    notFound();
  }
};

export default async function PrivacyPolicyPage() {
  const { privacyData } = await getPrivacyPolicyCmsData();
  return (
    <div>
      <HeroSection data={privacyData} />

      <Container className="py-5">
        <div className={classes.privacyPolicyContent}>
          {privacyData?.description && parse(privacyData?.description)}
        </div>
      </Container>
    </div>
  );
}
