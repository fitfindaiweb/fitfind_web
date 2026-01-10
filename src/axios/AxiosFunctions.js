import { handleSignOut } from "@/helper/HelperFunction";
import store from "@/store";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const getHeaders = (accessToken) => ({
  Accept: "application/json",
  Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  "ngrok-skip-browser-warning": "69420",
  "timezone-offset": moment().utcOffset(),
});

const handleError = (error, showAlert, isDispatch) => {
  let errorMessage = "";
  if (Array.isArray(error?.response?.data?.message?.error)) {
    error?.response?.data?.message?.error?.forEach(
      (item) => (errorMessage += ` • ${item} \n`)
    );
  } else {
    errorMessage = error?.response?.data?.message?.error;
  }

  if (error.response?.status === 401 && isDispatch) {
    const dispatch = store.dispatch;
    toast.error(
      "Your session has either expired or your account is inactive. Please log in again to continue.",
      {
        position: "top-center",
      }
    );
    handleSignOut(dispatch);
  }

  if (showAlert) {
    const message =
      error.message === "Network Error"
        ? `${error.message} : Please Check Your Network Connection`
        : errorMessage;
    toast.error(message, { position: "top-center" });
  }
};

export const Get = async (route, accessToken, showAlert = true, dispatch) => {
  const options = { headers: getHeaders(accessToken) };
  try {
    const response = await axios.get(route, options);
    return response;
  } catch (error) {
    handleError(error, showAlert, dispatch);
  }
};

const apiRequest = async (
  method,
  route,
  data,
  { headers },
  showAlert,
  dispatch
) => {
  const options = {
    method,
    url: route,
    ...(data && { data }),
    headers,
  };
  try {
    return await axios(options);
  } catch (error) {
    handleError(error, showAlert, dispatch);
  }
};

export const Post = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("post", route, data, apiHeaders, showAlert, dispatch);
};

export const Patch = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("patch", route, data, apiHeaders, showAlert, dispatch);
};

export const Put = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("put", route, data, apiHeaders, showAlert, dispatch);
};

export const Delete = (route, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("delete", route, null, apiHeaders, showAlert, dispatch);
};
