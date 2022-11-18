import './App.css'
import Place from './components/Place'
import { useState, useEffect } from "react"
import axios from "axios"

function App() {

  const baseURL = 'http://localhost:3001/api/place/'

  const [places, setPlaces] = useState([]);



  useEffect(() => {
    const validPlaceIds = [
      'GXvPAor1ifNfpF0U5PTG0w',
      'ohGSnJtMIC5nPfYRi_HTAg'
    ]
    async function initialize() {
      validPlaceIds.forEach(placeid => {
        axios.get(baseURL+placeid).then((response) => {
          if(response.data.error) {
            console.log('GET ' + baseURL + placeid + '\nSERVER ERROR: ' + response.data.error)
          }
          else {
            setPlaces(places => [...places, response.data])
          }
        }).catch(function (error) {
          console.log('GET ' + baseURL + placeid + '\nCLIENT ERROR: ' + error.message)
        })
      })
    }
    initialize()
  }, [])
  
  return (
    <div className="App">
      {places && places.map((place, i) => (
          <Place key={'place_'+i} place={place} className="placeContainer"></Place>
        ))
      }
    </div>
  );
}

export default App;
