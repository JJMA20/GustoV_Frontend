import { Component } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-daily',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-daily.component.html',
  styleUrl: './report-daily.component.css'
})
export default class ReportDailyComponent {
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  reporte: any = null;
  mensajeError: string = '';

  constructor(private reporteService: ReportService) {}

  obtenerReporte() {
    this.reporteService.obtenerReporteDiario(this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.reporte = data;
        console.log('Lista de reporte: ', this.reporte);
        
        this.mensajeError = '';
      },
      error: (err) => {
        this.reporte = null;
        this.mensajeError = err.error?.mensaje || 'Error al obtener el reporte.';
      },
    });
  }

  descargarExcel() {
    this.reporteService.descargarReporteDiarioExcel(this.fechaSeleccionada).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte_Ventas_${this.fechaSeleccionada}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
