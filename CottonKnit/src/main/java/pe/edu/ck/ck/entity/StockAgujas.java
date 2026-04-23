package pe.edu.ck.ck.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "stock_agujas")
@Data
public class StockAgujas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate fecha; // Fecha del registro (ej: 3-02-26)

    private String linea; // Ej: "muestras"

    private String cliente; // Ej: "Lacoste" [cite: 3]

    @Column(name = "tipo_recta")
    private Integer tipoRecta; // Stock inicial 100

    @Column(name = "tipo_remalle")
    private Integer tipoRemalle; // Stock inicial 100

    @Column(name = "tipo_recubierto")
    private Integer tipoRecubierto; // Stock inicial 120

    @Column(name = "tipo_especiales")
    private Integer tipoEspeciales; // Stock inicial 20

    private Integer total; // Suma total (ej: 340)

    @Column(columnDefinition = "TEXT")
    private String observaciones;
}