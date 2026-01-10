import { imageUrl } from "@/config/apiUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCaretBackOutline, IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import LanguageSwitcher from "../LanguageSwitch";
import Classes from "./AfterLoginHeader.module.css";

export const AfterLoginHeader = ({ header, drawerBtn, lang }) => {
  const { user } = useSelector((state) => state?.authReducer);
  const { unReadNotificationCount } = useSelector(
    (state) => state.commonReducer
  );
  const router = useRouter();

  return (
    <div className={Classes.loginHeader}>
      <div className={Classes.navbarContainer}>
        {drawerBtn && drawerBtn}
        <div className={Classes.mainHeader}>
          {false && (
            <div className={Classes.backBtn} onClick={() => router.back()}>
              <IoCaretBackOutline />
            </div>
          )}
          {header && <h1 className={Classes.heading}>{header}</h1>}
        </div>
        <div className={Classes.switch_container}>
          <LanguageSwitcher lang={lang} />
        </div>
        <div
          className={Classes.notification_header}
          onClick={() => router.push("/notifications")}
        >
          {unReadNotificationCount > 0 && (
            <p>
              {unReadNotificationCount > 9 ? "9+" : unReadNotificationCount}
            </p>
          )}
          <IoNotificationsOutline />
        </div>
        <div className={`${[Classes.profileImg]} `}>
          <Image
            src={imageUrl(user?.photo)}
            alt="profile"
            width={45}
            height={45}
          />
        </div>
      </div>
    </div>
  );
};
