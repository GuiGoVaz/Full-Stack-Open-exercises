import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PrintPerson from './components/PrintPerson'
import AddPerson from './components/AddPerson'
import personService from "./services/person"
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <Filter setNewFilter={setNewFilter} filter={newFilter} />
      <h2>add a new</h2>
      <AddPerson setNotif={setNotifMessage} personService={personService} persons={persons} setPersons={setPersons} setNewName={setNewName}
        setNewNumber={setNewNumber} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      {persons.map(person =>
        <PrintPerson setNotif={setNotifMessage} key={person.name} id={person.id} filter={newFilter} name={person.name} number={person.number} persons={persons} personService={personService} setPersons={setPersons} />
      )}
    </div>
  )
}

export default App