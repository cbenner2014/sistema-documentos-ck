package pe.edu.ck.ck.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inspeccion_detalles")
@Data
public class InspeccionDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String seccion;
    private String componente;
    private String estado; // OK, D, F
    private String observaciones;
}
