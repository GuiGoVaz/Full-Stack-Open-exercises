import Show from "./Show"
import { useState } from 'react'

const Print = ({ countries, search, show, setNewShow }) => {
    const [country, setNewCountry] = useState('')
    const showCountry = (c) =>
        () => {
            setNewCountry(c)
            setNewShow(true)

        }
    if (!search || !countries) {
        return null
    }
    if (show) {
        return <Show country={country} />
    }
    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    if (filtered.length <= 10 && filtered.length > 1 && !show) {
        return (<div>
            {filtered.map(country =>
                <div key={country.name.common}>{country.name.common}
                    <button onClick={showCountry(country)} type="submit">Show</button></div>
            )}

        </div>)
    }
    if (filtered.length === 1) {
        return <Show country={filtered[0]} />

    }
    return <div>Too many matches, specify another filter</div>
}

export default Print