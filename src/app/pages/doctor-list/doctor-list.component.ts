import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from '../../modals/doctor.modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit {
  doctorList:Doctor[]=[];
  selectedDocindex:number|undefined|null;
  @Output() selectedDoctor =new EventEmitter<Doctor>();
  constructor(private doctorService:DoctorService,private modalService:NgbModal){}

  ngOnInit(): void {
    this.doctorService.getdoctorsList().subscribe(res=>{
      this.doctorList = res;
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
    this.modalService.dismissAll();
  }

  deleteDoc(doctor:Doctor){
    this.doctorList = this.doctorList.filter(item => item.id !== doctor.id);
    if(this.selectedDocindex === doctor.id){
    this.selectedDoctor.emit(undefined);
    }
  }

  closemodal(){
    this.modalService.dismissAll();
  }

}
