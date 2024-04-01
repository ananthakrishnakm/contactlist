
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContact,
  getContacts,
  postContacts,
  succesmodal,
} from "../redux/contactslice";
import { Success } from "./Success";

const EditContact = ({ open, handleModalClose, contact }) => {
  console.log(contact, "contact");
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.contacts);

  const [isModalOpen, setModalOpen] = useState(open);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false); 
  const [isActionSuccessful, setActionSuccessful] = useState(false); 

  const [editedContact, setEditedContact] = useState({ ...contact });
  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const handleUpdateContact = async () => {
    const isValid = validateInputFields();

    if (isValid) {
      try {
        if (contact) {
          await dispatch(updateContact(editedContact));
         ;
        } else {
          await dispatch(postContacts(editedContact));
        }
        await dispatch(succesmodal(true));
        await setSuccessModalOpen(true);
        dispatch(getContacts({ page: 1, limit: 3, search: searchQuery }));
        setActionSuccessful(true); 
        handleModalClose()
      } catch (error) {
        console.error(
          contact ? "Error updating contact:" : "Error creating contact:",
          error
        );
      }
    }
  };

  const validateInputFields = () => {
    const { name, email, phone } = editedContact;
    let isValid = true;
    const errors = {};

    if (!name.trim()) {
      errors.name = true;
      isValid = false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      errors.email = true;
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = true;
      isValid = false;
    }

    setValidationError(errors);
    return isValid;
  };

  const handleInputChange = (field) => (event) => {
    setEditedContact({ ...editedContact, [field]: event.target.value });
    setValidationError({ ...validationError, [field]: false });
  };

  const handleModalCloseInternal = () => {
    setModalOpen(false);
    handleModalClose();
  };

  const handleSuccessModalClose = () => {
    dispatch(succesmodal(false)); 
    setSuccessModalOpen(false); 
    setActionSuccessful(false); 
  };
  console.log(isSuccessModalOpen, "isSuccessModalOpen");

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleModalCloseInternal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {contact ? (
            <Typography id="modal-title" variant="h6" component="h2">
              Edit Contact
            </Typography>
          ) : (
            <Typography id="modal-title" variant="h6" component="h2">
              Create Contact
            </Typography>
          )}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editedContact.name}
            onChange={handleInputChange("name")}
            error={validationError.name}
            helperText={validationError.name ? "Name is required" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={editedContact.email}
            onChange={handleInputChange("email")}
            error={validationError.email}
            helperText={validationError.email ? "Invalid email format" : ""}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={editedContact.phone}
            onChange={handleInputChange("phone")}
            error={validationError.phone}
            helperText={validationError.phone ? "Invalid phone number" : ""}
            sx={{ mt: 2 }}
          />
          {contact ? (
            <Button
              onClick={handleUpdateContact}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              style={{ backgroundColor: "green" }}
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={handleUpdateContact}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              style={{ backgroundColor: "green" }}
            >
              Create
            </Button>
          )}
        </Box>
      </Modal>
      {isSuccessModalOpen && (
        <Success isOpen={isSuccessModalOpen} handleClose={handleSuccessModalClose} />
      )}
      
    </>
  );
};

export default EditContact;
