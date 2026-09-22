const AddPerson = ({ personService, persons, setPersons, setNewName, setNewNumber, name, number, setNotif }) => {
    const addPersonHandler = (event) => {
        event.preventDefault()
        const personObject = {
            name: name,
            number: number,
        }
        let id = ''
        if (persons.some(person => { id = person.id; return person.name === name })) {
            if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(id, personObject)
                    .then((returnedPerson) => {

                        setPersons(persons.map(person => person.id === id ? returnedPerson : person))
                        setNewName('')
                        setNewNumber('')
                        setNotif(
                            `${name}'s number was updated`
                        )
                        setTimeout(() => {
                            setNotif(null)
                        }, 5000)
                    }).catch(() => {
                        setPersons(persons.filter(p => p.id !== id))
                        setNewName('')
                        setNewNumber('')
                        setNotif(
                            `Information of ${name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setNotif(null)
                        }, 5000)
                    })
            }
            //return
        } else {
            personService.create(personObject).then((returnedNote) => {
                setPersons(persons.concat(returnedNote))
                setNewName('')
                setNewNumber('')
                setNotif(
                    `Added ${name}`
                )
                setTimeout(() => {
                    setNotif(null)
                }, 5000)
            })
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    return (<form>
        <div>
            name: <input value={name}
                onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={number}
                onChange={handleNumberChange} />
        </div>
        <div>
            <button onClick={addPersonHandler} type="submit">add</button>
        </div>
    </form>)
}

export default AddPerson