import React from 'react';
import {useState} from "react";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getCenter from "geolib/es/getCenter";
function Map({searchResults}) {
   const [SelectedLocation ,setSelectedLocation]=useState({ } );
  //Transform the searchResults object into lattitude and longitude object
  //{latitude :'' , longitude:''}
  const coordinates =searchResults.map((result) =>({
    longitude :result.longitude,
    latitude:result.latitude,
  }))

 const center = getCenter(coordinates);
 const[viewport ,setViewport]=useState({
  width:'100%',
  height:'100%',
  latitude:center.latitude,
  longitude:center.longitude,
  zoom:11,
});



  return(<ReactMapGL
    mapStyle="mapbox://styles/arinscode411/cl6dpk60p000114nk4mcf4bcs"
    mapboxAccessToken={process.env.mapbox_key}
    {...viewport}
    onMove={evt => setViewport(evt.viewport)}>
    {searchResults.map((result) => (
      <div key={result.longitude}>
        <Marker
        longitude={result.longitude}
        latitude={result.latitude}
        offsetLeft={-20}
        offsetTop={-10}
        
        >
        <p 
        
        onClick={()=>setSelectedLocation(result)} 
        className='cursor-pointer text-2xl animate-bounce'
        aria-label="push-pin">
          📌
        </p>
        </Marker>
        {/* the popup that should show if we click on the marker */}
       
        {SelectedLocation.longitude=== result.longitude ? (
          <Popup
          onClose={() => setSelectedLocation({})}
          closeOnClick={false}
          latitude={result.latitude}
          longitude={result.longitude}
          >
            {result.title}
          </Popup>
        ):(
          false
          )}





      </div>
    ))}


</ReactMapGL>
  ) ;

}

export default Map;