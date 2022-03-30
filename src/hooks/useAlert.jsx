import { useState } from "react";

export default function useAlert() {
  const alertStatus = {
    IDLE: "idle",
    SUCCESS: "success",
    FAILURE: "failure"
  };

  // State: contact
  const [alert, setAlert] = useState(alertStatus.IDLE);
  const [message, setMessage] = useState("");

  // check
  const isIdle = () => {
    return alert === alertStatus.IDLE;
  };

  const isSuccess = () => {
    return alert === alertStatus.SUCCESS;
  };

  const isFailure = () => {
    return alert === alertStatus.FAILURE;
  };

  // switch
  const switchToIdle = msg => {
    setAlert(alertStatus.IDLE);
    setMessage(msg);
  };

  const switchToSuccess = msg => {
    setAlert(alertStatus.SUCCESS);
    setMessage(msg);
  };

  const switchToFailure = msg => {
    setAlert(alertStatus.FAILURE);
    setMessage(msg);
  };

  return {
    alert,
    message,
    isIdle,
    isSuccess,
    isFailure,
    switchToIdle,
    switchToSuccess,
    switchToFailure
  };
}
