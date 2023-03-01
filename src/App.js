
import { CardContent, Card,FormControl,MenuItem,Select } from '@mui/material';
import React,{useState,useEffect} from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';


function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
       .then((response) => response.json())
       .then((data) => {
        const countries = data.map((country) => ({
          name : country.country,
          value:country.countryInfo.iso2,
        }));

        setCountries(countries);
       });
    };

    getCountriesData();
  },[]);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

  };
  return (
    <div className="app">
      
      <div className='app_left'>
        <div className='app_header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>
            <Select variant='outlined' 
              onChange={onCountryChange}
              value={country}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              
              
            </Select>
          </FormControl>
        </div>
        <div className='app_stats'>
          <InfoBox title="Coronavirus Cases" cases={1234} total={3000}/>
          <InfoBox title="Recovered" cases={1234} total={3000}/>
          <InfoBox title="Deaths" cases={1234} total={3000}/>

        </div>
        
        <Map/>
      </div>
      <Card className='app_right'>
        <CardContent>
          <h3>live cases by country</h3>
          <h3>worldwide new cases</h3>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
