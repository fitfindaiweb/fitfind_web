"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import Logo from "@/components/Logo";
import { Container } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import { usePathname, useRouter } from "next/navigation";
import {
  handleHashNavigation,
  extractNetworkName,
} from "@/helper/HelperFunction";
import { useSelector } from "react-redux";

export default function Footer() {
  const { footerData } = useSelector((state) => state.commonReducer);
  const pathname = usePathname();
  const router = useRouter();
  const isSubscription = pathname === "/subscription";
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Why Choose FItFindAI?", href: "/why-choose-find-fit" },
    { name: "Get the App", href: "/get-the-app" },
  ];

  return (
    <footer
      className={styles.footer}
      style={{ display: isSubscription ? "none" : "block" }}
    >
      <Container>
        <div className={styles.footerContent}>
          <div className={styles.leftSection}>
            <div className={styles.logo}>
              <Logo variant="dark" />
            </div>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{footerData?.description}</p>
              <div className={styles.socialIcons}>
                {footerData?.socials?.map((item, index) => {
                  return (
                    <SocialIcon
                      key={index}
                      url={item}
                      style={{ height: 40, width: 40 }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <h3 className={styles.linksHeading}>Links</h3>
            <div className={styles.links}>
              {quickLinks?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleHashNavigation(router, item.href, pathname);
                  }}
                  className={styles.link}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.copyright}>
        <Container>
          <div className={styles.copyrightContent}>
            <p>
              {footerData?.copyrightText || "2025 FitFind, All right reserved"}
            </p>
            <div className={styles.copyrightLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-condition">Terms & Conditions</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
