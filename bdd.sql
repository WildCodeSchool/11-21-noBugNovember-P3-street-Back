CREATE DATABASE  IF NOT EXISTS `streetzer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `streetzer`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: streetzer
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `annonces_dispo`
--

DROP TABLE IF EXISTS `annonces_dispo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annonces_dispo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description_annonce` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `users_id` int NOT NULL,
  `blocked` tinyint NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_annonces_dispo_users1_idx` (`users_id`),
  CONSTRAINT `fk_annonces_dispo_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annonces_dispo`
--

LOCK TABLES `annonces_dispo` WRITE;
/*!40000 ALTER TABLE `annonces_dispo` DISABLE KEYS */;
INSERT INTO `annonces_dispo` VALUES (2,'Allô les gens ! Un Scénariste avec des projets aussi ambitieux que la conquête spatial, mais qui sait rester réaliste. J\'ai écrit sur divers sujets du genre, Comédie Dramatique / SF Psychologique / Film Noir Je ne suis pas à court d\'idée, je suis juste à court de moyens pour tourner ! ','Disponible à partir de Janvier 2023',7,1),(4,'Il faut que je taffe mais la flemme !','Dans 10 ans',5,0);
/*!40000 ALTER TABLE `annonces_dispo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain`
--

DROP TABLE IF EXISTS `domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain`
--

LOCK TABLES `domain` WRITE;
/*!40000 ALTER TABLE `domain` DISABLE KEYS */;
INSERT INTO `domain` VALUES (1,'Arts-visuels'),(2,'Musique'),(3,'Littérature et poésie'),(4,'Arts de la scène'),(5,'Cinéma'),(6,'Arts médiatiques');
/*!40000 ALTER TABLE `domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_has_sub_domain`
--

DROP TABLE IF EXISTS `domain_has_sub_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_has_sub_domain` (
  `domain_id` int NOT NULL,
  `sub_domain_id` int NOT NULL,
  PRIMARY KEY (`domain_id`,`sub_domain_id`),
  KEY `fk_domain_has_sub_domain_sub_domain1_idx` (`sub_domain_id`),
  KEY `fk_domain_has_sub_domain_domain1_idx` (`domain_id`),
  CONSTRAINT `fk_domain_has_sub_domain_domain1` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`id`),
  CONSTRAINT `fk_domain_has_sub_domain_sub_domain1` FOREIGN KEY (`sub_domain_id`) REFERENCES `sub_domain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_has_sub_domain`
--

LOCK TABLES `domain_has_sub_domain` WRITE;
/*!40000 ALTER TABLE `domain_has_sub_domain` DISABLE KEYS */;
INSERT INTO `domain_has_sub_domain` VALUES (4,1),(5,1),(4,2),(5,2),(1,3),(2,3),(5,3),(6,3),(3,4),(2,5),(5,5),(5,6),(2,7),(6,7),(1,8),(1,9),(2,10),(5,11),(2,12),(4,12),(5,13),(4,14),(5,14),(4,15),(5,15),(2,17),(5,18),(6,19),(6,20),(2,22);
/*!40000 ALTER TABLE `domain_has_sub_domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messagerie`
--

DROP TABLE IF EXISTS `messagerie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messagerie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `users_id_from` int NOT NULL,
  `users_id_to` int NOT NULL,
  `datetime` datetime NOT NULL,
  `read` tinyint NOT NULL,
  PRIMARY KEY (`id`,`users_id_from`,`users_id_to`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messagerie`
--

LOCK TABLES `messagerie` WRITE;
/*!40000 ALTER TABLE `messagerie` DISABLE KEYS */;
INSERT INTO `messagerie` VALUES (1,'Bonjour, j\'adore votre drôle de chapeau. Je me sens triste ce soir. Dînons ensemble.',2,6,'2021-12-31 19:45:00',0),(2,'Je vous ai trouvé sexy à la télé. Dînons ensemble.',2,6,'2022-01-04 18:45:00',0),(3,'Je n\'ai pas faim. Dînons ensemble.',2,6,'2022-02-04 19:45:00',0),(4,'Je ne suis pas morte. Dînons ensemble.',2,6,'2022-02-08 10:31:00',0),(5,'MAIS BORDEL LAISSE MOI TRANQUILLE',6,2,'2022-02-08 10:34:00',0);
/*!40000 ALTER TABLE `messagerie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `estimated_start_date` date NOT NULL,
  `estimated_end_date` date DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `team_completed` tinyint NOT NULL COMMENT '0 = no 1 = yes',
  `status` int NOT NULL COMMENT '0 = projet en cours/recherche ; 1=projet en cours/complet ; 2 = projet terminé.',
  `domain_id` int NOT NULL,
  `users_id` int NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `blocked` tinyint NOT NULL,
  `youtubelink` varchar(255) DEFAULT NULL,
  `region_id` int NOT NULL,
  PRIMARY KEY (`id`,`domain_id`,`users_id`,`region_id`),
  KEY `fk_project_users1_idx` (`users_id`) /*!80000 INVISIBLE */,
  KEY `fk_project_domain1_idx` (`domain_id`),
  KEY `index4` (`region_id`),
  CONSTRAINT `fk_project_domain1` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_region1` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Baguette','public/baguette.webp','2022-10-23','2022-12-24','Pour un court métrage d\'humour équipe sympa et complète à Paris 17 samedi 22 janvier.',0,2,5,4,'Paris',1,'https://www.youtube.com/watch?v=DAmzJpzm9TM',1),(2,'Clip musical','public/RAP.jpg','2023-01-30','2023-02-06','Clip de rap.',0,1,2,2,'Nantes',0,'https://www.youtube.com/watch?v=RQ7W6lLRzjY',2),(3,'Court métrage','public/cinema.jpg','2023-01-01','2023-01-01','Bonjour Je recherche des acteurs bénévoles pour un court-métrage destiné au Nikon film Festival.',0,0,5,7,'Lyon',0,'https://www.youtube.com/watch?v=MNqHI2YJbIM',3),(4,'Clip','public/drake.jpg','2022-03-25','2022-03-27','Pour mon prochain clip musical',1,1,2,5,'Saint Benoit la Forêt',0,'https://www.youtube.com/watch?v=qL7zrWcv6XY',4);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_has_users`
