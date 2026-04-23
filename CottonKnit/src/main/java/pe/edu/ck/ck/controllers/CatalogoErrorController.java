package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.CatalogoError;
import pe.edu.ck.ck.services.ICatalogoErrorService;
import java.util.List;

@RestController
@RequestMapping("/api/catalogo")
@CrossOrigin(origins = "*")
public class CatalogoErrorController {

    @Autowired
    private ICatalogoErrorService service;

    @GetMapping
    public ResponseEntity<List<CatalogoError>> listar() {
        return ResponseEntity.ok(service.listarTodo());
    }
}