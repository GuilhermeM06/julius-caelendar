import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']


})
export class WeatherComponent implements OnInit {

  WeatherData: any

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main:{},
      isDay: true
    }
    this.getWeatherData()
    console.log(this.WeatherData)
  }

  getWeatherData(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=-23.5475&lon=-46.6361&appid=ecc6f5b8f274ed65a1ca7cf87cfe593a`)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":-46.6361,"lat":-23.5475},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":290.57,"feels_like":290.06,"temp_min":285.97,"temp_max":292.35,"pressure":1025,"humidity":65},"visibility":10000,"wind":{"speed":2.06,"deg":80},"clouds":{"all":0},"dt":1625264413,"sys":{"type":1,"id":8394,"country":"BR","sunrise":1625219348,"sunset":1625257908},"timezone":-10800,"id":3448439,"name":"São Paulo","cod":200}')
    // this.setWeatherData(data)
  }


  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime())
    this.WeatherData.temp_celsius = (this.WeatherData.main.temp - 273.15).toFixed(0)
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0)
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0)
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0)

  }

}
