package pe.edu.ck.ck.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "catalogo_errores")
@Data
public class CatalogoError {
    @Id
    private Integer id; // Usaremos el ID manual (1, 2, 3...) del PDF

    @Column(name = "descripcion_problema")
    private String descripcionProblema;

    @Column(name = "descripcion_solucion")
    private String descripcionSolucion;
}