"use client";
import { useRef, useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./Carousel.module.css";
import { Button } from "../Core/Button";

export default function Carousel({
  slides,
  title,
  description,
  header,
  slidesPerView = 1,
  spaceBetween = 20,
  showNavigation = false,
  showPagination = false,
  navigationColor,
  speed,
  autoplay,
  loop,
  centeredSlides,
  textColor,
  swiperMaxWidth,
  breakpoints,
  navigationOnRight = false,
  navigationOnLeft = false,
  isCustomNavigation = false,
  navigationCentered = false,
  btnPrevClass,
  btnNextClass,
  customNavigationStyle,
  customStyle,
  customPagination,
  btnDisableClass,
}) {
  const swiperRef = useRef();
  const [swipperStatus, setSwipperStatus] = useState({
    isBeginning: false,
    isEnd: false,
  });
  const handleSlideChange = (swiper) => {
    setSwipperStatus({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <>
      {(title || description) && (
        <div className={classes.headings} style={{ "--text-color": textColor }}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}

      {header && header}
      <div
        className={`${classes.carouselWrapper} ${
          swiperMaxWidth ? classes.maxWidthEnable : ""
        } ${navigationCentered ? classes.navigationCentered : ""}`}
        style={{ "--max-width": swiperMaxWidth }}
      >
        {isCustomNavigation && !navigationCentered && (
          <div
            className={`${btnPrevClass && btnPrevClass} ${
              classes._buttonsDiv
            } ${classes._btnPrev} ${
              swipperStatus.isBeginning
                ? [
                    classes.btn_disabled,
                    btnDisableClass && btnDisableClass,
                  ].join(" ")
                : ""
            }`}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slidePrev()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronLeft size={24} />
            </Button>
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setSwipperStatus({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
          navigation={showNavigation}
          speed={speed && speed}
          autoplay={autoplay && autoplay}
          loop={loop && loop}
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={centeredSlides && centeredSlides}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  renderBullet: customPagination && customPagination,
                }
              : false
          }
          className={`${classes.carouselSwiper} ${
            showPagination ? classes.hasPagination : ""
          } ${showNavigation ? classes.hasNavigation : ""} ${
            navigationOnRight ? classes.navigationOnRight : ""
          } ${navigationOnLeft ? classes.navigationOnLeft : ""}`}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          style={{
            "--btn-color": navigationColor,
            "--disabled-btn-color": navigationColor ? "transparent" : "#C4C4C4",
            ...(navigationColor && {
              "--border": "1px solid var(--white-color)",
            }),
            ...customStyle,
          }}
          {...(breakpoints !== null && {
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: spaceBetween,
              },
              ...breakpoints,
            },
          })}
        >
          {slides?.length !== 0 &&
            Array.isArray(slides) &&
            slides?.map((item, index) => (
              <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
        </Swiper>
        {isCustomNavigation && !navigationCentered && (
          <div
            className={`${btnNextClass && btnNextClass} ${
              classes._buttonsDiv
            } ${classes._btnNext} ${
              swipperStatus.isEnd
                ? [
                    classes.btn_disabled,
                    btnDisableClass && btnDisableClass,
                  ].join(" ")
                : ""
            }`}
          >
            <Button
              className={classes.btnRef}
              onClick={() => swiperRef?.current?.slideNext()}
              customStyle={customNavigationStyle}
            >
              <MdOutlineChevronRight size={24} />
            </Button>
          </div>
        )}
        {isCustomNavigation && navigationCentered && (
          <div className={classes.centeredNavigation}>
            <div
              className={`${btnPrevClass && btnPrevClass} ${
                classes._buttonsDiv
              } ${classes._centeredBtn} ${
                swipperStatus.isBeginning
                  ? [
                      classes.btn_disabled,
                      btnDisableClass && btnDisableClass,
                    ].join(" ")
                  : ""
              }`}
            >
              <Button
                className={classes.btnRef}
                onClick={() => swiperRef?.current?.slidePrev()}
                customStyle={customNavigationStyle}
              >
                <MdOutlineChevronLeft size={24} />
              </Button>
            </div>
            <div
              className={`${btnNextClass && btnNextClass} ${
                classes._buttonsDiv
              } ${classes._centeredBtn} ${
                swipperStatus.isEnd
                  ? [
                      classes.btn_disabled,
                      btnDisableClass && btnDisableClass,
                    ].join(" ")
                  : ""
              }`}
            >
              <Button
                className={classes.btnRef}
                onClick={() => swiperRef?.current?.slideNext()}
                customStyle={customNavigationStyle}
              >
                <MdOutlineChevronRight size={24} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
