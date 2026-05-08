package pe.edu.ck.ck.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.ck.ck.entity.InspeccionMaquina;
import pe.edu.ck.ck.repositories.InspeccionMaquinaRepository;
import pe.edu.ck.ck.services.IInspeccionService;

import java.util.List;

@Service
public class InspeccionServiceImpl implements IInspeccionService {

    @Autowired
    private InspeccionMaquinaRepository repository;

    @Override
    public List<InspeccionMaquina> listar() {
        return repository.findAll();
    }

    @Override
    public InspeccionMaquina guardar(InspeccionMaquina inspeccion) {
        return repository.save(inspeccion);
    }

    @Override
    public List<InspeccionMaquina> guardarLote(List<InspeccionMaquina> inspecciones) {
        return repository.saveAll(inspecciones);
    }

    @Override
    @Transactional
    public void eliminarPorLote(String batchId) {
        repository.deleteByBatchId(batchId);
    }
}
