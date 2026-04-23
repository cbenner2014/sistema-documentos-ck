package pe.edu.ck.ck.services;

import pe.edu.ck.ck.entity.Usuario;
import java.util.List;

public interface IUsuarioService {
    List<Usuario> listarTodos();
    Usuario guardar(Usuario usuario);
}