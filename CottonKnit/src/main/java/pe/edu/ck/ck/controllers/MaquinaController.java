package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.Maquina;
import pe.edu.ck.ck.repositories.MaquinaRepository;
import java.util.List;

@RestController
@RequestMapping("/api/maquinas")
@CrossOrigin(origins = "*")
public class MaquinaController {

    @Autowired
    private MaquinaRepository repository;

    @GetMapping
    public List<Maquina> listar() {
        return repository.findAll();
    }

    @GetMapping("/activas")
    public List<Maquina> listarActivas() {
        return repository.findByActivaTrue();
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Maquina maquina) {
        if (maquina.getId() == null && repository.existsByCodigo(maquina.getCodigo())) {
            return ResponseEntity.badRequest().body("El código de máquina ya existe.");
        }
        return ResponseEntity.ok(repository.save(maquina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Maquina> cambiarEstado(@PathVariable Integer id) {
        return repository.findById(id).map(m -> {
            m.setActiva(!m.isActiva());
            return ResponseEntity.ok(repository.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }
}
