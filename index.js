require("dotenv").config();
console.log(process.env.SESSION_SECRET);

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");

var authMiddleware = require("./middlewares/auth.middleware");

var port = 3000;

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

app.get("/", (req, res) => res.render("index", { name: "AAA" }));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log("Server listening on port " + port));
