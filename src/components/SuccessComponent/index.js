"use client";

import React from "react";
import styles from "./SuccessComponent.module.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "../Core/Button";
import { useRouter } from "next/navigation";

export default function SuccessComponent({ query }) {
  const isSuccess = query === "true";
  const router = useRouter();

  return (
    <div
      className={`${styles.successWrapper} ${
        isSuccess ? styles.success : styles.failure
      }`}
    >
      {isSuccess ? (
        <FaCheckCircle className={styles.icon} />
      ) : (
        <FaTimesCircle className={`${styles.icon} ${styles.failureIcon}`} />
      )}
      <h1 className={styles.heading}>
        {isSuccess ? "Payment Successful" : "Payment Failed"}
      </h1>
      <p className={styles.message}>
        {isSuccess
          ? "Thank you for your purchase!"
          : "Something went wrong. Please try again."}
      </p>
      <Button
        className="mt-3"
        label={"Go to Home"}
        onClick={() => router.push("/")}
        variant="secondary"
      />
    </div>
  );
}
