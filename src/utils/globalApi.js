"use client";
import { Get } from "@/axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import { CookiesKey } from "@/constant/constants";
import { saveUserInfo } from "@/store/auth/authSlice";
import { setFooterData, setPackages } from "@/store/common/commonSlice";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GlobalApi = ({ setLoading }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const appRedirection = searchParams.get("appRedirection");
  const token = searchParams.get("token");

  useEffect(() => {
    if (appRedirection && token) {
      Cookies.set(CookiesKey?.accessToken, token, { expires: 30 });
    }
    window.history.replaceState({}, "", window.location.pathname);
  }, [appRedirection, token]);

  const getPublicData = async () => {
    const access_token = Cookies.get(CookiesKey?.accessToken);
    const meUrl = BaseURL("users/get-me");
    const [meRes, packagesRes] = await Promise.allSettled([
      access_token ? Get(meUrl, access_token, null, dispatch) : null,
      token ? Get(BaseURL("packages/all"), access_token, null, dispatch) : null,
    ]);

    if (packagesRes?.value) {
      dispatch(setPackages(packagesRes?.value?.data?.data?.packages));
    }

    if (meRes?.value) {
      const UserRes = meRes?.value?.data?.data;
      dispatch(saveUserInfo(UserRes));
      Cookies.set(CookiesKey?.userStatus, UserRes?.active, {
        expires: 30,
      });
      Cookies.set(CookiesKey?.userRole, UserRes?.role?.name, {
        expires: 30,
      });
    }
  };
  const handleGetFooterData = async () => {
    const footerUrl = BaseURL("cms/page/footer");
    const footerRes = await Get(footerUrl);
    if (footerRes !== undefined) {
      dispatch(setFooterData(footerRes?.data?.footer));
    }
  };
  const handleGetData = async () => {
    setLoading(true);
    await handleGetFooterData();
    setTimeout(async () => {
      await getPublicData();
    }, 500);
    setLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return <></>;
};

export default GlobalApi;
