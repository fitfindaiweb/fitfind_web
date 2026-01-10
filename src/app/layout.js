import "bootstrap/dist/css/bootstrap.min.css";
import "react-modern-drawer/dist/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-phone-number-input/style.css";
import "react-day-picker/style.css";
import "react-quill/dist/quill.snow.css";
import "./globals.css";
import { CustomProvider } from "@/store/CustomProvider/CustomProvider";
import { ToastContainer } from "react-toastify";
import localFont from "next/font/local";
import { cn } from "@/helper/HelperFunction";

const primary = localFont({
  src: [
    {
      path: "./fonts/neue_montreal/NeueMontreal-Regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/neue_montreal/NeueMontreal-Medium.otf",
      weight: "500",
    },
    {
      path: "./fonts/neue_montreal/NeueMontreal-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-primary",
});

const secondary = localFont({
  src: [
    {
      path: "./fonts/pp_editorial/PPEditorial-Regular.otf",
      weight: "500",
    },
    {
      path: "./fonts/pp_editorial/PPEditorial-Ultrabold.otf",
      weight: "800",
    },
  ],
  variable: "--font-secondary",
});

export const metadata = {
  title: "FitFind AI",
  description: "FitFind AI - Your Personalized Fitness Journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang={"en"}>
      <body className={cn(primary.variable, secondary.variable)}>
        <CustomProvider>
          <ToastContainer />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
