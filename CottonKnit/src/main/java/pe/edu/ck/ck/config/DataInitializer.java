package pe.edu.ck.ck.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import pe.edu.ck.ck.repositories.MaquinaRepository;
import javax.sql.DataSource;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MaquinaRepository maquinaRepository;

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        // Si no hay máquinas registradas en la base de datos, inicializamos con import.sql
        if (maquinaRepository.count() == 0) {
            System.out.println("Base de datos vacía. Iniciando carga automática de datos desde import.sql...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                    false, // continueOnError
                    false, // ignoreFailedDrops
                    "UTF-8",
                    new ClassPathResource("import.sql")
                );
                populator.execute(dataSource);
                System.out.println("Carga de datos completada con éxito.");
            } catch (Exception e) {
                System.err.println("Error al cargar import.sql de inicialización: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("La base de datos ya contiene registros. Omitiendo inicialización.");
        }
    }
}
