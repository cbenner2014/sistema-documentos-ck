package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.dto.UsuarioDTO;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.services.IUsuarioService;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private IUsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        List<UsuarioDTO> dtos = service.listarTodos().stream()
                .map(UsuarioDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> crear(@RequestBody Usuario usuario) {
        Usuario saved = service.guardar(usuario);
        return ResponseEntity.ok(UsuarioDTO.fromEntity(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizar(@PathVariable Integer id, @RequestBody Usuario usuario) {
        Usuario updated = service.actualizar(id, usuario);
        return ResponseEntity.ok(UsuarioDTO.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.ok().build();
    }
}