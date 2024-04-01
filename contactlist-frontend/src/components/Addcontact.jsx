import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { postContacts, getContacts } from "../redux/contactslice";
import EditContact from "./Editcontact";


const Addcontact = () => {
  const dispatch = useDispatch();
  const { searchQuery, currentPage, limit } = useSelector(
    (state) => state.contacts
  );

  const [addModal, setAddmodal] = useState(false);

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    
    name: "",
    email: "",
    phone: "",
  });
  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const handleButtonClick = () => {
    setAddmodal(true);
  };

  const handleModalClose = () => {
    setAddmodal(false);
  };


  const handleCreateContact = async () => {
    const isValid = validateContactInfo();

    if (isValid) {
      await dispatch(postContacts(contactInfo))
        .then(() => {
          setSuccessModalOpen(true);

          dispatch(
            getContacts({
              page: currentPage,
              limit: limit,
              search: searchQuery,
            })
          );

          handleModalClose();
        })
        .catch((error) => {
          console.error("Error creating contact:", error);
        });
    }
  };



  const validateContactInfo = () => {
    const { name, email, phone } = contactInfo;
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "20px",
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <Button
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
        style={{ backgroundColor: "green" }}
      >
        CREATE +
      </Button>
      {addModal && (
        <EditContact
          open={addModal}
          handleModalClose={() => setAddmodal(false)}
        
        />
      )}
    </div>
  );
};

export default Addcontact;



