import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = `api.openweathermap.org/data/2.5/weather?lat=-23.5475&lon=-46.6361&appid=ecc6f5b8f274ed65a1ca7cf87cfe593a`;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  weatherReport(){

  }
}
