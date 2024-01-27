const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const putSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({ status: "success", code: 200, data: { contact } });
      return;
    }
    res.status(404).json({ message: "Not Found", code: 404 });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error, name, email, phone } = postSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: "failure",
        code: 400,
        message: "Missing required field",
        details: error.details,
      });
      return;
    }
    const contact = await addContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      await removeContact(contactId);
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      res.json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error, name, email, phone } = putSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: "failure",
        code: 400,
        message: "Missing fields",
      });
      return;
    }

    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    const body = { name, email, phone };
    if (contact) {
      await updateContact(contactId, body);
      res.json({
        status: "Successful",
        code: 200,
        message: "Contact was updated successfully",
      });
    } else {
      res.json({
        status: "Failure",
        code: 400,
        message: "Contact of given ID does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
