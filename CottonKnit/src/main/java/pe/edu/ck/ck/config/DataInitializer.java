package pe.edu.ck.ck.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.repositories.MaquinaRepository;
import pe.edu.ck.ck.repositories.UsuarioRepository;
import pe.edu.ck.ck.repositories.CatalogoErrorRepository;
import javax.sql.DataSource;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MaquinaRepository maquinaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CatalogoErrorRepository catalogoErrorRepository;

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

        // Si la base de datos está parcialmente vacía (falta el catálogo o las máquinas), corremos import.sql
        if (maquinaRepository.count() == 0 || catalogoErrorRepository.count() == 0) {
            System.out.println("Base de datos parcialmente vacía (máquinas: " + maquinaRepository.count() 
                               + ", catálogo errores: " + catalogoErrorRepository.count() 
                               + "). Iniciando carga de import.sql con continueOnError=true...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                    true, // continueOnError = true (ignora duplicados si ya existen algunos)
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
            System.out.println("La base de datos ya contiene máquinas y catálogo de errores. Omitiendo import.sql.");
        }
    }
}
