import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateMaintenancePDF(data: any[], info: { linea: string, mecanico: string }) {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Header
    doc.setFontSize(14);
    doc.text('REGISTRO DE MANTENIMIENTO CORRECTIVO EN LINEA', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Línea: ${info.linea}`, 150, 25);
    doc.text(`Mecánico: ${info.mecanico}`, 150, 30);
    doc.text('COTTON KNIT', 180, 15, { align: 'right' });

    // Table
    autoTable(doc, {
      startY: 35,
      head: [['Fecha', 'D. Problema', 'E. Solución', 'Cod. Maq.', 'Hra Parada', 'Hra Termino', 'Firma Super']],
      body: data.map(item => [
        item.fecha,
        item.prob,
        item.sol,
        item.codMaq,
        item.hraParada,
        item.hraTermino,
        ''
      ]),
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1 },
      styles: { fontSize: 8, cellPadding: 2 }
    });

    // Legends (Calculated position)
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.text('DESCRIPCION DEL PROBLEMA', 14, finalY);
    // simplified list for the demo
    doc.setFontSize(7);
    doc.text('1) Salta Puntada  2) Varia Tensión  3) Rotura Hilo ...', 14, finalY + 5);

    doc.setFontSize(9);
    doc.text('SOLUCION DEL PROBLEMA', 14, finalY + 15);
    doc.text('1) Regula Alimentación  2) Regulador Tensión ...', 14, finalY + 20);

    doc.text('FO-026', 190, 280, { align: 'right' });

    doc.save(`Mantenimiento_${info.linea}_${new Date().toLocaleDateString()}.pdf`);
  }
}
