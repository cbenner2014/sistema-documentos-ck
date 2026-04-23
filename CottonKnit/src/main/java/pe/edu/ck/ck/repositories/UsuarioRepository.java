package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.ck.ck.entity.Usuario;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Esto nos servirá para el login más adelante
    Optional<Usuario> findByUsername(String username);
}