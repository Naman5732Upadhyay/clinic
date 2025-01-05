import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Doctor } from '../../modals/doctor.modal';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.scss'
})
export class CreateDoctorComponent implements OnInit {
  doctorForm: UntypedFormGroup;
  @Output() closeModal = new EventEmitter();
  @Output() createnewDoctor = new EventEmitter<Doctor>();
  constructor(private cd:ChangeDetectorRef){
    this.doctorForm = new FormGroup({
      name: new FormControl('',Validators.required),
      qualification:new FormControl('',Validators.required),
      image_url: new FormControl('',[]),
      description:new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
  }

  createDoctor(){
    if(this.doctorForm.invalid){
      this.markAllAsTouched();
    }else {
      const newDoc:Doctor = this.doctorForm.value;
      this.createnewDoctor.emit(newDoc)
    }
  }

  markAllAsTouched(): void {
    Object.values(this.doctorForm.controls).forEach(control => {
      if(control.invalid){
      control.markAsTouched();
      control.markAsDirty();
      }
    });
  }

  closepoppup(){
    this.doctorForm.reset();
    this.closeModal.emit();
  }

}