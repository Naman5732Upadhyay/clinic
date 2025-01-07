export interface Weather{
    date_epoch:number,
    day:Day,
}
export interface Day{
    avghumidity:number,
    avgtemp_c:number,
    mintemp_c:number,
    maxtemp_c:number,
    condition:{text:string} 
}
export interface currentWeatherData{
    temp_max:number,
    name:string,
}