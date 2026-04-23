package pe.edu.ck.ck.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.ck.ck.entity.CatalogoError;
import pe.edu.ck.ck.repositories.CatalogoErrorRepository;
import pe.edu.ck.ck.services.ICatalogoErrorService;
import java.util.List;

@Service
public class CatalogoErrorServiceImpl implements ICatalogoErrorService {
    @Autowired
    private CatalogoErrorRepository repository;

    @Override
    public List<CatalogoError> listarTodo() {
        return repository.findAll();
    }
}