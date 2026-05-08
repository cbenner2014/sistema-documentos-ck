package pe.edu.ck.ck.services;

import pe.edu.ck.ck.entity.ReporteMantenimiento;
import java.util.List;

public interface IReporteMantenimientoService {
    ReporteMantenimiento registrar(ReporteMantenimiento reporte);
    List<ReporteMantenimiento> registrarLote(List<ReporteMantenimiento> reportes);
    List<ReporteMantenimiento> listarTodo();
    List<ReporteMantenimiento> listarPorMaquina(String maquinaId);
    void eliminarPorLote(String batchId);
}