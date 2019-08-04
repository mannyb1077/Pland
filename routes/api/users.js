const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

//@route        POST api/users
//@Description  Register User
//@access       Public
router.post(
  "/",
  //User Input Validation
  [
    //Checks and validates correct name, email and password /////
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or mor characters"
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    //console.log on server side
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, lastName, email, password } = req.body;
    try {
      // See if Users Exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User already exists" }] });
      }

      //Get Users Gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size of image
        r: "pg", //rating
        d: "mm" //default image
      });

      user = new User({
        name,
        lastName,
        email,
        avatar,
        password
      });

      //Encrypt Password using Bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt); //crates hash for the password

      await user.save(); //saves user

      //Return jsonwebtoken

      //sends information to Front End
      res.send("New User Registered");

      //res.send("Users route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
