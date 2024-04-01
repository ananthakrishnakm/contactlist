import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  deleteContact,
  updateCurrentPage,
} from "../redux/contactslice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditContact from "./Editcontact";
import DeleteConfirmation from "./Delete";
import Addcontact from "./Addcontact";

function ContactListTable() {
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);



  const { contacts, searchQuery, currentPage, limit, totalLength } =
    useSelector((state) => state.contacts);

  const numberOfPages = Math.ceil(totalLength / limit);

  const handleDelete = () => {
    setDeleteModalOpen(false);
    dispatch(
      getContacts({ page: currentPage, limit: limit, search: searchQuery })
    );
  };

  const handleOpen = () => {
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(
      getContacts({ page: currentPage, limit: limit, search: searchQuery })
    );
  }, [dispatch, currentPage]);

  const handleEditClick = (contacts) => {
    setSelectedContact(contacts);
    setEditModalOpen(true);
  };

  const handleDeleteContact = (contactId) => {
    handleOpen();
    dispatch(deleteContact(contactId));
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleNextPage = () => {
    dispatch(updateCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    dispatch(updateCurrentPage(currentPage - 1));
  };

  return (
    <>
      <TableContainer component={Paper} p={20}>
        <Table sx={{ minWidth: 650 }} aria-label="contact list table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell style={{ textAlign: "center" }}>EDIT</TableCell>
              <TableCell style={{ textAlign: "center" }}>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(contacts) &&
              contacts.map((contact) => (
                <TableRow
                  key={contact._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {contact.name}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleEditClick(contact)}
                      style={{ backgroundColor: "green" }}
                      variant="contained"
                    >
                      EDIT
                       
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDeleteContact(contact._id)}
                      style={{ backgroundColor: "red" }}
                      variant="contained"
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          style={{ backgroundColor: "gray", color: "white" }}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button
          style={{
            borderRadius: "50%",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "gray",
            color: "white",
          }}
        >
          {currentPage}
        </Button>

        <Button
          onClick={handleNextPage}
          disabled={currentPage >= numberOfPages}
          style={{ backgroundColor: "gray", color: "white" }}
        >
          Next Page
        </Button>
      </div>

      {editModalOpen && (
        <EditContact
          open={editModalOpen}
          handleModalClose={() => setEditModalOpen(false)}
          contact={selectedContact}
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmation
          open={handleOpen}
          handleModalClose={handleDeleteCancel}
          handleDelete={handleDelete}
          handleDeleteContact={handleDeleteContact}
        />
      )}

     
    </>
  );
}

export default ContactListTable;
