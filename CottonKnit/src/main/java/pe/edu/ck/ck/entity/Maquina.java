package pe.edu.ck.ck.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "maquinas")
@Data
public class Maquina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String codigo;

    private String linea;
    private String marca;
    private String modelo;
    private String serie;
    
    // Datos del Motor
    private String marcaMotor;
    private String modeloMotor;
    private String serieMotor;

    // Fechas de seguimiento (basado en tus fotos)
    private String fechaPreventivo;
    private String fechaCambioAceite;

    private boolean activa = true;
}
