import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';

import {sortPlacesByDistance} from './loc.js'


const storedPlaceIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
const storedPlaces = storedPlaceIds.map ( (id)=>
   AVAILABLE_PLACES.find( (place)=>
     place.id===id ))

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);


  useEffect( () => {
    // after component rendering with empty dependency
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(position)
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude, 
        position.coords.longitude
      )
      console.log(sortedPlaces)
      setAvailablePlaces(sortedPlaces)
    })
  }, []);



  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    console.log(localStorage.getItem('selectedPlace'))
    const storedPlaceIds = JSON.parse(localStorage.getItem('selectedPlace')) || [];
    if (storedPlaceIds.indexOf(id) === -1){
      localStorage.setItem('selectedPlace', JSON.stringify( [id, ...storedPlaceIds] ))
    }
    
  }

  // no re-creation of funtion on re-rendering
  const handleRemovePlace = useCallback(

    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      setModalIsOpen(false)
  
      const storedPlaceIds = JSON.parse(localStorage.getItem('selectedPlace')) || [];
      localStorage.setItem('SelectedPlaces', JSON.stringify(storedPlaceIds.filter( (id)=> id !== selectedPlace.current )))
    }, [])

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
