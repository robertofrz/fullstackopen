const cors = require("cors");
require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();
app.use(express.static("dist"));
app.use(cors());

app.use(express.json());

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  const date = new Date();
  Person.countDocuments()
    .then((total) => {
      response.send(`
    <p>Phonebook has info for ${total} people</p>
    <p>${date}</p>
  `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const content = request.body;

  if (!content.name || !content.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const updatedPerson = {
    name: content.name,
    number: content.number,
  };

  Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).json({ error: "Pessoa não encontrada" });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const content = request.body;

  if (!content.name && !content.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const person = new Person({
    name: content.name,
    number: content.number,
  });

  person
    .save()
    .then((newPerson) => response.json(newPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
