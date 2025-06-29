// ModalContext.js
import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("Are you sure?");
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  const showModal = (text, action) => {
    setModalText(text);
    setConfirmAction(() => action);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <Dialog  maxWidth="xs"
      fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            onClick={() => {
              confirmAction();
              closeModal();
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
