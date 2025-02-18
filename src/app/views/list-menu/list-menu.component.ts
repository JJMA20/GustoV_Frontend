import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterMenuComponent } from '../register-menu/register-menu.component';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [CommonModule, NgbModule], // Agregar HttpClientModule aquí
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export default class ListMenuComponent implements OnInit {

  comidas: any[] = []; // Lista completa de comidas obtenidas del servicio
  currentPage = 1; // Página actual
  pageSize = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  paginatedComidas: any[] = []; // Lista de comidas para la página actual

  constructor(
    private modalService: NgbModal, 
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadMenus(); // Cargar los menús al inicio
  }

  loadMenus() {
    this.menuService.obtenerMenus().subscribe(menus => {
      this.comidas = menus; // Guardar la lista completa de comidas
      this.totalPages = Math.ceil(this.comidas.length / this.pageSize); // Calcular el total de páginas
      this.updatePage(); // Actualizar la página actual con la lista correcta
    }, error => {
      console.error('Error al obtener los menús', error);
    });
  }

  updatePage() {
    // Calcular los índices de inicio y fin para la página actual
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // Obtener las comidas de la página actual
    this.paginatedComidas = this.comidas.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    // Asegurarse de que la página esté dentro del rango válido
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page; // Establecer la página actual
    this.updatePage(); // Actualizar los datos para la página actual
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
        this.loadMenus(); // Recargar los menús al guardar cambios
      }
    }, () => console.log('Modal cerrado'));
  }

  deleteComida(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta comida?')) {
      this.menuService.eliminarMenu(id).subscribe(
        () => {
          console.log('Menú eliminado exitosamente');
          this.loadMenus(); // Recargar la lista
        },
        error => {
          console.error('Error al eliminar el menú', error);
        }
      );
    }
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'md',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      if (result) {
        this.loadMenus(); // Recargar los menús al registrar uno nuevo
      }
    }, () => console.log('Modal cerrado'));
  }
}
