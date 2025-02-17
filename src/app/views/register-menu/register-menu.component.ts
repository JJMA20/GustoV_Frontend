import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-menu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-menu.component.html',
  styleUrl: './register-menu.component.css'
})
export class RegisterMenuComponent implements OnInit {
  @Input() editMode = false;
  @Input() comidaData: any;
  
  menuForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.menuForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.editMode && this.comidaData) {
      this.menuForm.patchValue(this.comidaData);
    }
  }

  guardar() {
    if (this.menuForm.valid) {
      const formData = this.menuForm.value;
      if (this.editMode) {
        formData.id = this.comidaData.id;
      } else {
        formData.id = Date.now();
      }
      this.activeModal.close(formData);
    }
  }

}
