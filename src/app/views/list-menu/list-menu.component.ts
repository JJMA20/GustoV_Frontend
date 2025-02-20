import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterMenuComponent } from '../register-menu/register-menu.component';
import { MenuService } from '../../core/services/menu.service';

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
    this.loadMenus();
  }

  loadMenus() {
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

  editComida(comida: any) {
    const modalRef = this.modalService.open(RegisterMenuComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.comidaData = comida;

    modalRef.result.then((result) => {
      if (result) {
        this.loadMenus();
      }
    }, () => console.log('Modal cerrado'));
  }

  deleteComida(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta comida?')) {
      this.menuService.eliminarMenu(id).subscribe(
        () => {
          console.log('Menú eliminado exitosamente');
          this.loadMenus();
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
        this.loadMenus();
      }
    }, () => console.log('Modal cerrado'));
  }
}
