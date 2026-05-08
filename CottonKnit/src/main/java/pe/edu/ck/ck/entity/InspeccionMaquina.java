package pe.edu.ck.ck.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "inspeccion_maquinas")
@Data
public class InspeccionMaquina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate fecha;
    
    @JsonProperty("codigoMaquina")
    private String codigoMaquina;
    
    @JsonProperty("marcaMotor")
    private String marcaMotor;
    
    @JsonProperty("linea")
    private String linea;
    
    @JsonProperty("modeloCabezal")
    private String modeloCabezal;

    @JsonProperty("modeloMotor")
    private String modeloMotor;
    
    @JsonProperty("serieCabezal")
    private String serieCabezal;
    
    @JsonProperty("serieMotor")
    private String serieMotor;
    
    @JsonProperty("mecanico")
    private String mecanico;
    
    @JsonProperty("codigoMecanico")
    private String codigoMecanico;
    
    @Column(name = "batch_id")
    private String batchId;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    private Boolean pruebaCostura;
    private String revisadoPor;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "inspeccion_id")
    private List<InspeccionDetalle> detalles;
}
