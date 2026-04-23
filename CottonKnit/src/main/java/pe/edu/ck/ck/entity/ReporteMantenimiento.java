package pe.edu.ck.ck.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reporte_mantenimiento")
@Data
public class ReporteMantenimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true)
    @JsonProperty("usuario")
    private Usuario usuario;

    @Column(name = "maquina_id")
    @JsonProperty("maquinaId")
    private String maquinaId;

    @ManyToOne
    @JoinColumn(name = "catalogo_error_id")
    @JsonProperty("catalogoError")
    private CatalogoError catalogoError;

    @Column(name = "hora_parada")
    @JsonProperty("horaParada")
    private LocalTime horaParada;

    @Column(name = "hora_termino")
    @JsonProperty("horaTermino")
    private LocalTime horaTermino;
}