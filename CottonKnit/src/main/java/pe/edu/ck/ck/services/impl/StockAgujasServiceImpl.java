package pe.edu.ck.ck.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.ck.ck.entity.StockAgujas;
import pe.edu.ck.ck.repositories.StockAgujasRepository;
import pe.edu.ck.ck.services.IStockAgujasService;
import java.util.List;

@Service
public class StockAgujasServiceImpl implements IStockAgujasService {

    @Autowired
    private StockAgujasRepository repository;

    @Override
    public StockAgujas guardar(StockAgujas stock) {
        // Lógica para digitalizar el formato: calculamos el total automáticamente
        int suma = (stock.getTipoRecta() != null ? stock.getTipoRecta() : 0) +
                (stock.getTipoRemalle() != null ? stock.getTipoRemalle() : 0) +
                (stock.getTipoRecubierto() != null ? stock.getTipoRecubierto() : 0) +
                (stock.getTipoEspeciales() != null ? stock.getTipoEspeciales() : 0);

        stock.setTotal(suma);
        return repository.save(stock);
    }

    @Override
    public List<StockAgujas> listarTodo() {
        return repository.findAll();
    }
}