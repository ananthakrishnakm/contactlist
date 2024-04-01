const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/Contact.controller");

router.route("/").get(getContacts);
router.route("/").post(createContact);
router.delete('/:id',deleteContact);
router
  .route("/:id")
  .get(getContact)
  .put(updateContact);



module.exports = router;
