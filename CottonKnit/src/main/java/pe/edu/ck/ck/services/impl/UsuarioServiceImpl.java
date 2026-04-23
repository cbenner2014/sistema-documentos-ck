package pe.edu.ck.ck.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.repositories.UsuarioRepository;
import pe.edu.ck.ck.services.IUsuarioService;
import java.util.List;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        // Por ahora sin encriptar, directo a la base de datos
        return repository.save(usuario);
    }
}