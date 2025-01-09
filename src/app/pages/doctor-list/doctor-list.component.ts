import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from '../../modals/doctor.modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Slot } from '../../modals/slot.modal';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit {
  doctorList:Doctor[]=[];
  selectedDocindex:number|undefined|null;
   morning:Slot[]=[];
   evening:Slot[]=[];
   afternoon:Slot[]=[];
   createSlotType:string|undefined;
   newSlot:string='';
   showtimevalidation:boolean=false;
   readonly timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
   selectedSlot:{
    type:string,
    slot:Slot
   }|undefined;
  @Output() selectedDoctor =new EventEmitter<Doctor>();
  @Output() addnewSlotEmitter = new EventEmitter<{slot:Slot,section:string}>();
  @Output() deleteSlotEmitter = new EventEmitter<{slot:Slot,section:string}>();

  constructor(private doctorService:DoctorService,private modalService:NgbModal){}

  ngOnInit(): void {
    this.doctorService.getdoctorsList().subscribe(res=>{
      this.doctorList = res;
    });
    this.doctorService.getallSlots().subscribe(resp=>{
      this.morning =resp?.morning?.slots;
      this.evening =resp?.evening?.slots;
      this.afternoon =resp?.afternoon?.slots;
    });
  }

  addnewDoctor(templateref:TemplateRef<HTMLElement>){
    this.modalService.open(templateref,{size : 'lg'});
  }

  selcectDoctor(doc:Doctor){
    this.selectedDocindex = doc.id;
    this.selectedDoctor.emit(doc);
  }

  createDoctor(newDoc:Doctor){
    newDoc.id = this.doctorList.length+2;
    this.doctorList.push(newDoc);
    if(this.doctorList.length ===1){
      this.selcectDoctor(this.doctorList[0]);
    }
    this.modalService.dismissAll();
  }

  deleteDoc(doctor:Doctor){
    this.doctorList = this.doctorList.filter(item => item.id !== doctor.id);
    if(this.selectedDocindex === doctor.id){
    this.selectedDoctor.emit(undefined);
    }
  }
  openaddnewSlotpoppup(templateref:TemplateRef<HTMLElement>){
    this.selectedDoctor.emit(undefined);
      this.modalService.open(templateref,{size : 'lg'});
  }

  createNewSlot(){
    if(this.timeRegex.test(this.newSlot)){
      const newSlot:Slot = {
        time: this.newSlot,
        is_selected: false,
        is_occupied: false
      }
      switch (this.createSlotType?.toLocaleLowerCase()){
        case 'morning':
          this.morning.push(newSlot);
          this.addnewSlotEmitter.emit({slot:newSlot,section:'morning'})
        break;

        case 'afternoon':
          this.afternoon.push(newSlot);
          this.addnewSlotEmitter.emit({slot:newSlot,section:'afternoon'})
        break;

        case 'evening':
          this.evening.push(newSlot);
          this.addnewSlotEmitter.emit({slot:newSlot,section:'evening'})
        break;

       }
    }else{
        this.showtimevalidation = true;
    }
  }

  selectSlot(slot: Slot, type: string){
    this.morning.forEach(item => item.is_selected = false);
    this.evening.forEach(item => item.is_selected = false);
    this.afternoon.forEach(item => item.is_selected = false);
    switch (type) {
      case 'M':
        const foundmorning = this.morning.find(item => item.time == slot.time)
        if (foundmorning) {
          foundmorning.is_selected = true
        }
        this.selectedSlot={
          type:'M',
          slot:slot
        }
        break;
      case 'A':
        this.afternoon.forEach(item => item.is_selected = false);
        const foundafternoon = this.afternoon.find(item => item.time == slot.time)
        if (foundafternoon) {
          foundafternoon.is_selected = true
        }
        this.selectedSlot={
          type:'A',
          slot:slot
        }
        break;
      case 'E':
        this.evening.forEach(item => item.is_selected = false);
        const foundevening = this.evening.find(item => item.time == slot.time)
        if (foundevening) {
          foundevening.is_selected = true
        }
        this.selectedSlot={
          type:'E',
          slot:slot
        }
        break;
      default:
    }
  }

  deleteSelectedSlot(){
     if(this.selectedSlot){
      switch (this.selectedSlot.type) {
          case 'M':
            this.morning = this.morning.filter(item=>item.time !== this.selectedSlot?.slot.time);
            this.deleteSlotEmitter.emit({slot:this.selectedSlot?.slot,section:'morning'})

          break;
          case 'A':
            this.afternoon = this.afternoon.filter(item=>item.time !== this.selectedSlot?.slot.time);
            this.deleteSlotEmitter.emit({slot:this.selectedSlot?.slot,section:'afternoon'})
          break;
          case 'E':
            this.evening = this.evening.filter(item=>item.time !== this.selectedSlot?.slot.time);
            this.deleteSlotEmitter.emit({slot:this.selectedSlot?.slot,section:'evening'})
          break;
      } 
      this.selectedSlot=undefined;   
     }
  }

  closemodal(){
    this.modalService.dismissAll();
    this.createSlotType = undefined;
    this.newSlot='';
  }

}
