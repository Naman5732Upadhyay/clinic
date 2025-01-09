import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterOutlet } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { ApptSlotsComponent } from "./pages/appt-slots/appt-slots.component";
import { DoctorListComponent } from "./pages/doctor-list/doctor-list.component";
import { DateTimerComponent } from "./pages/date-timer/date-timer.component";
import { WeatherReportComponent } from "./pages/weather-report/weather-report.component";
import { HttpClientModule } from "@angular/common/http";
import { CreateDoctorComponent } from "./pages/create-doctor/create-doctor.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KelvinToCelsiusPipe } from "./utils/kelvintoCelsius";

@NgModule({
    declarations: [
        AppComponent,
        ApptSlotsComponent,
        DoctorListComponent,
        DateTimerComponent,
        WeatherReportComponent,
        CreateDoctorComponent,
        KelvinToCelsiusPipe,
    ],
    imports:[RouterOutlet,BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule],
    providers:[],
    bootstrap: [AppComponent]
})
export class AppModule{}