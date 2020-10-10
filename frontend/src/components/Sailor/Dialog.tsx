import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { doCloseSailorDialog } from "../../redux/actions/sailors";
import {
  selectSelectedSailor,
  selectSailorIsDialogOpen,
} from "../../redux/selectors/sailors";

// Mui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// Custom Components
import SailorForm from "./Form";

const SailorDialog = (props: any) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSailorIsDialogOpen);
  const selectedSailor = useSelector(selectSelectedSailor);

  const handleClose = () => dispatch(doCloseSailorDialog());

  return (
    <Dialog onClose={handleClose} aria-labelledby="sailor-dialog" open={isOpen}>
      <DialogTitle id="sailor-dialog">
        {selectedSailor ? "Update" : "Add"} Sailor
      </DialogTitle>
      <DialogContent>
        <SailorForm />
      </DialogContent>
    </Dialog>
  );
};

export default SailorDialog;
