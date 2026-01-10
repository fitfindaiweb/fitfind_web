import React from "react";
import { toast } from "react-toastify";

const RenderToast = ({ type = "", message = "", position = "top-right" }) => {
  // Generate a unique toast ID
  const toastId = "Error_Render_Toast";
  if (!type || !message) return null;
  const showToast = () => {
    return toast[type](message, {
      toastId: toastId,
      position: position,
    });
  };

  return (
    <div>
      {toast.isActive(toastId)
        ? toast.update(toastId, {
            render: message,
            type: type,
          })
        : showToast()}
    </div>
  );
};

export default RenderToast;
