const bcrypt = require("bcryptjs");
const cookie = require("cookie");
module.exports = {
  register: async (req, res) => {
    console.log("hit register");
    const { username, password } = req.body;
    const db = req.app.get("db");

    let user = await db.check_user(username);
    if (user[0]) {
      return res.status(400).send("User already exists");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let newUser = await db.register_user(username, hash);

    req.session.user = newUser[0];

    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    console.log("hit login");
    const { username, password } = req.body;
    const db = req.app.get("db");

    let user = await db.check_user(username);
    if (!user[0]) {
      return res.status(400).send("username not found");
    }

    let authenticated = bcrypt.compareSync(password, user[0].password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete user[0].password;
    req.session.user = user[0];
    console.log("this is user :", user);
    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send("No user on session");
    }
  },

  addPost: (req, res) => {
    console.log(req.session);
    const db = req.app.get("db");
    const user_id = req.session.user.id;
    const { image, title, content } = req.body;

    db.add_post(user_id, image, title, content).then(() => res.sendStatus(200));
  },

  getPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log("get post id : \n\n\n\n", id, "\n\n\n");
    db.get_post(id).then((response) => {
      const data = response[0];
      res.status(200).send(data);
    });
  },

  getPosts: (req, res) => {
    const db = req.app.get("db");
    db.get_posts().then((response) => res.status(200).send(response));
  },

  // getPosts: (req, res) => {
  //   const db = req.app.get("db");
  //   const { search, myPost } = req.query;
  //   const { id } = req.params;
  //   console.log(req.query);

  //   if (myPost === "true" && search) {
  //     db.filter_posts(search)
  //       .then((results) => {
  //         console.log("results :", results);
  //         return res.status(200).send(results);
  //       })
  //       .catch((err) => res.status(500).send(err));
  //   } else if (myPost === "false" && search) {
  //     return db
  //       .filter_not_my_posts([search, id])
  //       .then((results) => {
  //         return res.status(200).send(results);
  //       })
  //       .catch((err) => res.status(500).send(err));
  //   } else if (myPost === "false") {
  //     return db
  //       .get_not_my_posts(id)
  //       .then((results) => {
  //         return res.status(200).send(results);
  //       })
  //       .catch((err) => res.status(500).send(err));
  //   } else {
  //     return db
  //       .get_posts()
  //       .then((results) => {
  //         res.status(200).send(results);
  //       })
  //       .catch((err) => res.status(500).send(err));
  //   }
  // },
};
