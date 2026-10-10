


const DeletePerson = ({ name, persons, id, personService, setPersons, setNotif }) => {

    const remove = () => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((n) => n.id !== id))
                    setNotif(
                        `${name} was deleted`
                    )
                    setTimeout(() => {
                        setNotif(null)
                    }, 5000)
                })
        }

    }

    return (<>
        <button onClick={remove} type="submit">delete</button>
    </>)
}

export default DeletePerson