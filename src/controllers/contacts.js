const contactsService = require('../services/contacts');

async function getAllContacts(req, res, next) {
  try {
    const data = await contactsService.listContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  try {
    const newContact = await contactsService.createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactsService.updateContact(
      contactId,
      req.body,
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Contact updated successfully!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const deleted = await contactsService.deleteContact(contactId);

    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
