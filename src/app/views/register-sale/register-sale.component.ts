import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../core/services/menu.service';
import { SaleService } from '../../core/services/sale.service';

interface Pedido {
  menuId: number;
  cantidad: number;
}

@Component({
  selector: 'app-register-sale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-sale.component.html',
  styleUrl: './register-sale.component.css'
})
export class RegisterSaleComponent implements OnInit {

  comidas: any[] = [];
  pedidos: Pedido[] = [];
  totalVenta: number = 0;

  menuForm: FormGroup;
  ventaForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private menuService: MenuService,
    private ventaService: SaleService
  ) {
    this.menuForm = this.fb.group({
      menu: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });

    this.ventaForm = this.fb.group({
      metodoPago: ['qr', Validators.required] // Valor por defecto: "qr"
    });
  }
  
  ngOnInit() {
    this.listarMenus();
  }

  listarMenus() {
    this.menuService.obtenerMenus().subscribe(menus => {
      this.comidas = menus;
    }, error => {
      console.error('Error al obtener los menús', error);
    });
  }

  getSelectedMenu(menuId: number) {
    return this.comidas.find(m => m.id === menuId);
  }

  agregarPedido() {
    if (this.menuForm.invalid) return;

    const menuId = this.menuForm.get('menu')?.value;
    const cantidad = this.menuForm.get('cantidad')?.value;

    if (menuId && cantidad > 0) {
      this.pedidos.push({ menuId, cantidad });
      this.menuForm.reset({ menu: null, cantidad: 1 });
    }
  }

  eliminarPedido(index: number) {
    this.pedidos.splice(index, 1);
  }

  guardarVenta() {
    if (this.pedidos.length === 0) return;

    const venta = {
      metodoPago: this.ventaForm.get('metodoPago')?.value,
      detalles: this.pedidos
    };

    // Enviar al backend
    this.ventaService.registrarVenta(venta).subscribe(
      response => {
        console.log('Venta registrada exitosamente:', response);
        this.activeModal.close(response);
      },
      error => {
        console.error('Error al registrar la venta:', error);
      }
    );
  }
}
