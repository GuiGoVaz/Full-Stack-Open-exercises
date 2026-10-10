const Find = ({ search, setNewSearch, setNewShow }) => {
    const handleFindChange = (event) => {
        setNewSearch(event.target.value)
        setNewShow(false)
    }
    return (<div>
        find countries <input value={search}
            onChange={handleFindChange} />
    </div>)
}

export default Find