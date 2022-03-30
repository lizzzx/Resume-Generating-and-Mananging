import React, { createContext, useContext, useState } from "react";
import AlertDialog from "../components/AlertDialog";

const AlertDialogContext = createContext({});

export function useAlertDialog() {
  return useContext(AlertDialogContext);
}

export const AlertDialogProvider = ({ children }) => {
  const [title, setTitle] = useState("Title");
  const [context, setContext] = useState("Context");
  const [confirmText, setConfirmText] = useState("Confirm");
  const [closeText, setCloseText] = useState("Close");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);

  function onClose() {
    setDialogOpen(false);
  }

  function onConfirm() {
    if (typeof confirmCallback === "function") {
      confirmCallback();
    }
    setDialogOpen(false);
    setConfirmCallback(null);
    setTitle("Title");
    setContext("Context");
    setConfirmText("Confirm");
    setCloseText("Close");
  }

  return (
    <AlertDialogContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
        setTitle,
        setContext,
        setConfirmText,
        setCloseText,
        setConfirmCallback
      }}
    >
      {children}
      <AlertDialog
        title={title}
        text={context}
        open={dialogOpen}
        confirmText={confirmText}
        closeText={closeText}
        onClose={onClose}
        onComfirm={onConfirm}
      />
    </AlertDialogContext.Provider>
  );
};
