const express = require("express");
const router = express.Router();

//@route        GET api/posts
//@Description  Test route
//@access       Public
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
