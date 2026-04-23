package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.InspeccionMaquina;
import pe.edu.ck.ck.repositories.InspeccionMaquinaRepository;
import java.util.List;

@RestController
@RequestMapping("/api/inspeccion")
@CrossOrigin(origins = "*")
public class InspeccionController {

    @Autowired
    private InspeccionMaquinaRepository repository;

    @GetMapping
    public ResponseEntity<List<InspeccionMaquina>> listar() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<InspeccionMaquina> guardar(@RequestBody InspeccionMaquina inspeccion) {
        return ResponseEntity.ok(repository.save(inspeccion));
    }
}
