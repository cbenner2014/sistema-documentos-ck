package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.InspeccionMaquina;
import pe.edu.ck.ck.services.IInspeccionService;
import java.util.List;

@RestController
@RequestMapping("/api/inspeccion")
@CrossOrigin(origins = "*")
public class InspeccionController {

    @Autowired
    private IInspeccionService service;

    @GetMapping
    public ResponseEntity<List<InspeccionMaquina>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<InspeccionMaquina> guardar(@RequestBody InspeccionMaquina inspeccion) {
        return ResponseEntity.ok(service.guardar(inspeccion));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<InspeccionMaquina>> guardarLote(@RequestBody List<InspeccionMaquina> inspecciones) {
        return ResponseEntity.ok(service.guardarLote(inspecciones));
    }

    @DeleteMapping("/batch/{batchId}")
    public ResponseEntity<Void> eliminarPorLote(@PathVariable String batchId) {
        service.eliminarPorLote(batchId);
        return ResponseEntity.noContent().build();
    }
}
