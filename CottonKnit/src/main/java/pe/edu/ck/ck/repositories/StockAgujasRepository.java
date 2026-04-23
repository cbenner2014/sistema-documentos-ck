package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.ck.ck.entity.StockAgujas;

@Repository
public interface StockAgujasRepository extends JpaRepository<StockAgujas, Integer> {
}