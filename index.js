const express = require("express"); // Common JS Modules
// the same as import express from 'express'; // ES2015 Modules

const db = require("./data/db.js");

const server = express();

server.use(express.json()); //*** Add this to make put work ***

server.get("/", (req, res) => {
  res.send("Hello Wev XVII");
});

server.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

// CRUD
server.get("/hubs", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      // 200-299 success
      // 300-399 redirect
      // 400-499 client error
      // 500-599 server error
      res.status(200).json(hubs);
    })
    .catch(error => {
      // handle it
      res.status(500).json({ message: "error retrieving hubs" });
    });
});

// C in CRUD

server.post('/hubs', (req, res) => {
  // read the data for the hub
  const hubInfo = req.body;
  console.log('hub information', hubInfo)
  // add the hub to our db
  db.hubs.add(hubInfo).then(hub => {
    res.status(201).json(hub);
  }).catch(error => {
    // handle it
    res.status(500).json({ message: "error creating hubs" });
  });
  // let the client know what happened
});

server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.hubs.remove(id).then(deleted => {
    res.status(204).end(); //tells the client the request is done
  })
  .catch(error => {
    // handle it
    res.status(500).json({ message: "error deleting the hub" });
  });
})

server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs.update(id, changes).then(updated => {
    if(updated) {
      res.status(200).json(updated)
    } else {
      res.status(404).json({message: 'hub not found'})
    }
  })
  .catch(error => {
    // handle it
    res.status(500).json({ message: "error updating the hub" });
  });
});

server.listen(4000, () => {
  console.log("\n** API up and running on port 4K **");
});

// run yarn to download the dependencies
// yarn add express
// yarn server
// add index.js

