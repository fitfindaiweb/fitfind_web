import HeroSection from "@/components/HeroSection";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import React from "react";
import { Container } from "react-bootstrap";
import classes from "./TermsAndCondition.module.css";
import { BaseURL } from "@/config/apiUrl";

const getTermsAndConditionsCmsData = async () => {
  try {
    const response = await fetch(BaseURL("cms/page/termsAndConditions"), {
      cache: "no-store",
    });
    const responseData = await response.json();
    return {
      termsData: responseData?.termsAndConditions,
    };
  } catch (error) {
    notFound();
  }
};

export default async function TermsAndConditionsPage() {
  const { termsData } = await getTermsAndConditionsCmsData();
  return (
    <div>
      <HeroSection data={termsData} />

      <Container className="py-5">
        <div className={classes.termsAndConditionsContent}>
          {termsData?.description && parse(termsData?.description)}
        </div>
      </Container>
    </div>
  );
}
