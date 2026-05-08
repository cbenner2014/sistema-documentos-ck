package pe.edu.ck.ck.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.ck.ck.entity.ReporteMantenimiento;
import pe.edu.ck.ck.repositories.ReporteMantenimientoRepository;
import pe.edu.ck.ck.services.IReporteMantenimientoService;
import java.util.List;

@Service
public class ReporteMantenimientoServiceImpl implements IReporteMantenimientoService {
    @Autowired
    private ReporteMantenimientoRepository repository;

    @Override
    public ReporteMantenimiento registrar(ReporteMantenimiento reporte) {
        return repository.save(reporte);
    }

    @Override
    public List<ReporteMantenimiento> registrarLote(List<ReporteMantenimiento> reportes) {
        return repository.saveAll(reportes);
    }

    @Override
    public List<ReporteMantenimiento> listarTodo() {
        return repository.findAll();
    }

    @Override
    public List<ReporteMantenimiento> listarPorMaquina(String maquinaId) {
        return repository.findByMaquinaId(maquinaId);
    }

    @Override
    @Transactional
    public void eliminarPorLote(String batchId) {
        repository.deleteByBatchId(batchId);
    }
}