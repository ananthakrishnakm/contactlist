
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";





const DeleteConfirmation = ({ open, handleModalClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleModalClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this contact?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
