import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, Keyboard, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { StatusBar } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { styles } from './styles';
import { useWeather } from '../../contexts/WeatherContext';
import {MagnifyingGlassIcon} from "react-native-heroicons/outline"
import Config from "react-native-config";
const API_KEY= Config.API_KEY;

export const HomeScreen = () => {
  
    const [weatherData, setWeatherData] = useState(null);
    const [search, setSearch]= useState('');

  const handleScreenPress = () => {
    // When the screen is pressed, dismiss the keyboard to hide the cursor.
    Keyboard.dismiss();
  };

  const handleChange = (data)=>{
    setSearch(data);
  }
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function getLocalTimeInTimezone(offsetInSeconds) {
    const currentTime = new Date();
    const timezoneOffset = offsetInSeconds * 1000; // Convert to milliseconds
    const timeInTimezone = new Date(currentTime.getTime() + timezoneOffset);
  
    const options = {
      timeZone: 'UTC', // Specify the desired time zone
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return timeInTimezone.toLocaleString(undefined, options);
  }


  const fetchWeatherData = async () => {
    setSearch('');
    try {
      const apiKey = API_KEY // Replace with your OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
          blurRadius={70}
          source={require('../../assets/images/bg.png')}
          style={{ height: '100%', width: '100%', resizeMode: 'cover', position: 'absolute' }}
        />

        <SafeAreaView style={styles.safeareastyle}>
          <View style={styles.mainview}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{ width: '100%' }}>
              <Searchbar placeholder="Search City" onChangeText={handleChange} value={search} icon={MagnifyingGlassIcon} onSubmitEditing={fetchWeatherData} />
              </View>

              
            </View>
            
            {weatherData && (
              <View>
                <View style={{ marginTop: 150,alignItems:"center",justifyContent:"center" }}>
                  <Text style={{fontSize:20}}>{weatherData.name}, {weatherData.sys.country}</Text>
                  <Text style={{ fontSize: 20 }}>{getLocalTimeInTimezone(weatherData.timezone)}</Text>
                  <Text style={{fontSize:40}}>{(weatherData.main.temp - 273.15).toFixed(2)}°C</Text>
                  <Image source={{uri:`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}} style={{height:250,width:140}}/>
                  <Text style={{fontSize:20}}>{(weatherData.main.temp_max - 273.15).toFixed(2)}° / {(weatherData.main.temp_min - 273.15).toFixed(2)}°</Text>
                  <Text style={{fontSize:25}}>{toTitleCase(weatherData.weather[0].description)}</Text>
                </View>
                <View style={{marginTop:20, display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                  <View style={{marginTop:20, display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/3741/3741046.png"}} style={{height:30,width:30,marginRight:10}} />
                    <Text>{weatherData.wind.speed}</Text>
                  </View>
                  <View style={{marginTop:20, display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:"https://icons.veryicon.com/png/o/miscellaneous/intelligent-agriculture/wind-speed-1.png"}} style={{height:30,width:30,marginRight:10, borderColor:'white'}} />
                    <Text>{weatherData.wind.deg}</Text>
                  </View>
                  <View style={{marginTop:20, display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/4148/4148460.png"}} style={{height:30,width:30,marginRight:10}} />
                    <Text>{weatherData.main.humidity}</Text>
                  </View>
                </View>
                
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

