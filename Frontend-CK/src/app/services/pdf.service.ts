import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  /**
   * Generates IND-MEC-01 Inspection Report (PERFECT 1:1 REPLICA)
   * Supports single inspection for compatibility
   */
  generateInspectionPDF(inspection: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    this.drawInspectionPage(doc, inspection);
    doc.save(`IND-MEC-01_${inspection.codigoMaquina || 'SN'}.pdf`);
  }

  /**
   * Generates IND-MEC-01 Inspection Report (BATCH MODE)
   */
  generateInspectionBatchPDF(inspections: any[]) {
    const doc = new jsPDF('p', 'mm', 'a4');
    inspections.forEach((inspection, index) => {
      if (index > 0) doc.addPage();
      this.drawInspectionPage(doc, inspection);
    });
    doc.save(`INS_BATCH_${new Date().getTime()}.pdf`);
  }

  private drawInspectionPage(doc: jsPDF, inspection: any) {
    const margin = 10;
    const pageWidth = 210;
    const tableWidth = pageWidth - (margin * 2);
    
    // External Border
    doc.setLineWidth(0.6);
    doc.rect(margin, margin, tableWidth, 277);

    // HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text('INSPECCION DE MAQUINAS DE CONFECCION  (IND-MEC-01)', 105, 20, { align: 'center' });
    
    // Logo "COTTON KNIT"
    doc.setFontSize(10);
    doc.text('COTTON KNIT', 195, 18, { align: 'right' });

    // GRID INFO
    const gridY = 28;
    const rowH = 6.5;
    const col1W = 75;
    const col2W = 60;
    const col3W = tableWidth - col1W - col2W;

    doc.setLineWidth(0.2);
    doc.setFontSize(8.5);

    const drawGridCell = (label: string, value: any, x: number, y: number, w: number, divX: number) => {
      doc.rect(x, y, w, rowH);
      doc.setFont("helvetica", "bold");
      doc.text(label, x + 2, y + 4.5);
      doc.line(x + divX, y, x + divX, y + rowH);
      doc.setFont("helvetica", "normal");
      doc.text(String(value || ''), x + divX + 2, y + 4.5);
    };

    drawGridCell('Fecha', inspection.fecha, margin, gridY, col1W, 45);
    
    let curY = gridY + rowH;
    drawGridCell('Código Maquina', inspection.codigoMaquina, margin, curY, col1W, 45);
    drawGridCell('Marca/Motor', inspection.marcaMotor, margin + col1W, curY, col2W, 25);
    drawGridCell('Línea', inspection.linea, margin + col1W + col2W, curY, col3W, 25);

    curY += rowH;
    drawGridCell('Modelo', inspection.modeloCabezal, margin, curY, col1W, 45);
    drawGridCell('Modelo', inspection.modeloMotor, margin + col1W, curY, col2W, 25);
    drawGridCell('Mecánico', inspection.mecanico, margin + col1W + col2W, curY, col3W, 25);

    curY += rowH;
    drawGridCell('Serie Cabezal', inspection.serieCabezal, margin, curY, col1W, 45);
    drawGridCell('Serie Motor', inspection.serieMotor, margin + col1W, curY, col2W, 25);
    drawGridCell('Código Mecánico', inspection.codigoMecanico, margin + col1W + col2W, curY, col3W, 35);

    // TABLES LOGIC
    const drawSectionTable = (title: string, subtitle: string, details: any[] = [], startY: number) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(title, margin + 2, startY);
      if(subtitle) {
        doc.setFontSize(7.5);
        doc.text(subtitle, margin + 65, startY);
      }

      autoTable(doc, {
        startY: startY + 1,
        margin: { left: margin, right: margin },
        head: [['', 'OK', 'D', 'F', 'observaciones y # de parte']],
        body: details.map((d: any) => [
          d.componente,
          d.estado === 'OK' ? 'X' : '',
          d.estado === 'D' ? 'X' : '',
          d.estado === 'F' ? 'X' : '',
          d.observaciones || ''
        ]),
        theme: 'grid',
        styles: { fontSize: 7.5, cellPadding: 1, halign: 'left' },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, halign: 'center', fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 45, fontStyle: 'bold' },
          1: { cellWidth: 10, halign: 'center' },
          2: { cellWidth: 10, halign: 'center' },
          3: { cellWidth: 10, halign: 'center' },
          4: { cellWidth: 115 }
        }
      });
      return (doc as any).lastAutoTable.finalY;
    };

    const safeDetalles = inspection.detalles || [];

    curY = gridY + (rowH * 4) + 5;
    curY = drawSectionTable('LIMPIEZA E INSPECCION DE CABEZALES', '', safeDetalles.filter((d:any)=>d.seccion==='CABEZALES'), curY);
    
    curY += 4;
    curY = drawSectionTable('REAJUSTE Y REVISION DE TORNILLOS', '(Revisar si hay residuo de Hollín)', safeDetalles.filter((d:any)=>d.seccion==='TORNILLOS'), curY);

    curY += 4;
    curY = drawSectionTable('FILTRO Y CAMBIO DE ACEITE', '(Revisar si hay fugas de aceite y comprobar lubricación)', safeDetalles.filter((d:any)=>d.seccion==='ACEITE'), curY);

    curY += 4;
    curY = drawSectionTable('LIMPIEZA DE MOTORES', '', safeDetalles.filter((d:any)=>d.seccion==='MOTORES'), curY);

    // FOOTER
    curY += 6;
    doc.setFont("helvetica", "bold");
    doc.text('COMENTARIOS Y OBSERVACIONES:', margin + 2, curY);
    doc.line(margin + 60, curY + 1, margin + 195, curY + 1);
    doc.line(margin + 2, curY + 6, margin + 195, curY + 6);
    doc.setFont("helvetica", "normal");
    doc.text(String(inspection.observaciones || 'Se limpia cabezal y motor con aire comprimido'), margin + 62, curY);

    curY += 12;
    doc.setFont("helvetica", "bold");
    doc.text('PRUEBA DE COSTURA:', margin + 2, curY);
    doc.rect(margin + 45, curY - 4, 6, 6);
    if(inspection.pruebaCostura !== false) doc.text('X', margin + 46.5, curY - 0.5);
    doc.text('CONFORME', margin + 55, curY);

    curY += 8;
    doc.text('OBSERVACIONES:', margin + 2, curY);
    doc.line(margin + 35, curY + 1, margin + 195, curY + 1);

    curY += 8;
    doc.text('Revisado por:', margin + 2, curY);
    doc.rect(margin + 35, curY - 4, 100, 6);
    doc.setFont("helvetica", "normal");
    doc.text(String(inspection.revisadoPor || ''), margin + 37, curY);

    // Legends
    curY += 12;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text('OK=CONFORME', margin + 40, curY);
    doc.text('D=DESGATE', margin + 90, curY);
    doc.text('F=FALTANTE', margin + 140, curY);
    doc.text('FO525', 195, curY + 5, { align: 'right' });
  }

  /**
   * Generates FO-026 Maintenance Report
   */
  generateMaintenancePDF(data: any[], info: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 10;
    const pageWidth = 210;
    const tableWidth = pageWidth - (margin * 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('REGISTRO DE MANTENIMIENTO CORRECTIVO EN LINEA', 105, 15, { align: 'center' });
    doc.text('COTTON KNIT', 195, 15, { align: 'right' });

    doc.setFontSize(10);
    doc.text(`Línea: ${info.linea || '__________'}`, 195, 22, { align: 'right' });
    doc.text(`Mecánico: ${info.mecanico || '__________'}`, 195, 27, { align: 'right' });

    autoTable(doc, {
      startY: 32,
      margin: { left: margin, right: margin },
      head: [['Fecha', 'D. Problema', 'E. Solución', 'Cod. Maq.', 'Hra Parada', 'Hra Termino', 'Firma Super']],
      body: data.map(d => [
        d.fecha,
        d.catalogoError?.id || d.prob || '',
        d.catalogoError?.id || d.sol || '',
        d.maquinaId || d.codMaq || '',
        d.horaParada || d.hraParada || '',
        d.horaTermino || d.hraTermino || '',
        ''
      ]),
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1, halign: 'center' },
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], lineWidth: 0.1 },
      columnStyles: {
        0: { cellWidth: 25 }, 1: { cellWidth: 22 }, 2: { cellWidth: 22 }, 3: { cellWidth: 25 }, 4: { cellWidth: 25 }, 5: { cellWidth: 25 }, 6: { cellWidth: 25 }
      }
    });

    let currentY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.text('✓  DESCRIPCION DEL PROBLEMA', margin, currentY);
    doc.text('✓  SOLUCION DEL PROBLEMA', margin, currentY + 50);

    const problems = ["1) Salta Puntada", "2) Varia Tensión", "3) Rotura Hilo", "4) Revirado", "5) Acordonado", "6) Contraste (Ojitos)", "7) Rotura De Aguja", "8) Graduación De Maquina", "9) Regulación De Pedal", "10) Embolsado", "11) Variación De Pestaña", "12) Sale Hueco", "13) Sale Dientes", "14) Rectificación De Placa", "15) Sale Orillado", "16) No Cazada", "17) Tensión Ajustada", "18) Soldar Guía Prénsatela", "19) Pica Tejido (Tela)", "20) Salto De Puntada", "21) Motor Ruidoso", "22) Repuesto Defectuoso", "23) Cambio De Modelo", "24) Mancha Aceite"];
    const solutions = ["1) Regula Alimentación", "2) Regulador De Tensión", "3) Cambiar De Aguja", "4) Se Bajó Diferencial", "5) Se Suelta Tensión", "6) Se Graduó Tensión", "7) Se Cambió De Placa", "8) Cambio De Prénsatela", "9) Se Ajustó Pedal", "10) Regular Deferencial", "11) Cambio Prénsatela", "12) Se Cambió La Aguja", "13) Corregir Al Guiador", "14) Para Cerrado", "15) Regular Tensión", "16) Afiliar Cuchilla", "17) Se Suelta Tensiones", "18) Para Cerrado", "19) Cambio De Aguja", "20) Regulación De Garfio", "21) Graduar Motor", "22) Maquina Mal Graduada", "23) Mover Línea", "24) Limpieza De Maquina"];

    const drawLegends = (list: string[], startY: number) => {
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      const colW = 60;
      for (let i = 0; i < list.length; i++) {
        const col = Math.floor(i / 8);
        const row = i % 8;
        doc.text(list[i], margin + (col * colW), startY + 5 + (row * 4));
      }
    };

    drawLegends(problems, currentY);
    drawLegends(solutions, currentY + 50);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text('FO-026', 195, 285, { align: 'right' });
    doc.save(`FO-026_Reporte.pdf`);
  }

  generateStockPDF(data: any[]) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 10;
    const pageWidth = 210;
    const tableWidth = pageWidth - (margin * 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text('REPORTE DE STOCK DE AGUJAS', 105, 18, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text('COTTON KNIT - Control de Clasificación de Agujas', 105, 23, { align: 'center' });

    autoTable(doc, {
      startY: 28,
      margin: { left: margin, right: margin },
      head: [['Fecha', 'Cliente', 'Línea', 'Recta', 'Remalle', 'Recubierto', 'Especiales', 'Total']],
      body: data.map(d => [
        d.fecha, 
        d.cliente?.toUpperCase() || '', 
        d.linea || '', 
        d.tipoRecta ?? 0, 
        d.tipoRemalle ?? 0, 
        d.tipoRecubierto ?? 0, 
        d.tipoEspeciales ?? 0, 
        d.total ?? 0
      ]),
      theme: 'grid',
      styles: { fontSize: 8.5, cellPadding: 2, halign: 'center', valign: 'middle' },
      headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontStyle: 'bold', lineWidth: 0.1 },
      columnStyles: {
        0: { cellWidth: 22 },
        1: { cellWidth: 35, halign: 'left' },
        2: { cellWidth: 35, halign: 'left' },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 18 },
        6: { cellWidth: 18 },
        7: { cellWidth: 15, fontStyle: 'bold', textColor: [79, 70, 229] }
      }
    });
    
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    if (finalY < 280) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text('FO-027 / CLASIFICACIÓN DE AGUJAS', 195, 287, { align: 'right' });
    }

    doc.save('Reporte_Stock_Agujas.pdf');
  }
}
