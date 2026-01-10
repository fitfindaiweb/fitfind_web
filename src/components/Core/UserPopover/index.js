import { BiChevronDown, BiUser } from "react-icons/bi";
import PopperComponent from "../PopperComponent";
import classes from "./UserPopover.module.css";
import Image from "next/image";
import { imageUrl } from "@/config/apiUrl";
import { cn } from "@/helper/HelperFunction";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { HiLogout } from "react-icons/hi";
import { SlLogout } from "react-icons/sl";
import { MdLogout } from "react-icons/md";

export default function UserPopover({ user, isSticky }) {
  const handleLogout = () => {};
  return (
    <PopperComponent
      sideOffset={10}
      popperInsideElement={
        <div className={classes.list}>
          <Link className={classes.link} href="/profile-settings">
            <BiUser /> Profile Settings
          </Link>
          <span
            className={cn(classes.link, classes.logout)}
            onClick={() => handleLogout()}
          >
            <MdLogout color={"var(--danger-color)"} /> Logout
          </span>
        </div>
      }
    >
      <div className={classes.userPopover}>
        <div className={classes.userPhoto}>
          <Image
            src={user?.photo ? imageUrl(user?.photo) : "/images/profile.png"}
            alt="profile"
            width={45}
            height={45}
          />
        </div>
        <div className={classes.userInfo}>
          <p className={cn(classes.userName, !isSticky && classes.white)}>
            {user?.name || "John Doe"}
          </p>
          <p className={cn(classes.userEmail, !isSticky && classes.white)}>
            {user?.email || "johndoe@gmail.com"}
          </p>
        </div>
        <div>
          <BiChevronDown
            color={
              isSticky ? "var(--primary-text-color)" : "var(--white-color)"
            }
          />
        </div>
      </div>
    </PopperComponent>
  );
}
