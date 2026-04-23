package pe.edu.ck.ck.services;

import pe.edu.ck.ck.entity.StockAgujas;
import java.util.List;

public interface IStockAgujasService {
    StockAgujas guardar(StockAgujas stock);
    List<StockAgujas> listarTodo();
}