package pe.edu.ck.ck.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.repositories.MaquinaRepository;
import pe.edu.ck.ck.repositories.UsuarioRepository;
import javax.sql.DataSource;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MaquinaRepository maquinaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        // Asegurar la existencia de los usuarios por defecto sin depender de import.sql
        if (usuarioRepository.findByUsername("admin").isEmpty()) {
            System.out.println("Creando usuario 'admin' por defecto...");
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setNombreCompleto("Administrador Sistema");
            admin.setRol("ADMIN");
            usuarioRepository.save(admin);
            System.out.println("Usuario 'admin' creado exitosamente.");
        }

        if (usuarioRepository.findByUsername("mecanico").isEmpty()) {
            System.out.println("Creando usuario 'mecanico' por defecto...");
            Usuario mecanico = new Usuario();
            mecanico.setUsername("mecanico");
            mecanico.setPassword("mecanico123");
            mecanico.setNombreCompleto("Juan Perez");
            mecanico.setRol("MECANICO");
            usuarioRepository.save(mecanico);
            System.out.println("Usuario 'mecanico' creado exitosamente.");
        }

        // Si no hay máquinas registradas en la base de datos, inicializamos el resto con import.sql
        if (maquinaRepository.count() == 0) {
            System.out.println("Base de datos de máquinas vacía. Iniciando carga de import.sql...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                    true, // continueOnError = true para ignorar duplicados si los usuarios ya existen en SQL
                    false, // ignoreFailedDrops
                    "UTF-8",
                    new ClassPathResource("import.sql")
                );
                populator.execute(dataSource);
                System.out.println("Carga de import.sql completada.");
            } catch (Exception e) {
                System.err.println("Error al cargar import.sql: " + e.getMessage());
            }
        } else {
            System.out.println("La base de datos de máquinas ya contiene registros. Omitiendo import.sql.");
        }
    }
}
