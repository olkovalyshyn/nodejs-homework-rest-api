const express = require("express");
const router = express.Router();
const contactsActions = require("../../model/index");
const validate = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsActions.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsActions.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "succsess",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validate.addValidatedContact, async (req, res, next) => {
  try {
    const contact = await contactsActions.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      body: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsActions.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsActions.updateContact(
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
