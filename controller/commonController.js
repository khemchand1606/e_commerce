const { userCollection } = require("../models/userModal");
// create document
async function createDocument({ body }) {
  return await userCollection.create(body);
}

// get all getAllDocument
async function getAllDocument() {
  return await userCollection.find();
}

// get a document by email
async function getDocumentByEmail({ email }) {
  return await userCollection.findOne({ email });
}

// get document by id
async function getDocumentById({ id }) {
  return await userCollection.findById(id);
}

// update document
async function updateDocument({ id }, { body }) {
  return await userCollection.findByIdAndUpdate(id, { ...body }, { new: true });
}

// delete document
async function deleteDocument({ id }) {
  return await userCollection.findByIdAndDelete(id);
}

module.exports = {
  createDocument,
  getAllDocument,
  getDocumentByEmail,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
