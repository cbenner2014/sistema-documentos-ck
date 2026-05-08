package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.ck.ck.entity.ReporteMantenimiento;
import java.util.List;

@Repository
public interface ReporteMantenimientoRepository extends JpaRepository<ReporteMantenimiento, Integer> {
    // Útil para filtrar reportes por máquina específica
    List<ReporteMantenimiento> findByMaquinaId(String maquinaId);
    void deleteByBatchId(String batchId);
}