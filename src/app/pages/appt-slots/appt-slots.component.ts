import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Doctor } from '../../modals/doctor.modal';
import { DoctorService } from '../doctor-list/doctor.service';
import { Slot } from '../../modals/slot.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appt-slots',
  templateUrl: './appt-slots.component.html',
  styleUrl: './appt-slots.component.scss'
})
export class ApptSlotsComponent implements OnInit,OnChanges,OnDestroy {
 @Input() selectedDoc:Doctor|undefined;
 @Input() newSlot:{slot:Slot,section:string}|undefined;
 @Input() deletedSlot:{slot:Slot,section:string}|undefined;
 @Output() bookSlotemitter = new EventEmitter<Slot>();
 morning:Slot[]=[];
 evening:Slot[]=[];
 afternoon:Slot[]=[];
 selectedSlot:{
  type:string,
  slot:Slot
 }|undefined;
 subscriberallSlots: Subscription | undefined;
  constructor(private doctorService:DoctorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedDoc){
      this.morning.forEach(item => item.is_selected = false);
      this.evening.forEach(item => item.is_selected = false);
      this.afternoon.forEach(item => item.is_selected = false);
    };
    if(this.newSlot){
         switch (this.newSlot.section.toLocaleLowerCase()){
          case 'morning':
            this.morning.push(this.newSlot.slot);
          break;

          case 'afternoon':
            this.afternoon.push(this.newSlot.slot);
          break;

          case 'evening':
            this.evening.push(this.newSlot.slot);
          break;

         }
    }
    if(this.deletedSlot){
      switch (this.deletedSlot.section.toLocaleLowerCase()){
       case 'morning':
        this.morning = this.morning.filter(item=>item.time !== this.deletedSlot?.slot.time);
        break;

       case 'afternoon':
        this.afternoon = this.afternoon.filter(item=>item.time !== this.deletedSlot?.slot.time);
        break;

       case 'evening':
        this.evening = this.evening.filter(item=>item.time !== this.deletedSlot?.slot.time);
        break;

      }
 }
  }

  ngOnInit(): void {
    this.subscriberallSlots = this.doctorService.getallSlots().subscribe(resp=>{
      this.morning =resp?.morning?.slots;
      this.evening =resp?.evening?.slots;
      this.afternoon =resp?.afternoon?.slots;
    });
  }

  selectSlot(slot: Slot, type: string) {
    if(slot.is_occupied){
      return;
    }
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

  bookApointment(){
    if(!this.selectedSlot){
      return
    }
    this.morning.forEach(item => item.is_selected = false);
    this.evening.forEach(item => item.is_selected = false);
    this.afternoon.forEach(item => item.is_selected = false);
     switch (this.selectedSlot?.type){
         case 'M':
          const foundmorning = this.morning.find(item => item.time == this.selectedSlot?.slot.time)
        if (foundmorning) {
          foundmorning.is_occupied = true
        }
        break;
        case 'A':
        this.afternoon.forEach(item => item.is_selected = false);
        const foundafternoon = this.afternoon.find(item => item.time == this.selectedSlot?.slot.time)
        if (foundafternoon) {
          foundafternoon.is_occupied = true
        }
        break;
        case 'E':
        this.evening.forEach(item => item.is_selected = false);
        const foundevening = this.evening.find(item => item.time == this.selectedSlot?.slot.time)
        if (foundevening) {
          foundevening.is_occupied = true
        }
        break;
     }
     this.bookSlotemitter.emit(this.selectedSlot.slot);
     this.selectedSlot = undefined;
  }

  ngOnDestroy(): void {
    if(this.subscriberallSlots){this.subscriberallSlots.unsubscribe()};
  }

}
