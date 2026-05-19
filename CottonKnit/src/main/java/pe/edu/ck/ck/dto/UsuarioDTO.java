package pe.edu.ck.ck.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.ck.ck.entity.Usuario;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Integer id;
    private String username;
    private String nombreCompleto;
    private String rol;

    public static UsuarioDTO fromEntity(Usuario usuario) {
        if (usuario == null) return null;
        return new UsuarioDTO(
            usuario.getId(),
            usuario.getUsername(),
            usuario.getNombreCompleto(),
            usuario.getRol()
        );
    }
}
