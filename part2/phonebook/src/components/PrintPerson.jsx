import DeletePerson from "./DeletePerson"

const PrintPerson = ({ name, number, filter, persons, id, personService, setPersons, setNotif }) => {
    if (name.toLowerCase().includes(filter.toLowerCase())) {
        return (<div>
            {name} {number}
            <DeletePerson setNotif={setNotif} name={name} persons={persons} id={id} personService={personService} setPersons={setPersons} />

        </div>)
    }
}

export default PrintPerson