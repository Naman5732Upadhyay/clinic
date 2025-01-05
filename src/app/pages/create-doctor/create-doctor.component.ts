import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Doctor } from '../../modals/doctor.modal';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.scss'
})
export class CreateDoctorComponent implements OnInit {
  doctorForm = new FormGroup({
      name: new FormControl('',Validators.required),
      qualification:new FormControl('',Validators.required),
      image_url: new FormControl('',[]),
      description:new FormControl('',Validators.required),
    });
  @Output() closeModal = new EventEmitter();
  @Output() createnewDoctor = new EventEmitter<Doctor>();
  constructor(private cd:ChangeDetectorRef){
  }

  ngOnInit(): void {
  }

  createDoctor(){
    if(this.doctorForm.invalid){
      this.doctorForm.markAllAsTouched();
      return;
    }
      const newDoc:any = this.doctorForm.value;
      this.createnewDoctor.emit(newDoc)
  }

  hasError(controlName: string, error: string) {
    const control = this.doctorForm.get(controlName);
    return control?.touched && control?.hasError(error);
  }

  closepoppup(){
    this.doctorForm.reset();
    this.closeModal.emit();
  }

}