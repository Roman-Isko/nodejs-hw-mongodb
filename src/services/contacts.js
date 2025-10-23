const Contact = require('../models/contact');

/**
 * Отримати всі контакти
 * @returns {Promise<Array>}
 */
async function listContacts() {
  return await Contact.find().lean();
}

/**
 * Отримати контакт за ID
 * @param {string} contactId
 * @returns {Promise<Object|null>}
 */
async function getContactById(contactId) {
  return await Contact.findById(contactId).lean();
}

/**
 * Створити новий контакт
 * @param {Object} contactData
 * @returns {Promise<Object>}
 */
async function createContact(contactData) {
  const contact = new Contact(contactData);
  return await contact.save();
}

/**
 * Оновити контакт
 * @param {string} contactId
 * @param {Object} updateData
 * @returns {Promise<Object|null>}
 */
async function updateContact(contactId, updateData) {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  }).lean();
}

/**
 * Видалити контакт
 * @param {string} contactId
 * @returns {Promise<boolean>}
 */
async function deleteContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);
  return !!result;
}

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
