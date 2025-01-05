import { Component } from '@angular/core';
import { Doctor } from './modals/doctor.modal';
import { Slot } from './modals/slot.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedDoc:Doctor|undefined;
  showNotification:boolean=false;
  selectedSlot:Slot|undefined;
  hideforsmallshowDoctorList=true;
  docSelected(doc:Doctor){
      this.selectedDoc = doc;
      this.hideforsmallshowDoctorList=true;
  }
  showBookAppointmentDiv(slot:Slot) {
    this.selectedSlot = slot;
    this.showNotification = true; 
    setTimeout(() => {
      this.showNotification = false;
      this.selectedSlot = undefined; 
    }, 3000);
  }

}
