// routes/api.js
const express = require("express");
const router = express.Router();

const { getAllNumbers, createNumber } = require("../controllers/number");

router.get("/", getAllNumbers);

router.post("/", createNumber);

module.exports = router;
