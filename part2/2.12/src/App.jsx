import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch contacts from backend (json-server)
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleSearchChange = event => setSearchQuery(event.target.value);

  const addPerson = event => {
    event.preventDefault();

    // Check if name already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    // Create new person object
    const newPerson = { name: newName, number: newNumber };

    // Save to backend using axios.post
    axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        setPersons(persons.concat(response.data)); // Update state with new data
        setNewName("");
        setNewNumber("");
      })
      .catch(error => console.error("Error adding person:", error));
  };

  // Filter persons based on search query (case insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search Field */}
      <div>
        filter shown with: <input value={searchQuery} onChange={handleSearchChange} />
      </div>

      <h2>ADD NEW</h2>
      {/* Add New Person Form */}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
