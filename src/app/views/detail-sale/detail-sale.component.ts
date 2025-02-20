import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SaleService } from '../../core/services/sale.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-sale.component.html',
  styleUrl: './detail-sale.component.css'
})
export class DetailSaleComponent implements OnInit {

  @Input() id!: number; // ID de la venta
  venta: any = null; // Datos de la venta

  constructor(
    public activeModal: NgbActiveModal,
    private ventaService: SaleService
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      console.error('No se recibió un ID de venta.');
      return;
    }

    this.obtenerDetalleVenta();
  }

  obtenerDetalleVenta() {
    this.ventaService.obtenerVentaById(this.id).subscribe(
      (data) => {
        this.venta = data;
        console.log('Venta obtenida:', this.venta);
      },
      (error) => {
        console.error('Error al obtener la venta:', error);
      }
    );
  }
}
