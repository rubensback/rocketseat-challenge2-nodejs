const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.status(200).json(repositories)
});

app.post("/repositories", (req, res) => {
  const id = uuid()
  const { title, url, techs } = req.body

  const newObj = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newObj)

  res.status(200).json(newObj)
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body

  const repositoryIdx = repositories.findIndex(r => r.id === id)

  if (repositoryIdx === -1) {
    res.status(400).json({ error: "this id doesn't exists" })
  }

  const newObj = {
    ...repositories[repositoryIdx],
    title,
    url,
    techs,
  }

  repositories[repositoryIdx] = newObj

  res.status(200).json(newObj)
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repositoryIdx = repositories.findIndex(r => r.id === id)

  if (repositoryIdx === -1) {
    res.status(400).json({ error: "Wrong Id!" })
  }

  repositories.splice(repositoryIdx, 1)

  res.status(204).json()
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params

  const repositoryIdx = repositories.findIndex(r => r.id === id)

  if (repositoryIdx === -1) {
    res.status(400).json({ error: "Wrong Id!" })
  }

  const newObj = {
    ...repositories[repositoryIdx],
    likes: repositories[repositoryIdx].likes + 1
  }

  repositories[repositoryIdx] = newObj

  res.status(200).json(newObj)

});

module.exports = app;
