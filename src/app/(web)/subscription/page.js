"use client";

import SubscriptionCard from "@/components/SubscriptionCard";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./Subscription.module.css";
import { useSearchParams } from "next/navigation";
import SuccessComponent from "@/components/SuccessComponent";
import NoData from "@/components/NoData/NoData";

export default function SubscriptionPage() {
  const { packages } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("success");

  return (
    <>
      <section className={classes.home}>
        <Container>
          {queryParams && <SuccessComponent query={queryParams} />}
          {!queryParams && (
            <div className={classes.subscriptionCardContainer}>
              {packages?.length > 0 ? (
                packages
                  ?.filter((item) => {
                    const currentType = userInfo?.subscriptions?.package?.type;
                    const isBasicCard = item?.type === "basic";
                    if (currentType === "basic") return true;
                    if (isBasicCard) return false;

                    return true;
                  })
                  .map((item, index) => {
                    const isCurrentSubscribed =
                      item?._id === userInfo?.subscriptions?.package?._id;

                    const isUpgrade =
                      userInfo?.subscriptions?.package?.type === "basic" &&
                      item?.type !== "basic";

                    return (
                      <SubscriptionCard
                        key={index}
                        data={item}
                        isCurrentSubscribed={isCurrentSubscribed}
                        isUpgrade={isUpgrade}
                        user={userInfo}
                      />
                    );
                  })
              ) : (
                <NoData className={classes.noData} text="No packages found" />
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
