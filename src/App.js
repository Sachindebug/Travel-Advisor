import React,{useState,useEffect} from 'react'
import { CssBaseline, Grid} from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData,getWeatherData} from './api/index';


const App = () => {
  const [places,setPlaces] = useState();
  const [filteredPlaces,setFilteredPlaces] = useState([]);
  const [coordinates,setCoordinates]  = useState({});
  const [bound,setBounds] = useState({});
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [weatherData,setWeatherData] = useState({});
  

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition (({coords:{latitude, longitude}})=>{
      setCoordinates({lat:latitude, lng:longitude});
    })

  },[])
  
  useEffect(()=>{
    getWeatherData(coordinates.lat,coordinates.lng)
      .then((data)=> setWeatherData(data));
    getPlacesData(type,bound.sw,bound.ne)
    .then((data)=>{
      console.log(data);
      setFilteredPlaces([]);
      setPlaces(data);
    })

  },[type,coordinates,bound])

  useEffect(() => {
    const filteredPlaces = places?.filter((pl) => pl.rating > rating);
    setFilteredPlaces(filteredPlaces);
 },[rating])

  return (
    <>
       <CssBaseline/>
       <Header setCoordinates={setCoordinates}/>
       <Grid container spacing={3} style={{width :'100%'}}>
           <Grid item xs={12} md={4}>
                <List 
                  places={filteredPlaces?.length?filteredPlaces : places}
                  type = {type}
                  setType = {setType}
                  rating = {rating}
                  setRating = {setRating}
                />
           </Grid>
           <Grid item xs={12} md={8}>
                 <Map 
                  setCoordinates = {setCoordinates} 
                  setBounds = {setBounds} 
                  coordinates = {coordinates}
                  places = {filteredPlaces?.length?filteredPlaces : places}
                  weatherData = {weatherData}
                  
                 />
           </Grid>
       </Grid>
    </>
  );
}

export default App