require("dotenv").config();
const express = require("express");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const ctrl = require("./controller");

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    key: "skill-check-session",
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

massive(CONNECTION_STRING)
  .then((db) => {
    app.set("db", db);
    console.log("DB connected");
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on ${SERVER_PORT}`)
    );
  })
  .catch((e) => {
    console.log("e :", e);
  });

// AUTH ENDPOINTS
app.post("/auth/register", ctrl.register);
app.post("/auth/login", ctrl.login);
app.post("/auth/logout", ctrl.logout);
app.get("/auth/user", ctrl.getUser);

//ADD POSTS ENDPOINTS
app.post("/api/add_post", ctrl.addPost);
app.get("/api/get_posts", ctrl.getPosts);
app.get("/api/get_post/:id", ctrl.getPost);
