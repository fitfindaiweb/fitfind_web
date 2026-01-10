"use-client";
import { isMobileViewHook } from "@/customHooks/isMobileViewHook";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaMobileAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button } from "../Core/Button";
import Logo from "../Logo";
import Style from "./DesktopHeader.module.css";
import { handleHashNavigation } from "@/helper/HelperFunction";

const DesktopHeader = ({ links, variant, isSticky }) => {
  const { isLogin } = useSelector((state) => state?.authReducer);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSubscription = pathname === "/subscription";

  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
  }, []);
  useEffect(() => {
    if (isMobile) {
    }
  }, [isMobile]);

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${[Style.header].join(" ")}`}
      >
        <div className={Style.main_logo_main} onClick={() => router.push("/")}>
          <Logo variant={"dark"} />
        </div>
        {!isSubscription && (
          <Nav gap={5} className={Style.nav}>
            <div className={Style.navLinksContainer}>
              {links[isLogin ? "loggedIn" : "loggedOut"]?.map((item, index) =>
                item?.submenu ? (
                  <div className={Style.menuWithDropdown} key={index}>
                    <span
                      className={`${Style.nabarLinks} ${
                        variant && Style.secondaryNavbarLinks
                      }`}
                    >
                      {item?.label}
                      <FaChevronDown size={12} className={Style.chevDown} />
                    </span>
                    <div className={Style.dropdownMenu}>
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.value}
                          onClick={(e) => {
                            e.preventDefault();
                            handleHashNavigation(
                              router,
                              subItem.value,
                              pathname
                            );
                          }}
                          className={Style.dropdownItem}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item?.value}
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashNavigation(router, item?.value, pathname);
                    }}
                    className={`${Style.nabarLinks} ${
                      variant && Style.secondaryNavbarLinks
                    } ${!isSticky && Style.stickyLinks}`}
                  >
                    {item?.label}
                  </Link>
                )
              )}
            </div>
          </Nav>
        )}
        {!isSubscription && (
          <div className={Style.getAppButtonContainer}>
            <Button
              type="square"
              variant="gradient"
              rightIcon={<FaMobileAlt size={18} />}
              label="Get the App"
              onClick={() =>
                handleHashNavigation(router, "/get-the-app", pathname)
              }
              customStyle={{
                height: "48px",
              }}
            />
          </div>
        )}
      </Navbar>
    </Container>
  );
};

export default DesktopHeader;
