// implement your API here
const express = require("express");

const db = require("./data/db"); // << new line

const server = express();

// teaches express how to read JSON from the body
server.use(express.json()); // needed for POST and PUT/PATCH

server.get("/", (req, res) => {
  res.json({ hello: "testing project server" });
});

// GET view with a list of users

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//GET with specific id

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

// (CREATE) POST add a user

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  db.insert(req.body)
    .then(data => {
      if (!name || !bio) {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } else {
        res.status(201).json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

// (PUT) update a user

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
  db.update(id, { name, bio })
    .then(data => {
      if (!data) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
});

// delete a user

server.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  if ({ id } !== { id }) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    DB.remove(id)
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user could not be removed" });
      });
  }
});

const port = 3000;
server.listen(port, () => console.log(`\n ** API on port ${port} **\n`));
