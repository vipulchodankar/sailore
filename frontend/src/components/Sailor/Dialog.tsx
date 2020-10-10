import React from "react";

// Mui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// Custom Components
import SailorForm from "./Form";

const SailorDialog = (props: any) => {
  const {
    dialog: { isOpen, sailor },
    setDialog,
  } = props;

  const handleClose = () => {
    setDialog({ isOpen: false, sailor: null });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="sailor-dialog" open={isOpen}>
      <DialogTitle id="sailor-dialog">
        {sailor ? "Update" : "Add"} Sailor
      </DialogTitle>
      <DialogContent>
        <SailorForm />
      </DialogContent>
    </Dialog>
  );
};

export default SailorDialog;
