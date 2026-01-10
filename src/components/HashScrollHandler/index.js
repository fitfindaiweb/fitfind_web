"use client";
import { useEffect } from "react";
import { scrollToHash } from "@/helper/HelperFunction";

export default function HashScrollHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          scrollToHash(hash);
        }, 500);
      }
    }
  }, []);

  return null;
}
