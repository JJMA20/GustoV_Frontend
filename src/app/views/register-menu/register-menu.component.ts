import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-register-menu',
  standalone: true,
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
    private fb: FormBuilder,
    private menuService: MenuService
  ) {
    this.menuForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
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
        this.menuService.actualizarMenu(formData).subscribe(
          response => {
            console.log('Menú actualizado exitosamente', response);
            this.activeModal.close(response);
          },
          error => {
            console.error('Error al actualizar el menú', error);
          }
        );
      } else {
        this.menuService.agregarMenu(formData).subscribe(
          response => {
            console.log('Menú agregado exitosamente', response);
            this.activeModal.close(response);
          },
          error => {
            console.error('Error al agregar el menú', error);
          }
        );
      }
    }
  }
}