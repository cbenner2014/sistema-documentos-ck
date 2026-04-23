import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LucideLayoutDashboard, LucidePlus, LucideSearch, LucideFileText, LucideSave } from '@lucide/angular';
import { StockAgujas } from '../../../models/entities.models';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-stock-agujas-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    LucidePlus, 
    LucideSearch, 
    LucideFileText,
    LucideSave
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Clasificación de Agujas</h1>
          <p class="subtitle">Gestión y control de inventario de agujas</p>
        </div>
        <div class="actions">
          <button mat-flat-button class="premium-btn" (click)="toggleForm()">
            <svg lucidePlus></svg>
            {{ showForm ? 'Cerrar Registro' : 'Nuevo Registro' }}
          </button>
        </div>
      </div>

      <!-- New Record Form -->
      <div class="form-container glass-card mb-6" *ngIf="showForm">
        <h3>Llenado de Clasificación de Agujas</h3>
        <div class="form-grid">
           <mat-form-field appearance="outline">
             <mat-label>Fecha</mat-label>
             <input matInput type="date" [(ngModel)]="newRecord.fecha">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Línea</mat-label>
             <input matInput [(ngModel)]="newRecord.linea">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Cliente</mat-label>
             <input matInput [(ngModel)]="newRecord.cliente">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Cant. Recta</mat-label>
             <input matInput type="number" [(ngModel)]="newRecord.tipoRecta" (input)="updateTotal()">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Cant. Remalle</mat-label>
             <input matInput type="number" [(ngModel)]="newRecord.tipoRemalle" (input)="updateTotal()">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Cant. Recubierto</mat-label>
             <input matInput type="number" [(ngModel)]="newRecord.tipoRecubierto" (input)="updateTotal()">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Cant. Especiales</mat-label>
             <input matInput type="number" [(ngModel)]="newRecord.tipoEspeciales" (input)="updateTotal()">
           </mat-form-field>
           <div class="total-display">
             <label>Total:</label>
             <span>{{ newRecord.total }}</span>
           </div>
        </div>
        <div class="form-actions">
           <button mat-flat-button color="primary" (click)="saveRecord()" class="save-btn" [disabled]="!isFormValid()">
             <svg lucideSave class="mr-2 h-4 w-4"></svg>
             Guardar en Sistema
           </button>
        </div>
      </div>

      <div class="filter-bar glass-card">
        <div class="search-input">
          <svg lucideSearch></svg>
          <input type="text" placeholder="Buscar por cliente o línea..." (input)="applyFilter($event)">
        </div>
      </div>

      <div class="table-container glass-card">
        <table mat-table [dataSource]="dataSource" class="premium-table">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha </th>
            <td mat-cell *matCellDef="let element"> {{element.fecha}} </td>
          </ng-container>

          <ng-container matColumnDef="cliente">
            <th mat-header-cell *matHeaderCellDef> Cliente </th>
            <td mat-cell *matCellDef="let element"> 
              <span class="client-badge">{{element.cliente}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="linea">
            <th mat-header-cell *matHeaderCellDef> Línea </th>
            <td mat-cell *matCellDef="let element"> {{element.linea}} </td>
          </ng-container>

          <ng-container matColumnDef="tipos">
            <th mat-header-cell *matHeaderCellDef> Recta | Remalle | Recub. | Espec. </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="types-grid">
                <span>{{element.tipoRecta}}</span>
                <span>{{element.tipoRemalle}}</span>
                <span>{{element.tipoRecubierto}}</span>
                <span>{{element.tipoEspeciales}}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef> Total </th>
            <td mat-cell *matCellDef="let element" class="total-cell"> {{element.total}} </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="accent">
                <svg lucideFileText></svg>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;}
    .page-header { display: flex; justify-content: space-between; align-items: center; }
    .title-section h1 { font-size: 2rem; margin: 0; }
    .subtitle { color: #64748b; margin: 0; }
    .filter-bar { padding: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .search-input { display: flex; align-items: center; gap: 10px; background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 10px; flex: 1; }
    .search-input input { background: transparent; border: none; outline: none; width: 100%; color: #1e293b; }
    .search-input svg { width: 18px; color: #94a3b8; }
    
    .form-container { padding: 1.5rem; border: 2px solid rgba(79, 70, 229, 0.2); margin-bottom: 2rem;}
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; align-items: center; }
    .total-display { display: flex; flex-direction: column; align-items: center; }
    .total-display label { font-size: 0.7rem; font-weight: 800; color: #64748b; }
    .total-display span { font-size: 1.5rem; font-weight: 800; color: #4f46e5; }
    .form-actions { display: flex; justify-content: flex-end; margin-top: 1rem; }

    .table-container { overflow: hidden; padding: 0; }
    .premium-table { width: 100%; background: transparent !important; }
    .mat-mdc-header-cell { background: rgba(15, 23, 42, 0.02); color: #475569; font-weight: 600; font-size: 0.85rem; padding: 16px !important; }
    .mat-mdc-cell { padding: 16px !important; color: #1e293b; font-size: 0.9rem; border-bottom: 1px solid rgba(226, 232, 240, 0.5); }
    
    .client-badge { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 0.8rem; }
    .types-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-family: monospace; color: #64748b; }
    .total-cell { font-weight: 800; color: #4f46e5; }
    
    .premium-btn { border-radius: 12px !important; padding: 0 20px !important; height: 48px !important; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); font-weight: 600; color: white !important;}
    .save-btn { background: #059669 !important; color: white !important; font-weight: 600; }
    .save-btn:disabled { background: #94a3b8 !important; }
  `]
})
export class StockAgujasListComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'cliente', 'linea', 'tipos', 'total', 'acciones'];
  dataSource: StockAgujas[] = [];
  allData: StockAgujas[] = [];
  showForm = false;

  newRecord: StockAgujas = {
    fecha: new Date().toISOString().split('T')[0],
    linea: '',
    cliente: '',
    tipoRecta: 0,
    tipoRemalle: 0,
    tipoRecubierto: 0,
    tipoEspeciales: 0,
    total: 0
  };

  constructor(
    private apiService: ApiService, 
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.listarStockAgujas().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.dataSource = data;
          this.allData = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error(err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  updateTotal() {
    this.newRecord.total = (this.newRecord.tipoRecta || 0) + 
                          (this.newRecord.tipoRemalle || 0) + 
                          (this.newRecord.tipoRecubierto || 0) + 
                          (this.newRecord.tipoEspeciales || 0);
  }

  isFormValid() {
    return this.newRecord.fecha && this.newRecord.cliente && this.newRecord.linea && this.newRecord.total > 0;
  }

  saveRecord() {
    this.apiService.guardarStockAgujas(this.newRecord).subscribe({
      next: (res) => {
        this.snackBar.open('Stock actualizado correctamente', 'OK', { duration: 3000 });
        this.loadData();
        this.showForm = false;
        this.resetForm();
      },
      error: (err) => {
        this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 });
      }
    });
  }

  resetForm() {
    this.newRecord = {
      fecha: new Date().toISOString().split('T')[0],
      linea: '',
      cliente: '',
      tipoRecta: 0,
      tipoRemalle: 0,
      tipoRecubierto: 0,
      tipoEspeciales: 0,
      total: 0
    };
  }

  applyFilter(event: Event) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.allData.filter(x => 
      x.cliente?.toLowerCase().includes(val) || 
      x.linea?.toLowerCase().includes(val)
    );
  }
}
