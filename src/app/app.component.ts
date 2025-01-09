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
  newSlot:{slot:Slot,section:string}|undefined;
  deletedSlot:{slot:Slot,section:string}|undefined;
  docSelected(doc:Doctor){
      this.selectedDoc = doc;
      this.hideforsmallshowDoctorList=true;
      this.showNotification = false;
  }
  showBookAppointmentDiv(slot:Slot) {
    this.selectedSlot = slot;
    this.showNotification = true; 
    setTimeout(() => {
      this.showNotification = false;
      this.selectedSlot = undefined; 
    }, 3000);
  }
  addnewSlot(newSl:{slot:Slot,section:string}){
    this.newSlot = newSl;
    // setTimeout(() => {
    //   this.newSlot = undefined
    // }, 3000);
  }
  deleteSlot(newSl:{slot:Slot,section:string}){
    this.deletedSlot = newSl;
    // setTimeout(() => {
    //   this.deletedSlot = undefined
    // }, 3000);
  }

}
