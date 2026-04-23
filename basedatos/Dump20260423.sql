CREATE DATABASE  IF NOT EXISTS `sistema_reportes_ck` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sistema_reportes_ck`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sistema_reportes_ck
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catalogo_errores`
--

DROP TABLE IF EXISTS `catalogo_errores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_errores` (
  `id` int NOT NULL,
  `descripcion_problema` varchar(150) DEFAULT NULL,
  `descripcion_solucion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_errores`
--

LOCK TABLES `catalogo_errores` WRITE;
/*!40000 ALTER TABLE `catalogo_errores` DISABLE KEYS */;
INSERT INTO `catalogo_errores` VALUES (1,'Salta Puntada','Regula Alimentación'),(2,'Varia Tensión','Regulador De Tensión'),(3,'Rotura Hilo','Cambiar De Aguja Y Regular Tensión'),(4,'Revirado','Se Bajó Diferencial'),(5,'Acordonado','Se Suelta Tensión Del Garfio'),(6,'Contraste (Ojitos)','Se Graduó Tensión Y Tira Hilo'),(7,'Rotura De Aguja','Se Cambió De Placa'),(8,'Graduación De Maquina','Cambio De Prénsatela Y Regula Tensiones'),(9,'Regulación De Pedal','Se Ajustó Pedal'),(10,'Embolsado','Regular Deferencial Impelente'),(11,'Variación De Pestaña','Cambio Prénsatela Y Embudo'),(12,'Sale Hueco','Se Cambió La Aguja Por Marcado'),(13,'Sale Dientes','Corregir Al Guiador'),(14,'Rectificación De Placa','Para Cerrado De Costado'),(15,'Sale Orillado','Regular Tensión'),(16,'No Cazada','Afiliar Cuchilla'),(17,'Tensión Ajustada','Se Suelta Tensiones'),(18,'Soldar Guía Prénsatela','Para Cerrado'),(19,'Pica Tejido (Tela)','Cambio De Aguja Y Regular Prénsatela'),(20,'Salto De Puntada','Regulación De Garfio Y Prénsatela'),(21,'Motor Ruidoso','Graduar Motor'),(22,'Repuesto Defectuoso','Maquina Mal Graduada'),(23,'Cambio De Modelo','Mover Línea'),(24,'Mancha Aceite (papel testigo)','Limpieza De Maquina');
/*!40000 ALTER TABLE `catalogo_errores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspeccion_detalles`
--

DROP TABLE IF EXISTS `inspeccion_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspeccion_detalles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `componente` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `seccion` varchar(255) DEFAULT NULL,
  `inspeccion_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5aecsmva1p4f35wytc9yqpv49` (`inspeccion_id`),
  CONSTRAINT `FK5aecsmva1p4f35wytc9yqpv49` FOREIGN KEY (`inspeccion_id`) REFERENCES `inspeccion_maquinas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspeccion_detalles`
--

LOCK TABLES `inspeccion_detalles` WRITE;
/*!40000 ALTER TABLE `inspeccion_detalles` DISABLE KEYS */;
INSERT INTO `inspeccion_detalles` VALUES (1,'Garfios','OK','','CABEZALES',1),(2,'Cuchillas','OK','','CABEZALES',1),(3,'Placa de Aguja','OK','','CABEZALES',1),(4,'Peines','OK','','CABEZALES',1),(5,'Prénsatela','OK','','CABEZALES',1),(6,'Barra de aguja','OK','','CABEZALES',1),(7,'Bocina','OK','','CABEZALES',1),(8,'Protector de dedo','OK','','CABEZALES',1),(9,'Protector de vista','OK','','CABEZALES',1),(10,'Protector de cabeza','OK','','CABEZALES',1),(11,'Sticker de seguridad','OK','','CABEZALES',1),(12,'Otros',NULL,'','CABEZALES',1),(13,'Revision de Tornillos','OK','','TORNILLOS',1),(14,'Retenes','OK','','ACEITE',1),(15,'Filtro','OK','','ACEITE',1),(16,'Aceite textol SE ISO 32 /46 PLUS','OK','','ACEITE',1),(17,'Grasa','OK','','ACEITE',1),(18,'Mueble','OK','','ACEITE',1),(19,'Pedestal(pintado)','OK','','ACEITE',1),(20,'Ruedas','OK','','ACEITE',1),(21,'Esquineros','OK','','ACEITE',1),(22,'Rodajes y Vibraciones','OK','','MOTORES',1),(23,'Fajas','OK','','MOTORES',1),(24,'Tapas protectoras','OK','','MOTORES',1),(25,'Otros',NULL,'','MOTORES',1),(26,'Garfios','OK','','CABEZALES',2),(27,'Cuchillas','OK','','CABEZALES',2),(28,'Placa de Aguja','OK','','CABEZALES',2),(29,'Peines','OK','','CABEZALES',2),(30,'Prénsatela','OK','','CABEZALES',2),(31,'Barra de aguja','OK','','CABEZALES',2),(32,'Bocina','OK','','CABEZALES',2),(33,'Protector de dedo','OK','','CABEZALES',2),(34,'Protector de vista','OK','','CABEZALES',2),(35,'Protector de cabeza','OK','','CABEZALES',2),(36,'Sticker de seguridad','OK','','CABEZALES',2),(37,'Otros',NULL,'','CABEZALES',2),(38,'Revision de Tornillos','OK','','TORNILLOS',2),(39,'Retenes','OK','','ACEITE',2),(40,'Filtro','OK','','ACEITE',2),(41,'Aceite textol SE ISO 32 /46 PLUS','OK','','ACEITE',2),(42,'Grasa','OK','','ACEITE',2),(43,'Mueble','OK','','ACEITE',2),(44,'Pedestal(pintado)','OK','','ACEITE',2),(45,'Ruedas','OK','','ACEITE',2),(46,'Esquineros','OK','','ACEITE',2),(47,'Rodajes y Vibraciones','OK','','MOTORES',2),(48,'Fajas','OK','','MOTORES',2),(49,'Tapas protectoras','OK','','MOTORES',2),(50,'Otros',NULL,'','MOTORES',2),(51,'Garfios','OK','','CABEZALES',3),(52,'Cuchillas','OK','','CABEZALES',3),(53,'Placa de Aguja','OK','','CABEZALES',3),(54,'Peines','OK','','CABEZALES',3),(55,'Prénsatela','OK','','CABEZALES',3),(56,'Barra de aguja','OK','','CABEZALES',3),(57,'Bocina','OK','','CABEZALES',3),(58,'Protector de dedo','OK','','CABEZALES',3),(59,'Protector de vista','OK','','CABEZALES',3),(60,'Protector de cabeza','OK','','CABEZALES',3),(61,'Sticker de seguridad','OK','','CABEZALES',3),(62,'Otros',NULL,'','CABEZALES',3),(63,'Revision de Tornillos','OK','','TORNILLOS',3),(64,'Retenes','OK','','ACEITE',3),(65,'Filtro','OK','','ACEITE',3),(66,'Aceite textol SE ISO 32 /46 PLUS','OK','','ACEITE',3),(67,'Grasa','OK','','ACEITE',3),(68,'Mueble','OK','','ACEITE',3),(69,'Pedestal(pintado)','OK','','ACEITE',3),(70,'Ruedas','OK','','ACEITE',3),(71,'Esquineros','OK','','ACEITE',3),(72,'Rodajes y Vibraciones','OK','','MOTORES',3),(73,'Fajas','OK','','MOTORES',3),(74,'Tapas protectoras','OK','','MOTORES',3),(75,'Otros',NULL,'','MOTORES',3);
/*!40000 ALTER TABLE `inspeccion_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspeccion_maquinas`
--

DROP TABLE IF EXISTS `inspeccion_maquinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspeccion_maquinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo_maquina` varchar(255) DEFAULT NULL,
  `codigo_mecanico` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `linea` varchar(255) DEFAULT NULL,
  `marca_motor` varchar(255) DEFAULT NULL,
  `mecanico` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `observaciones` text,
  `prueba_costura` bit(1) DEFAULT NULL,
  `revisado_por` varchar(255) DEFAULT NULL,
  `serie_cabezal` varchar(255) DEFAULT NULL,
  `serie_motor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspeccion_maquinas`
--

LOCK TABLES `inspeccion_maquinas` WRITE;
/*!40000 ALTER TABLE `inspeccion_maquinas` DISABLE KEYS */;
INSERT INTO `inspeccion_maquinas` VALUES (1,'','','2026-04-23','','','','','',_binary '\0','','',''),(2,'','','2026-04-23','','','','','',_binary '\0','','',''),(3,'','','2026-04-23','','','','','',_binary '\0','','','');
/*!40000 ALTER TABLE `inspeccion_maquinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspeccion_tecnica`
--

DROP TABLE IF EXISTS `inspeccion_tecnica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspeccion_tecnica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `maquina_id` varchar(20) DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `garfios` varchar(5) DEFAULT NULL,
  `cuchillas` varchar(5) DEFAULT NULL,
  `placa_aguja` varchar(5) DEFAULT NULL,
  `peines` varchar(5) DEFAULT NULL,
  `prensatela` varchar(5) DEFAULT NULL,
  `barra_aguja` varchar(5) DEFAULT NULL,
  `filtro_aceite` varchar(5) DEFAULT NULL,
  `aceite_estado` varchar(100) DEFAULT NULL,
  `limpieza_motor` varchar(5) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `maquina_id` (`maquina_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `inspeccion_tecnica_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquinas` (`codigo_maquina`),
  CONSTRAINT `inspeccion_tecnica_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspeccion_tecnica`
--

LOCK TABLES `inspeccion_tecnica` WRITE;
/*!40000 ALTER TABLE `inspeccion_tecnica` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspeccion_tecnica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maquinas`
--

DROP TABLE IF EXISTS `maquinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maquinas` (
  `codigo_maquina` varchar(20) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `linea` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`codigo_maquina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maquinas`
--

LOCK TABLES `maquinas` WRITE;
/*!40000 ALTER TABLE `maquinas` DISABLE KEYS */;
/*!40000 ALTER TABLE `maquinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte_mantenimiento`
--

DROP TABLE IF EXISTS `reporte_mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte_mantenimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora_parada` time(6) DEFAULT NULL,
  `hora_termino` time(6) DEFAULT NULL,
  `maquina_id` varchar(255) DEFAULT NULL,
  `catalogo_error_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ep8pgy477xgoidat8so5xs4i` (`catalogo_error_id`),
  KEY `FKdx2eyy6eomdejjs0buikdj1i4` (`usuario_id`),
  CONSTRAINT `FK1ep8pgy477xgoidat8so5xs4i` FOREIGN KEY (`catalogo_error_id`) REFERENCES `catalogo_errores` (`id`),
  CONSTRAINT `FKdx2eyy6eomdejjs0buikdj1i4` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte_mantenimiento`
--

LOCK TABLES `reporte_mantenimiento` WRITE;
/*!40000 ALTER TABLE `reporte_mantenimiento` DISABLE KEYS */;
INSERT INTO `reporte_mantenimiento` VALUES (1,'2026-04-23','11:11:00.000000','22:22:00.000000','123-123',2,NULL);
/*!40000 ALTER TABLE `reporte_mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_agujas`
--

DROP TABLE IF EXISTS `stock_agujas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_agujas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `linea` varchar(50) DEFAULT NULL,
  `cliente` varchar(50) DEFAULT NULL,
  `tipo_recta` int DEFAULT '0',
  `tipo_remalle` int DEFAULT '0',
  `tipo_recubierto` int DEFAULT '0',
  `tipo_especiales` int DEFAULT '0',
  `total` int DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_agujas`
--

LOCK TABLES `stock_agujas` WRITE;
/*!40000 ALTER TABLE `stock_agujas` DISABLE KEYS */;
INSERT INTO `stock_agujas` VALUES (1,'2026-02-24','muestras','Lacoste',100,100,120,20,340,'Carga inicial de stock'),(2,'2026-04-23','5','Lacoste',100,100,100,25,325,NULL),(3,'2026-04-23','10','Lacoste',100,120,19,20,259,NULL);
/*!40000 ALTER TABLE `stock_agujas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `rol` varchar(20) DEFAULT 'ADMIN',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin123','Administrador de Sistema','ADMIN');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sistema_reportes_ck'
--

--
-- Dumping routines for database 'sistema_reportes_ck'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23  7:55:33
