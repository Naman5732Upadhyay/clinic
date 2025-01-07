import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { currentWeatherData, Weather } from '../../modals/weather.modal';

@Injectable({
  providedIn: 'root'
})
export class WeatherReportService {
  baseUrl=environment.weatherBaseUrl;
  constructor(private http:HttpClient) { }

  getcurrentWeather(lat:number,lon:number):Observable<currentWeatherData>{
       return this.http.get<currentWeatherData>(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}`).pipe(
        map((resp:any) =>{
          return {temp_max: resp.main.temp_max,name:resp.name}
        })
       );
  }

  gethourlyForcast():Observable<Weather[]>{
    return this.http.get<{forecast:{forecastday:Weather[]}}>( `${environment.weatherForcastBaseurl}/forecast.json?key=${environment.weatherHourlyKey}&q=noida&days=4&aqi=no&alerts=no`)
    .pipe(map(resp=>{
           return resp.forecast.forecastday;
    }));
  }
}
