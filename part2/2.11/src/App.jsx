import { useState, useEffect } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:3001/persons')
      .then(response => response.json())
      .then(data => setPersons(data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault(); // Prevents form submission from reloading the page

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Add new contact to the phonebook
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));

    // Send the new contact to the server
    fetch('http://localhost:3001/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPerson)
    });

    // Clear input fields after adding a new contact
    setNewName('');
    setNewNumber('');
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
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
