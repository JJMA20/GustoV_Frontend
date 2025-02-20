import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterMenuComponent } from '../register-menu/register-menu.component';
import { MenuService } from '../../core/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export default class ListMenuComponent implements OnInit {

  comidas: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  paginatedComidas: any[] = [];

  constructor(
    private modalService: NgbModal, 
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.obtenerMenus();
  }

  obtenerMenus() {
    this.menuService.obtenerMenus().subscribe(menus => {
      this.comidas = menus;
      this.totalPages = Math.ceil(this.comidas.length / this.pageSize);
      this.updatePage();
    }, error => {
      console.error('Error al obtener los menús', error);
    });
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedComidas = this.comidas.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  editPlato(comida: any) {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.comidaData = comida;

    modalRef.result.then((result) => {
      if (result) {
        this.obtenerMenus();
      }
    }, () => console.log('Modal cerrado'));
  }

  deletePlato(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.eliminarMenu(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'El menú ha sido eliminado exitosamente.',
              'success'
            );
            this.obtenerMenus();
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el menú.',
              'error'
            );
            console.error('Error al eliminar el menú', error);
          }
        );
      }
    });
  }
  

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'md',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      if (result) {
        this.obtenerMenus();
      }
    }, () => console.log('Modal cerrado'));
  }
}
