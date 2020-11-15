var express = require("express");
const shortid = require("shortid");

var db = require("../db");

var router = express.Router();

router.get("/", (req, res) =>
  res.render("users/index", {
    users: db.get("users").value(),
  })
);

router.get("/search", (req, res) => {
  let q = req.query.q;
  let matchedUsers = db
    .get("users")
    .value()
    .filter(
      (user) =>
        user.name.toLocaleUpperCase().indexOf(q.toLocaleUpperCase()) !== -1
    );
  res.render("users/index", { users: matchedUsers, question: q });
});

router.get("/create", (req, res) => res.render("users/create"));

router.get("/:id", (req, res) => {
  var id = req.params.id;

  var user = db.get("users").find({ id: id }).value();

  res.render("users/view", { user: user });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

module.exports = router;
