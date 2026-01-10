"use client";
import { useMediaQuery } from "@/customHooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import QRCode from "react-qr-code";
import classes from "./GetTheAppSection.module.css";
import { imageUrl } from "@/config/apiUrl";

export default function GetTheAppSection({ data }) {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const getQRCodeSize = () => {
    if (isMobile) return 110;
    if (isTablet) return 130;
    return 150;
  };

  return (
    <div className={classes.getTheAppMain}>
      <Container id="get-the-app">
        <div className={classes.getTheAppSection}>
          <div className={classes.getTheAppSectionContent}>
            <div className={classes.getTheAppSectionLeft}>
              <div className={classes.getTheAppSectionHeader}>
                <h2>{data?.title}</h2>
                <p>{data?.description}</p>
              </div>

              <div className={classes.getTheAppSectionDownload}>
                <p className={classes.downloadSubtitle}>
                  Download from App store
                </p>
                <div className={classes.getTheAppSectionDownloadButtons}>
                  <Link href={data?.appStoreLink} target="_blank">
                    <Image
                      src="/images/app_store.png"
                      alt="App Store"
                      width={180}
                      height={53}
                      className={classes.appStoreButton}
                    />
                  </Link>
                  <Link href={data?.googlePlayLink} target="_blank">
                    <Image
                      src="/images/play_store.png"
                      alt="Play Store"
                      width={180}
                      height={53}
                      className={classes.googlePlayButton}
                    />
                  </Link>
                </div>

                <div className={classes.orDivider}>
                  <div className={classes.dividerLine}></div>
                  <span className={classes.orText}>Or</span>
                  <div className={classes.dividerLine}></div>
                </div>

                <div className={classes.qrCodeSection}>
                  <div className={classes.qrCodeWrapper}>
                    <QRCode
                      value={data?.qrCode}
                      size={getQRCodeSize()}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="M"
                    />
                  </div>
                  <p className={classes.qrCodeText}>{data?.qrCodeText}</p>
                </div>
              </div>
            </div>
            <div className={classes.getTheAppSectionRight}>
              <Image
                src={imageUrl(data?.phoneImage)}
                alt="Get the App"
                width={360}
                height={700}
                className={classes.phoneImage}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
