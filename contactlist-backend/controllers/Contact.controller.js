const ayncHandler = require("express-async-handler");
const Contact = require("../models/contact.model");

const getContacts = async (req, res) => {
  const search = req.query.search || "";
  console.log(req.query);
  console.log(search, "gfgffghfc");

  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const itemsPerPage = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

  try {
    const matchStage = {};

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const aggregationPipeline = [
      {
        $facet: {
          results: [
            {
              $match: matchStage,
            },
            { $skip: (currentPage - 1) * itemsPerPage },
            { $limit: itemsPerPage },
          ],
          totalCount: [
            { $count: "count" },
            {
              $addFields: {
                pageNumber: currentPage,
              },
            },
          ],
        },
      },
      {
        $project: {
          results: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    console.log("Search string:", search);

    const result = await Contact.aggregate(aggregationPipeline);
    const { results, totalCount } = result[0];

    res.status(200).json({ contacts: results, totalCount, currentPage });
  } catch (error) {
    console.error(`Error in fetching contacts: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(201).json(contact);
});

const createContact = ayncHandler(async (req, res) => {
  console.log(" the request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(202).json(contact);
});

const updateContact = ayncHandler(async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(updatedContact);
});

const deleteContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await contact.deleteOne();
  res.status(203).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