--

DROP TABLE IF EXISTS `project_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_has_users` (
  `project_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`users_id`),
  KEY `fk_project_has_users_users1_idx` (`users_id`),
  KEY `fk_project_has_users_project1_idx` (`project_id`),
  CONSTRAINT `fk_project_has_users_project1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_project_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_has_users`
--

LOCK TABLES `project_has_users` WRITE;
/*!40000 ALTER TABLE `project_has_users` DISABLE KEYS */;
INSERT INTO `project_has_users` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(1,4),(4,4),(2,5),(3,5),(4,6),(4,12);
/*!40000 ALTER TABLE `project_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Auvergne-Rhône-Alpes'),(2,'Bourgogne-Franche-Comté'),(3,'Bretagne'),(4,'Centre-Val de Loire'),(5,'Corse'),(6,'Grand Est'),(7,'Hauts-de-France'),(8,'Ile-de-France'),(9,'Normandie'),(10,'Nouvelle-Aquitaine'),(11,'Occitanie'),(12,'Pays de la Loire'),(13,'Provence-Alpes-Côte d’Azur.');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_mate`
--

DROP TABLE IF EXISTS `search_mate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_mate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `project_id` int NOT NULL,
  `blocked` tinyint NOT NULL,
  PRIMARY KEY (`id`,`project_id`),
  KEY `fk_search_mate_project1_idx` (`project_id`),
  CONSTRAINT `fk_search_mate_project1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_mate`
--

LOCK TABLES `search_mate` WRITE;
/*!40000 ALTER TABLE `search_mate` DISABLE KEYS */;
INSERT INTO `search_mate` VALUES (1,'Danseur','Nous recherchons un danseur Hip-hop éxpérimenté afin de réaliser un clip de musique.','2023-02-15',2,1),(2,'Comédien',' il nous manque un comédien','2023-01-17',1,0),(3,'Ingénieur du son','Il nous manque un ingénieur du son avec ses équipements','2022-04-04',1,0);
/*!40000 ALTER TABLE `search_mate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_domain`
--

DROP TABLE IF EXISTS `sub_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_domain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `art_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_domain`
--

LOCK TABLES `sub_domain` WRITE;
/*!40000 ALTER TABLE `sub_domain` DISABLE KEYS */;
INSERT INTO `sub_domain` VALUES (1,'Comédien'),(2,'Scénariste'),(3,'Ingénieur son'),(4,'Ecrivain'),(5,'Compositeur'),(6,'Réalisateur'),(7,'Chanteur'),(8,'Peintre'),(9,'Déssinateur'),(10,'Paroliers'),(11,'Editeur'),(12,'Beatmaker'),(13,'Danseur '),(14,'Danseur Jazz'),(15,'Danseur Breakdance'),(16,'Guitariste'),(17,'Batteur'),(18,'Doubleur'),(19,'Photographe'),(20,'Animateur radio'),(21,'Ingénieur lumière'),(22,'Rappeur');
/*!40000 ALTER TABLE `sub_domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_domain_has_users`
--

DROP TABLE IF EXISTS `sub_domain_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_domain_has_users` (
  `sub_domain_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`sub_domain_id`,`users_id`),
  KEY `fk_sub_domain_has_users_users1_idx` (`users_id`),
  KEY `fk_sub_domain_has_users_sub_domain1_idx` (`sub_domain_id`),
  CONSTRAINT `fk_sub_domain_has_users_sub_domain1` FOREIGN KEY (`sub_domain_id`) REFERENCES `sub_domain` (`id`),
  CONSTRAINT `fk_sub_domain_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_domain_has_users`
--

LOCK TABLES `sub_domain_has_users` WRITE;
/*!40000 ALTER TABLE `sub_domain_has_users` DISABLE KEYS */;
INSERT INTO `sub_domain_has_users` VALUES (5,1),(7,2),(19,3),(15,4),(22,5),(3,7),(8,8),(2,9),(3,10),(4,11),(5,12),(6,13),(7,14);
/*!40000 ALTER TABLE `sub_domain_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin` tinyint NOT NULL,
  `blocked` tinyint NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `birthday` date NOT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `spotify` varchar(255) DEFAULT NULL,
  `tiktok` varchar(255) DEFAULT NULL,
  `description_users` varchar(255) DEFAULT NULL,
  `forget_password` varchar(45) NOT NULL,
  `available` tinyint NOT NULL,
  `phoneVisibility` tinyint NOT NULL,
  `emailVisibility` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,0,'Jean','Renard','Reny','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/jeanrenard.jpg','jeanrenard@hotmail.com','0645213266','Paris','France','1933-10-21',NULL,NULL,NULL,NULL,NULL,'Pilier de la chanson française','jeanjean',1,1,1),(2,0,0,'Calogero','Mauricini','Geronimo','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/calogero.jpg','calogero@hotmail.fr','0641236989','Lyon','France','1971-01-12','https://twitter.com/calogerofficiel','https://www.instagram.com/calogerofficiel/?hl=fr','https://www.youtube.com/channel/UCsXBecOBwrJDDMBU5F2xo2A',NULL,NULL,'Calogero, de son vrai nom Calogero Joseph Salvatore Maurici, né le 30 juillet 1971 à Échirolles (Isère), est un chanteur, compositeur et musicien français. Ses parents sont des immigrés siciliens venant de Sommatino dans la province de Caltanissetta.','calogeronimo',1,0,1),(3,0,0,'Pierre','Chabrier','Pierro','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/pierre.jpg','pierrechabrier@gmail.com','0642526369','Paris','France','1989-10-21','https://twitter.com/VilebrequinAuto','https://www.instagram.com/pierre_chabrier/','https://www.youtube.com/c/VilebrequinAuto/videos',NULL,NULL,'Directeur de photographie et vidéaste chez Vilbrequin','pierro',1,1,1),(4,0,0,'Junior','Bosila Banya','Juju','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/junior.jpg','Juniorbosilabanya@gmail.com','0648789863','Paris','France','1974-06-15','https://twitter.com/bboyjrwanted','https://www.instagram.com/bboyjuniorofficiel/?hl=fr','',NULL,NULL,'J\'ai grandi à Saint-Malo et j\'ai découvert la danse hip-hop à l\'âge de 16 ans par l\'intermédiaire des danseurs Rudy et Jeff du crew S.B.C.','juniorbosi',1,0,0),(5,0,0,'Aubrey Drake','Graham','Drake','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/drake.jpg','drazy@gmail.com','0641123236','New York','United States','1985-12-10','https://twitter.com/Drake','https://www.instagram.com/drake/?hl=fr','https://www.youtube.com/user/DrakeOfficial','https://open.spotify.com/playlist/37i9dQZF1DX4VkTBdvsYXu','https://www.tiktok.com/@champagnee.papiii','Rappeur très connu dans le milieu, plusieurs millions d\'écoutes par mois sur les réseaux','draky',0,1,1),(6,0,0,'Yannick','Couz','Alien','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/yannick.jpg','yannickcouz@gmail.com','0633967864','Paris','France','1989-02-04',NULL,NULL,NULL,NULL,NULL,'Grand photographe,et  grande expérience dans le milieu du cinéma. Je me balade parfois en armure ultra-sophistiqué.  ','musicaly',1,1,1),(7,0,0,'Eliott',' Pullicino','Liolio','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/djelite.jpg','djelite@hotmail.fr','0645213459','Paris','France','1985-05-12',NULL,NULL,NULL,NULL,NULL,'J\'ai beaucoup travaillé en collaboration avec Nekfeu','djelite',1,1,0),(8,0,0,'Dorian','Garcia','Dodo','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/dorian.png','dorian@gmal.com','0612345678','Bordeaux','France','1991-11-10',NULL,NULL,NULL,NULL,NULL,'Développeur web, adepte des coups de peinture et des retouches CSS','doriangarcia',1,1,1),(9,0,0,'Bill','Gates','Bilou','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/bill.jpg','bill.gates@wanado.fr','0612345678','Las Vegas','United States','1955-05-12',NULL,NULL,NULL,NULL,NULL,'William Henry Gates III, dit Bill Gates [bɪl ɡeɪts], né le 28 octobre 1955 à Seattle, est un informaticien, entrepreneur et milliardaire américain. Il est connu comme le fondateur de Microsoft en 1975 et son principal actionnaire jusqu’en 2014.','zrzrzr',1,1,1),(10,0,0,'Elon','Musk','MrStark','870bf9ac3e49b5ad90723d680484ac436fd7eaed17480fc142fc43f5b75e7c4a','public/elon.jpg','melon.tusk@spaceX.be','0612345678','Vancouver','Canada','1955-05-12',NULL,NULL,NULL,NULL,NULL,'Elon Musk, né le 28 juin 1971 à Pretoria, est un ingénieur, entrepreneur, chef d\'entreprise et milliardaire sud-africain, naturalisé canadien en 1988 puis américain en 2002.','zrzrzr',1,1,1),(11,0,1,'Tom','Holland','Spidey','ebf4d6dfecb7847cba1d2c1b256d16b2d4a896ea9f32999b9d8ffb556d411f03','public/tom.jpg','notspiderman@marvel.com','0612345678','New York','United States','2002-05-12',NULL,NULL,NULL,NULL,NULL,'Thomas Stanley Holland, dit Tom Holland, né le 1ᵉʳ juin 1996 à Kingston upon Thames, est un acteur britannique.','zrzrzr',1,1,1),(12,0,0,'Ryan','Reynolds','Freeyguy','ebf4d6dfecb7847cba1d2c1b256d16b2d4a896ea9f32999b9d8ffb556d411f03','public/ryan.jpg','ryan.reynolds@free.fr','0612345678','Miami','United States','1972-05-12',NULL,NULL,NULL,NULL,NULL,'Ryan Reynolds est un acteur, mannequin, producteur de cinéma et entrepreneur canado-américain, né le 23 octobre 1976 à Vancouver.','zrzrzr',0,1,1),(13,0,0,'Steven','Spielberg','Stev','ebf4d6dfecb7847cba1d2c1b256d16b2d4a896ea9f32999b9d8ffb556d411f03','public/steven.jpg','when@avatar.is','0612345678','Orlando','United States','1959-05-12',NULL,NULL,NULL,NULL,NULL,'Steven Allan Spielberg /ˈstiːvən ˈspiːlbɝɡ/ est un réalisateur, producteur et scénariste américain, né le 18 décembre 1946 à Cincinnati en Ohio','zrzrzr',0,0,1),(14,0,0,'Shawn','Knowles-Carter','JayZ','ebf4d6dfecb7847cba1d2c1b256d16b2d4a896ea9f32999b9d8ffb556d411f03','public/jayz.jpg','beyonceisbae@gmail.com','0612345678','Boston','United States','1967-05-12',NULL,NULL,NULL,NULL,NULL,'Jay-Z, stylisé JAY-Z, de son vrai nom Shawn Corey Knowles-Carter, né le 4 décembre 1969 à New York, est un rappeur et homme d\'affaires américain. Il est l\'un des artistes de hip-hop les plus rémunérés d\'Amérique.','zrzrzr',1,0,1),(21,1,0,'Myriam','Djebbouri','CEO','f59ac0828b9a32293b348e398a0efd342b1e4377a687f3a9055ee2871dff35e4',NULL,'fakeemail@qcpart.com','0612345678','NoWhere','France','1990-01-01',NULL,NULL,NULL,NULL,NULL,NULL,'zrrzrr',0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_domain`
--

DROP TABLE IF EXISTS `users_has_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_domain` (
  `users_id` int NOT NULL,
  `domain_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`domain_id`),
  KEY `fk_users_has_domain_domain1_idx` (`domain_id`),
  KEY `fk_users_has_domain_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_domain_domain1` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`id`),
  CONSTRAINT `fk_users_has_domain_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_domain`
--

LOCK TABLES `users_has_domain` WRITE;
/*!40000 ALTER TABLE `users_has_domain` DISABLE KEYS */;
INSERT INTO `users_has_domain` VALUES (8,1),(13,1),(1,2),(2,2),(5,2),(9,2),(14,2),(4,4),(7,4),(11,4),(6,5),(10,5),(12,5),(3,6);
/*!40000 ALTER TABLE `users_has_domain` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 11:15:41
