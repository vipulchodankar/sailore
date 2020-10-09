import React from "react";

// Mui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// Custom Components
import SailorForm from "./Form";

import SailorDialogProps from "../../interfaces/SailorDialogProps";

const SailorDialog = (props: SailorDialogProps) => {
  const {
    dialog: { isOpen, sailor },
    setDialog,
    setSailors,
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
        <SailorForm
          sailor={sailor}
          setSailors={setSailors}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SailorDialog;
