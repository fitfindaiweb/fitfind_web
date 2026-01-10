"use client";

import { Patch, Post } from "@/axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import { CookiesKey } from "@/constant/constants";
import {
  apiHeader,
  cn,
  formatDate,
  formatNumberWithCurrency,
} from "@/helper/HelperFunction";
import AreYouSureModal from "@/modals/AreYouSureModal";
import { saveUserInfo } from "@/store/auth/authSlice";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Button } from "../Core/Button";
import RenderToast from "../RenderToast";
import classes from "./SubscriptionCard.module.css";

const MODAL_STATES = {
  UPGRADE: "upgrading",
  CANCEL: "cancel",
  RENEW: "renew",
};

const LOADING_STATES = {
  UPGRADE: "upgrading",
  CANCEL: "cancelling",
  RENEW: "renewing",
};

export default function SubscriptionCard({
  data,
  isUpgrade,
  isCurrentSubscribed,
  user,
}) {
  const dispatch = useDispatch();
  const access_token = Cookies.get(CookiesKey?.accessToken);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const buySubscription = async () => {
    setLoading(LOADING_STATES.UPGRADE);
    const response = await Post(
      BaseURL("users/buy-subscription"),
      { package: data?._id },
      apiHeader(access_token)
    );
    if (response !== undefined) {
      window.location.href = response?.data?.data;
    }
    setShowModal(false);
    setLoading(false);
  };

  const cancelSubscription = async () => {
    setLoading(LOADING_STATES.CANCEL);
    const response = await Patch(
      BaseURL("users/cancel-subscription"),
      null,
      apiHeader(access_token)
    );
    if (response !== undefined) {
      RenderToast({
        message: "Subscription cancelled successfully",
        type: "success",
      });
      dispatch(saveUserInfo(response?.data?.data?.user));
    }
    setShowModal(false);
    setLoading(false);
  };

  const renewSubscription = async () => {
    setLoading(LOADING_STATES.RENEW);
    const response = await Patch(
      BaseURL("users/renew-subscription"),
      null,
      apiHeader(access_token)
    );
    if (response !== undefined) {
      RenderToast({
        message: "Subscription renewed successfully",
        type: "success",
      });
      dispatch(saveUserInfo(response?.data?.data?.user));
    }
    setShowModal(false);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        classes.subscriptionCard,
        isCurrentSubscribed && classes.subscriptionCardUpgrade
      )}
    >
      <div
        className={cn(
          classes.subscriptionCardHeader,
          isCurrentSubscribed && classes.subscriptionCardHeaderUpgrade
        )}
      >
        <div className={classes.subscriptionCardTitle}>
          <h4>{data?.name}</h4>
          {isCurrentSubscribed && <FaCheckCircle size={20} />}
        </div>
        <p>
          {data?.type === "basic" ? (
            "Free"
          ) : (
            <>
              {formatNumberWithCurrency(data?.virtualPrice)}{" "}
              {data?.virtualCurrency} /{" "}
              {data?.recurringType === "month" ? "month" : "year"}
            </>
          )}
        </p>
      </div>

      <div
        className={cn(
          classes.subscriptionCardBody,
          isCurrentSubscribed && classes.subscriptionCardBodyUpgrade
        )}
      >
        {data?.features?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <div className={classes.subscriptionCardFooter}>
        {isUpgrade && data?.type !== "basic" && (
          <Button
            type="rounded"
            label={
              loading === LOADING_STATES.UPGRADE ? "Upgrading..." : "Upgrade"
            }
            variant={isCurrentSubscribed ? "white" : "primary"}
            disabled={loading}
            onClick={() => setShowModal(MODAL_STATES.UPGRADE)}
          />
        )}

        {isCurrentSubscribed &&
          user?.subscriptions?.package?.type !== "basic" &&
          user?.subscriptions?.subscription_status === "active" && (
            <Button
              type="rounded"
              label={
                loading === LOADING_STATES.CANCEL
                  ? "Cancelling..."
                  : "Cancel Subscription"
              }
              variant={isCurrentSubscribed ? "white" : "primary"}
              disabled={loading}
              onClick={() => setShowModal(MODAL_STATES.CANCEL)}
            />
          )}

        {user?.subscriptions?.subscription_status === "cancelled" && (
          <Button
            type="rounded"
            label={
              loading === LOADING_STATES.RENEW
                ? "Renewing..."
                : "Renew Subscription"
            }
            variant={isCurrentSubscribed ? "white" : "primary"}
            disabled={loading}
            onClick={() => setShowModal(MODAL_STATES.RENEW)}
          />
        )}
      </div>
      {user?.subscriptions?.subscription_status === "cancelled" && (
        <p className={classes.endDate}>
          <span> Subscription ended on: </span>
          {formatDate(user?.subscriptions?.subscription_end_date)}
        </p>
      )}

      {showModal === MODAL_STATES.UPGRADE && (
        <AreYouSureModal
          show={showModal}
          setShow={setShowModal}
          title="Upgrade Subscription"
          subTitle="Are you sure you want to upgrade this subscription?"
          onClick={buySubscription}
          isApiCall={loading === LOADING_STATES.UPGRADE}
          modalIcon={<FaCheckCircle size={45} color="var(--primary-color)" />}
        />
      )}
      {showModal === MODAL_STATES.CANCEL && (
        <AreYouSureModal
          show={showModal}
          setShow={setShowModal}
          title="Cancel Subscription"
          subTitle="Are you sure you want to cancel this subscription?"
          onClick={cancelSubscription}
          isApiCall={loading === LOADING_STATES.CANCEL}
          modalIcon={<MdCancel size={45} color="var(--primary-color)" />}
        />
      )}
      {showModal === MODAL_STATES.RENEW && (
        <AreYouSureModal
          show={showModal}
          setShow={setShowModal}
          title="Renew Subscription"
          subTitle="Are you sure you want to renew this subscription?"
          onClick={renewSubscription}
          isApiCall={loading === LOADING_STATES.RENEW}
          modalIcon={<FaCheckCircle size={45} color="var(--primary-color)" />}
        />
      )}
    </div>
  );
}
