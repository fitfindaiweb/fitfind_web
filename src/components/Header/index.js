"use client";
import { cn } from "@/helper/HelperFunction";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isMobileViewHook } from "../../customHooks/isMobileViewHook";
import DesktopHeader from "./DesktopHeader";
import classes from "./Header.module.css";
import { MobileHeader } from "./MobileHeader";

const Header = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const isSecondaryHeader =
    splitPath[1] === "profile-settings" || splitPath?.length > 2;
  const { isLogin } = useSelector((state) => state?.authReducer);
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const links = {
    loggedOut: [
      {
        label: "Home",
        value: "/",
      },
      {
        label: "How it Works",
        value: "/how-it-works",
      },
      {
        label: "Why Choose FitFindAI?",
        value: "/why-choose-find-fit",
      },
    ],
    loggedIn: [
      {
        label: "Home",
        value: "/",
      },
      {
        label: "How it Works",
        value: "/how-it-works",
      },
      {
        label: "Why Choose FitFindAI?",
        value: "/why-choose-find-fit",
      },
    ],
  };

  const HeaderButtons = [
    ...(!isLogin
      ? [
          {
            value: "",
            label: "Logout",
          },
        ]
      : []),
  ];

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 0) setSticky(true);
      else setSticky(false);
    });
    isMobileViewHook(setIsMobile, 992);
    return () => {
      document.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <header
      style={{
        ...(isSticky && {
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: isSecondaryHeader
            ? "var(--secondary-color)"
            : "var(--secondary-background)",
          borderBottom: "1px solid var(--border-color)",
        }),

        ...(!isSticky && {
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          backgroundColor:
            pathname === "/subscription" ? "#29a9ff" : "transparent",
          // borderBottom: "1px solid var(--border-color)",
        }),
        zIndex: 99,
      }}
      className={cn(classes.header, isSticky && classes.stickyClass)}
    >
      {isMobile ? (
        <MobileHeader
          links={links}
          HeaderButtons={HeaderButtons}
          variant={isSecondaryHeader}
          isSticky={isSticky}
        />
      ) : (
        <DesktopHeader
          links={links}
          HeaderButtons={HeaderButtons}
          variant={isSecondaryHeader}
          isSticky={isSticky}
        />
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  backgroundColor: PropTypes.string,
  containerClass: PropTypes.string,
  className: PropTypes.string,
  logo: PropTypes.object,
  customStyle: PropTypes.object,
};
