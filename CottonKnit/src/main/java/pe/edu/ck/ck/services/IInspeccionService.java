package pe.edu.ck.ck.services;

import pe.edu.ck.ck.entity.InspeccionMaquina;
import java.util.List;

public interface IInspeccionService {
    List<InspeccionMaquina> listar();
    InspeccionMaquina guardar(InspeccionMaquina inspeccion);
    List<InspeccionMaquina> guardarLote(List<InspeccionMaquina> inspecciones);
    void eliminarPorLote(String batchId);
}
