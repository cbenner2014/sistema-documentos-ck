package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.ck.ck.entity.CatalogoError;

@Repository
public interface CatalogoErrorRepository extends JpaRepository<CatalogoError, Integer> {
}