import { useState, useEffect } from 'react'
import axios from 'axios'
import Find from './components/Find'
import Print from './components/Print'




const App = () => {
  const [search, setNewSearch] = useState('')
  const [countries, setNewCountries] = useState([])
  const [show, setNewShow] = useState(false)


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNewCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Find setNewSearch={setNewSearch} search={search} setNewShow={setNewShow} />
      <Print countries={countries} search={search} show={show} setNewShow={setNewShow} />
    </div>
  )
}

export default App