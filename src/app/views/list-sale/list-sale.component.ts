import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterSaleComponent } from '../register-sale/register-sale.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from '../../core/services/sale.service';
import { DetailSaleComponent } from '../detail-sale/detail-sale.component';

@Component({
  selector: 'app-list-sale',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './list-sale.component.html',
  styleUrl: './list-sale.component.css'
})
export default class ListSaleComponent implements OnInit{

  ventas: any[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  paginatedVentas: any[] = [];

  constructor(
    private modalService: NgbModal, 
    private ventaService: SaleService, 
  ) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.ventaService.obtenerVentas().subscribe(venta => {
      this.ventas = venta;
      this.totalPages = Math.ceil(this.ventas.length / this.pageSize);
      this.updatePage();
    }, error => {
      console.error('Error al obtener los menús', error);
    });
  }
  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedVentas= this.ventas.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterSaleComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(
      (result) => {
        if (result) {
          this.obtenerVentas();
          console.log('Venta Guardada:', result);
        }
      },
      () => {} 
    );
  }

  openDetalleVentaModal(id: number) {
    const modalRef = this.modalService.open(DetailSaleComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  
    if (modalRef.componentInstance) {
      modalRef.componentInstance.id = id;
    } else {
      console.error('No se pudo asignar el ID al modal de detalle de venta.');
    }
  }
  

}
