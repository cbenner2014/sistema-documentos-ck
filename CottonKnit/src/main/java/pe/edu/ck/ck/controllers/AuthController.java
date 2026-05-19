package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.dto.LoginRequest;
import pe.edu.ck.ck.dto.UsuarioDTO;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.repositories.UsuarioRepository;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> userOpt = usuarioRepository.findByUsername(request.getUsername());
        
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            // Comparación de contraseña simple por ahora
            if (user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(UsuarioDTO.fromEntity(user));
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Usuario o contraseña incorrectos");
    }
}
