import { useEffect, useState } from "react";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import Search from "./components/Search";
import personServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.some((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );

        const updatedPerson = { ...personToUpdate, number: newNumber };

        personServices
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification("Number updated successfully");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          })

          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
      return;
    }
    personServices.create(personObject).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNotification("Person added successfully");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
    });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = ({ person }) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .deletePerson(person.id)
        .then(() => {
          console.log(`${person.name} deleted successfully`);
          setPersons((prevPersons) =>
            prevPersons.filter((p) => person.id !== p.id)
          );
          setNotification("Person deleted successfully");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  const filteredNames = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <PersonsList filteredNames={filteredNames} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
