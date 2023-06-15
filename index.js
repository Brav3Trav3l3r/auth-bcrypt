import express from "express";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

const users = [];

app.listen(3000, console.log("Running server on port 3000"));

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashPassword };
    users.push(user);
    res.status(200).send("Added successfully");
  } catch (error) {
    res.status(500).send("Bad request");
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("succes");
    } else {
      res.send("not allowed");
    }
  } catch (error) {
    res.status(500).send();
  }
});
