import { CookiesKey, CURRENCY } from "@/constant/constants";
import { signOutRequest } from "@/store/auth/authSlice";
import { saveUnReadNotification } from "@/store/common/commonSlice";
import classNames from "classnames";
import Cookies from "js-cookie";
import moment from "moment";

export const apiHeader = (token, isFormData) => {
  const headers = {
    "ngrok-skip-browser-warning": "69420",
    "timezone-offset": moment().utcOffset(),
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { headers };
};

export const handleSignOut = (dispatch, router) => {
  dispatch(signOutRequest());
  dispatch(saveUnReadNotification(0));
  Cookies.remove(CookiesKey?.accessToken);
  Cookies.remove(CookiesKey?.userStatus);
  Cookies.remove(CookiesKey?.userRole);
  if (router) {
    router.replace("/");
  } else {
    window.location.href = "/";
  }
};

export const formatNumber = (num) => {
  if (num % 1 === 0) {
    return `${CURRENCY}${num?.toLocaleString()}`;
  } else {
    return `${CURRENCY}${num?.toFixed(2)?.toLocaleString()}`;
  }
};
export const formatNumberWithCurrency = (num) => {
  if (num % 1 === 0) {
    return `${num?.toLocaleString()}`;
  } else {
    return `${num?.toFixed(2)?.toLocaleString()}`;
  }
};

export const cn = (...args) => classNames(...args);

export const formatDate = (date) => {
  const formattedDate = moment(date);
  return formattedDate.format("MM/DD/YYYY");
};

// Map routes to hash IDs for scrolling
const routeToHashMap = {
  "/": "home",
  "/how-it-works": "how-it-works",
  "/why-choose-find-fit": "why-choose-find-fit",
  "/get-the-app": "get-the-app",
};

// Function to scroll to a hash section
export const scrollToHash = (hash, behavior = "smooth") => {
  if (!hash) return;

  const hashId = hash.startsWith("#") ? hash.slice(1) : hash;

  setTimeout(() => {
    const element = document.getElementById(hashId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: behavior,
      });
    }
  }, 100);
};

export const handleHashNavigation = (router, path, pathname) => {
  const hash = routeToHashMap[path];

  if (!hash) {
    router.push(path);
    return;
  }

  if (pathname === "/") {
    window.history.pushState(null, "", `/#${hash}`);
    scrollToHash(hash);
  } else {
    router.push(`/#${hash}`);
    setTimeout(() => {
      scrollToHash(hash);
    }, 500);
  }
};
