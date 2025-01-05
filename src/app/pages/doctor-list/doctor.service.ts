import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../modals/doctor.modal';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  getdoctorsList():Observable<Doctor[]>{
    return this.http.get<Doctor[]>('../../../assets/doctors.json');
  }

  postdoctorsDoctor(doctorDetails:Doctor):Observable<any>{
    return this.http.post('../../../assets/doctors.json',doctorDetails);
  }

  getallSlots():Observable<any>{
   return this.http.get('../../../assets/slots.json');
  }
}
