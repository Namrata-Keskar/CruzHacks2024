import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import app from '../firebase.js';
import * as firestore from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const db = firestore.getFirestore(app);

const libraries = ['places'];
const mapContainerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 36.974140, // default latitude
  lng: -122.028801, // default longitude
};

const addresses = [
  
  '1510 Capitola Rd, Santa Cruz',
  '204 E Beach St, Watsonville',
  '250 Locust St, Santa Cruz',
  '100 Salina Road, Pajaro CA',
  // Add more addresses as needed
];

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDrtIWBXkkbTh0yFUED8sLramXyf34ZCRU', // Replace with your API key
    libraries,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [addressMarkers, setAddressMarkers] = useState([]);
  const [dbaddress, setDbAddress] = useState([]);

    const getCollections = async () => {
      try {
        const dataCollection = firestore.collection(db, "locations");
        const dataSnapshot = await firestore.getDocs(dataCollection);
        console.log("data snapshot:", dataSnapshot);
        const list = dataSnapshot.docs.map(doc => doc.data());
        console.log("list:", list);
        // setDbAddress(list.map(item=>item.location));
        setDbAddress(list);

      } catch {
        console.log("error");
      }
    }
    useEffect(() => {
      getCollections();
    }, []);





  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation && isLoaded) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Set the user's location using reverse geocoding
          Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
              const address = response.results[0].formatted_address;
              console.log('User Location:', { latitude, longitude, address });

              // Update the state with user's location and address
              setUserLocation({ lat: latitude, lng: longitude });
              setUserAddress(address);
            },
            (error) => {
              console.error('Error fetching user location:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting user position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser or maps are not loaded.');
    }
  }, [isLoaded]); // Run the effect when isLoaded changes

  useEffect(() => {
    // Convert addresses to coordinates using Geocode
    Geocode.setApiKey('AIzaSyDrtIWBXkkbTh0yFUED8sLramXyf34ZCRU'); // Replace with your API key
    Promise.all(
      dbaddress.map((address) =>
        Geocode.fromAddress(address.location).then(
          (response) => response.results[0].geometry.location
        )
      )
    ).then((addressCoordinates) => {
      setAddressMarkers(addressCoordinates.map((coordinate, index) => ({ id: index, position: coordinate })));
    });
  }, [isLoaded, dbaddress]); // Run the effect when isLoaded changes

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <p>Map Page</p>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={userLocation || center} // Use user's location if available, else use default
      >
        {userLocation && <Marker position={userLocation} label="You are here" />}
        {addressMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={{ fillColor: 'red', fillOpacity: 1, path: window.google.maps.SymbolPath.CIRCLE, scale: 6, strokeColor: 'white', strokeWeight: 2 }} />
        ))}
      </GoogleMap>
      {userAddress && <p>Your Current Address: {userAddress}</p>}
    </div>
  );
};

export default Map;
