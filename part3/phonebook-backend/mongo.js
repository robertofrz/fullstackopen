const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://robertofrz94:${password}@cluster0.cty881m.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 2) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
