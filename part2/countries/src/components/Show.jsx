import Weather from "./Weather"


const Show = ({ country }) => {
    const languages = country.languages
    return <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            <div>
                {Object.entries(languages).map(([key, value]) => (
                    <li key={key}>
                        {value}
                    </li>
                ))}
            </div>
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        <Weather capital={country.capital} />
    </div>
}

export default Show