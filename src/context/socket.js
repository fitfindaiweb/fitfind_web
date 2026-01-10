// WebSocketContext.js
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { apiUrl } from "../config/apiUrl";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/helper/HelperFunction";
import { updateUser } from "@/store/auth/authSlice";
import { saveUnReadNotification } from "@/store/common/commonSlice";
import Cookies from "js-cookie";
import { CookiesKey } from "@/constant/constants";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const {
    access_token: accessToken,
    isLogin,
    user,
  } = useSelector((state) => state.authReducer);
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    socketRef.current = io(apiUrl, {
      transports: ["websocket"],
      //   try to reconnect if connection is lost
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0,
    });

    if (isLogin) {
      // join the user to the socket
      socketRef.current.emit("join", { id: user?._id });
      //  new notification
      socketRef.current.on("new-notification", ({ unreadCount }) => {
        dispatch(saveUnReadNotification(unreadCount));
      });
      // user deactivation
      socketRef.current.on("user-deactivated", () => {
        handleSignOut(dispatch, router);
        router.replace("/");
      });
      // user updated
      socketRef.current.on("updated-user", (user) => {
        // if (user) {
        //   dispatch(updateUser(user));
        // }
      });
    }

    // Cleanup on unmount
    return () => {
      socketRef.current.off("new-notification");
      socketRef.current.off("user-deactivated");
      socketRef.current.off("updated-user");
      socketRef.current.disconnect();
    };
  }, [accessToken, user, isLogin]);

  return (
    <WebSocketContext.Provider value={socketRef}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
