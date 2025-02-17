import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterMenuComponent } from '../register-menu/register-menu.component';

@Component({
  selector: 'app-list-menu',
  imports: [CommonModule, NgbModule],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css'
})
export default class ListMenuComponent implements OnInit {
  
  comidas = [
    { id: 1, nombre: 'Ensalada', tipo: 'Vegetariana', descripcion: 'Ensalada fresca' },
    { id: 2, nombre: 'Pizza', tipo: 'Rápida', descripcion: 'Pizza de pepperoni' },
    { id: 3, nombre: 'Sopa', tipo: 'Caliente', descripcion: 'Sopa de pollo' },
    { id: 4, nombre: 'Tacos', tipo: 'Mexicana', descripcion: 'Tacos al pastor' },
    { id: 5, nombre: 'Pasta', tipo: 'Italiana', descripcion: 'Pasta con salsa de tomate' },
  ];
  
  currentPage = 1;
  pageSize = 5;
  totalPages = Math.ceil(this.comidas.length / this.pageSize);
  
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.updatePage();
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.comidas = this.comidas.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  editComida(comida: any) {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.comidaData = comida;
    
    modalRef.result.then((result) => {
      if (result) {
        this.updatePage();
      }
    }, (reason) => {
      console.log('Modal cerrado');
    });
  }

  deleteComida(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta comida?')) {
      this.comidas = this.comidas.filter(comida => comida.id !== id);
      this.updatePage();
    }
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'md',
      backdrop: 'static'
    });
    
    modalRef.result.then((result) => {
      if (result) {
        this.comidas.push(result);
        this.updatePage();
      }
    }, (reason) => {
      console.log('Modal cerrado');
    });
  }
}
