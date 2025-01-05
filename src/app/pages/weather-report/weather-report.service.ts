import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherReportService {
  baseUrl=environment.weatherBaseUrl;
  constructor(private http:HttpClient) { }

  getcurrentWeather(lat:number,lon:number):Observable<any>{
       return this.http.get( `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}`);
  }

  gethourlyForcast(lat:number,lon:number):Observable<any>{
    return this.http.get<any>( `${environment.weatherForcastBaseurl}/forecast.json?key=${environment.weatherHourlyKey}&q=noida&days=4&aqi=no&alerts=no`)
    .pipe(map(resp=>{
           return resp.forecast.forecastday;
    }));
  }

  kelvinToCelsius(kelvin: number): number {
    if (kelvin < 0) {
      throw new Error('Temperature in Kelvin cannot be negative.');
    }
    return kelvin - 273.15;
  }
}
