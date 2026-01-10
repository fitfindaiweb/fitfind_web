"use client";
import Image from "next/image";
import styles from "./Logo.module.css";
import { usePathname } from "next/navigation";

export default function Logo({ variant = "dark" }) {
  const pathname = usePathname();
  const isSubscription = pathname === "/subscription";
  return (
    <div className={styles.logo}>
      <Image
        src={
          isSubscription
            ? "/images/logo_fit_find.png"
            : variant === "dark"
            ? "/images/logo.png"
            : "/images/Logo_White.png"
        }
        alt="Spot Logo"
        unoptimized={true}
        quality={100}
        layout="fill"
      />
    </div>
  );
}
