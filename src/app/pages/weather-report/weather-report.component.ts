import { Component, OnInit, TemplateRef } from '@angular/core';
import { WeatherReportService } from './weather-report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.scss'
})
export class WeatherReportComponent implements OnInit {
  currentWeatherData:any;
  hourleyForcast:any;
  constructor(private weatherservice:WeatherReportService,private modalService:NgbModal){
    
  }
  ngOnInit(): void {
    this.weatherservice.getcurrentWeather(28.57,77.32).subscribe(resp=>{
      this.currentWeatherData = resp;
    });
  }

  openModal(templateref:TemplateRef<HTMLElement>){
    this.weatherservice.gethourlyForcast(28.57,77.32).subscribe(resp=>{
      this.hourleyForcast = resp;
      // this.hourleyForcast.forEach((item:any)=>{
      //      item.date = new Date(item.date_epoch)
      // })
    });
    this.modalService.open(templateref,{size : 'lg'});
  }

  closemodal(){
    this.modalService.dismissAll();
  }

}
