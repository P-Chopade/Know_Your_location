import React, { useState } from "react";
import './App.css';

function App() {
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [addr, setaddr] = useState();
  const geo = navigator.geolocation;

  geo.getCurrentPosition(usercoords);

  function usercoords(position) {
    let userlatitude = position.coords.latitude;
    let userlongitude = position.coords.longitude;
    console.log("Latitude", userlatitude);
    setlatitude(userlatitude);
    setlongitude(userlongitude);
  }

  const getuser = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=eff895953adf4b6f8d792e30706bf167&q=${latitude}%2C${longitude}&pretty=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("user addr:", data.results[0].formatted);
    //console.log('user state:',data.results[0].components.state)

    setaddr(data.results[0].formatted);
  };
  const handleuseraddr = () => {
    getuser();
  };

  return (
<div className="container d-flex justify-content-center align-items-center mt-3 mb-5" style={{ width: "30rem", height: "40rem" }}>

      <div className="card col  d-flex justify-content-center">
        <img src="/loc.png" className="card-img-top" alt="..." />
        <div className="card-body">
        <div className="card-body text-center">
      <button
        type="button"
        className="btn btn-success"
        onClick={handleuseraddr}
      >
        Get Your Address
      </button>
    </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Your current location</b> :{addr}</li>
          <li className="list-group-item">
          <b>latitude</b>:{latitude}, <b>latitude</b>:{longitude}
          </li>    
        </ul>
      </div>
    </div>
  );
}

export default App;
