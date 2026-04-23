package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.StockAgujas;
import pe.edu.ck.ck.services.IStockAgujasService;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockAgujasController {

    @Autowired
    private IStockAgujasService service;

    @GetMapping
    public ResponseEntity<List<StockAgujas>> listar() {
        return ResponseEntity.ok(service.listarTodo());
    }

    @PostMapping
    public ResponseEntity<StockAgujas> registrar(@RequestBody StockAgujas stock) {
        return ResponseEntity.ok(service.guardar(stock));
    }
}