import {
  cn,
  handleHashNavigation,
  handleSignOut,
} from "@/helper/HelperFunction";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import Separator from "../Core/Separator";
import UserPopover from "../Core/UserPopover";
import Logo from "../Logo";
import classes from "./MobileHeader.module.css";

export const MobileHeader = ({ links, HeaderButtons, isSticky }) => {
  const { user, isLogin } = useSelector((state) => state?.authReducer);
  const { unreadNotification } = useSelector((state) => state?.commonReducer);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    if (!isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  };

  return (
    <>
      <Container>
        <div className={classes.header}>
          <div
            className={classes.imageContainer}
            onClick={() => router.push("/")}
          >
            <Logo variant={"dark"} />
          </div>
          <div className={classes.actions}>
            {isLogin && (
              <>
                <span
                  className={cn(
                    classes.notificationIcon,
                    isSticky && classes.sticky
                  )}
                  onClick={() => {
                    router.push("/notifications");
                  }}
                >
                  {unreadNotification > 0 && (
                    <div className={classes.unreadNotification}>
                      {unreadNotification > 9 ? "9+" : unreadNotification}
                    </div>
                  )}
                  <IoMdNotificationsOutline
                    color={
                      isSticky
                        ? "var(--white-color)"
                        : "var(--primary-text-color)"
                    }
                    size={28}
                    onClick={() => router.push("/notifications")}
                  />
                </span>
                <Separator />
                <UserPopover user={user} isSticky={isSticky} />
              </>
            )}
            {pathname !== "/subscription" && (
              <RxHamburgerMenu
                size={28}
                onClick={() => {
                  toggleDrawer();
                }}
                color={"var(--main-color)"}
              />
            )}
          </div>
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className={classes.drawer}
          overlayClassName={classes.overlay}
        >
          <div>
            <div className={classes.drawerUserSection}>
              <div className={classes.drawerUserImage}>
                <Logo />
              </div>
            </div>
            <div className={classes.drawerList}>
              <>
                {links[isLogin ? "loggedIn" : "loggedOut"]?.map(
                  (item, index) => (
                    <RenderListItem
                      key={index}
                      icon={item?.icon && item?.icon}
                      text={item?.label}
                      path={item?.value}
                      subMenu={item?.submenu}
                      onClick={item?.onClick}
                    />
                  )
                )}
                <hr
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    borderTop: `1px solid var("--border-color")`,
                  }}
                />
                {HeaderButtons?.filter((el) => !el?.component)?.map(
                  (item, index) => (
                    <RenderListItem
                      key={index}
                      icon={item?.icon && item?.icon}
                      text={item?.label}
                      path={item?.value}
                      onClick={item?.onClick}
                      subMenu={item?.submenu}
                    />
                  )
                )}
                {isLogin && (
                  <>
                    <RenderListItem text={"Logout"} path={"logout"} />
                  </>
                )}
              </>
            </div>
          </div>
        </Drawer>
      </Container>
    </>
  );
};

const RenderListItem = ({
  icon,
  text,
  customClass,
  path,
  onClick,
  subMenu,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const handleLanguageChange = (val) => {};

  const logout = () => {
    // handleSignOut(dispatch, router);
    router.replace("/");
  };

  return (
    <>
      <div
        className={[
          classes.listItem,
          customClass,
          pathname == path && classes.activeItem,
        ].join(" ")}
        onClick={() => {
          if (subMenu) {
            setIsOpen((prev) => !prev);
            return;
          }
          if (onClick) {
            onClick(text);
            return;
          }
          if (path.toLowerCase() == "logout") {
            logout();
          } else {
            handleHashNavigation(router, path, pathname);
          }
        }}
      >
        {icon}
        <span className={classes.listItemText}>
          {text}
          {subMenu ? (
            isOpen ? (
              <span className={classes.icon}>
                <FaChevronUp size={12} />
              </span>
            ) : (
              <span className={classes.icon}>
                <FaChevronDown size={12} />
              </span>
            )
          ) : (
            ""
          )}
        </span>
      </div>
      {isOpen && (
        <div className={classes.subMenu}>
          {subMenu?.map((link, index) => (
            <div
              onClick={() => handleLanguageChange(link)}
              className={classes.subMenuItem}
              key={index}
            >
              <p>{link?.label}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
