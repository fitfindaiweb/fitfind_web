import { FaCamera, FaLightbulb, FaShoppingCart } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Md3dRotation } from "react-icons/md";

export const landingPageData = {
  heroSection: {
    title: "Unleash Your Perfect Style Effortlessly",
    description:
      "Find your perfect look with AI-powered virtual try-ons and personalized style recommendations.",
    image: "/images/home_hero_img.png",
  },
  howItWorksSection: {
    title: "How It Works",
    heading: "Effortless Styling with AI-Powered Fitting",
    description:
      "Find your perfect look with AI-powered virtual try-ons and personalized style recommendations.",
    image: "/images/app-phone.png",
    cards: [
      {
        id: 1,
        icon: <FaCamera />,
        title: "Upload Your Photo",
        description:
          "Easily upload a clear photo of yourself, and let our app get to work on creating your perfect virtual fit.",
      },
      {
        id: 2,
        icon: <Md3dRotation />,
        title: "Virtual Try-On",
        description:
          "See how different outfits look on you with our AI-powered fitting room and get the perfect match instantly.",
      },
      {
        id: 3,
        icon: <HiSparkles />,
        title: "AI-Powered Outfit Preview",
        description:
          "Instantly visualize how various styles fit you with our intelligent virtual fitting room and find your ideal look.",
      },
      {
        id: 4,
        icon: <FaShoppingCart />,
        title: "Shop Instantly",
        description:
          "Once you find your perfect style, purchase your favorite items directly from the app with just a few taps.",
      },
      {
        id: 5,
        icon: <FaLightbulb />,
        title: "Personalized Recommendations",
        description:
          "Receive outfit suggestions based on your preferences and trends, making your shopping experience effortless.",
      },
    ],
  },
  mainFeaturesSection: {
    heading: "Explore Product Details",
    description:
      "View product details, including descriptions, reviews, and size options. Find your perfect fit and shop with confidence.",
    sideImage: "/images/product-mob.png",
    MainImage: "/images/product-img.png",
    tag: true,
    tagType: "product",
  },
  companionSection: {
    title: "Why Choose Find Fit?",
    description:
      "Find Fit offers more than just clothing recommendations. It's your personal fashion assistant:",
    cards: [
      {
        title: "Tailored Fit",
        icon: "/images/shirt.png",
        description:
          "Get recommendations based on your body type and personal style.",
        image: "/images/slider_img_1.png",
      },
      {
        title: "Bitmoji Integration",
        icon: "/images/user.png",
        description:
          "Create and customize your own Bitmoji avatar to see how outfits look on a virtual version of you.",
        image: "/images/slider_img_2.png",
      },
      {
        title: "Save and Compare Favorites",
        icon: "/images/heart.png",
        description:
          "Save your favorite items and compare them later to find the perfect fit.",
        image: "/images/slider_img_3.png",
      },
      {
        title: "Tailored Fit",
        icon: "/images/shirt.png",
        description:
          "Get recommendations based on your body type and personal style.",
        image: "/images/slider_img_1.png",
      },
      {
        title: "Bitmoji Integration",
        icon: "/images/user.png",
        description:
          "Create and customize your own Bitmoji avatar to see how outfits look on a virtual version of you.",
        image: "/images/slider_img_2.png",
      },
      {
        title: "Save and Compare Favorites",
        icon: "/images/heart.png",
        description:
          "Save your favorite items and compare them later to find the perfect fit.",
        image: "/images/slider_img_3.png",
      },
    ],
  },

  getTheAppSection: {
    title: "Get the App Today!",
    description:
      "Download Find Fit today and start your journey to effortless style with AI-powered virtual try-ons and personalized recommendations.",
    appDownloadLink: "https://your-app-download-link.com",
    appStoreLink: "https://your-app-store-link.com",
    googlePlayLink: "https://your-google-play-link.com",
    qrCode: "/images/qr-code.png",
    qrCodeText: "Scan QR Code to Download",
    phoneImage: "/images/app-phone.png",
  },
};
