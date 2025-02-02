const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const User = require("../models/user");

router.route("/").get(users.renderHomePage);

router
  .route("/register")
  .get(users.renderRegisterPage)
  .post(catchAsync(users.postRegisterPage));

router
  .route("/signin")
  .get(users.renderSignin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/signin",
      keepSessionInfo: true,
    }),
    users.validateSignin
  );
//keepSessionInfo has to be true to redirect after signin where we were.

router.get("/logout", users.logout);

module.exports = router;
