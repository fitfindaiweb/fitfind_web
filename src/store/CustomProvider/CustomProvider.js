//provider.js
"use client";
import { Loader } from "@/components/Core/Loader";
import GlobalApi from "@/utils/globalApi";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "../index";

export function CustomProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <WebSocketProvider> */}
        {loading ? <Loader /> : children}
        {/* </WebSocketProvider> */}
        <GlobalApi setLoading={setLoading} />
      </PersistGate>
    </Provider>
  );
}
