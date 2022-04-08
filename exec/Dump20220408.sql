CREATE DATABASE  IF NOT EXISTS `repill_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `repill_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: j6a503.p.ssafy.io    Database: repill_db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `accounts_deliveryaddress`
--

DROP TABLE IF EXISTS `accounts_deliveryaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_deliveryaddress` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detailed_address` longtext COLLATE utf8mb4_unicode_ci,
  `zipcode` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `phone_number` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_deliveryaddress_user_id_1e996adf_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `accounts_deliveryaddress_user_id_1e996adf_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_deliveryaddress`
--

LOCK TABLES `accounts_deliveryaddress` WRITE;
/*!40000 ALTER TABLE `accounts_deliveryaddress` DISABLE KEYS */;
INSERT INTO `accounts_deliveryaddress` VALUES (7,'111','경기 성남시 분당구 판교역로 235','Chang-dong','13494',1,'01063107136'),(14,'제발요','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200','1','13590',5,'010-000-0000'),(15,'박주미','경기 용인시 처인구 명지로60번길 8-3','1','17056',2,'010-7280-3309'),(16,'박주미','서울 강남구 테헤란로 212','13층','06220',2,'010-1234-1234');
/*!40000 ALTER TABLE `accounts_deliveryaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_order`
--

DROP TABLE IF EXISTS `accounts_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) NOT NULL,
  `address` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_status` smallint unsigned NOT NULL,
  `order_receive` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `order_number` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` int unsigned NOT NULL,
  `has_review` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_order_user_id_ec204867_fk_accounts_user_id` (`user_id`),
  KEY `accounts_order_product_id_83d789e2_fk_products_product_id` (`product_id`),
  CONSTRAINT `accounts_order_product_id_83d789e2_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `accounts_order_user_id_ec204867_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `accounts_order_chk_1` CHECK ((`order_status` >= 0)),
  CONSTRAINT `accounts_order_chk_3` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_order`
--

LOCK TABLES `accounts_order` WRITE;
/*!40000 ALTER TABLE `accounts_order` DISABLE KEYS */;
INSERT INTO `accounts_order` VALUES (10,'2022-04-03 13:44:05.153063','서울특별시 강남구 언주로 508 14층',0,'허재석',1,3,1,1,0),(11,'2022-04-03 13:44:05.153063','서울시 서초구 ~',1,'싸피',1,3,2,1,0),(12,'2022-04-04 13:44:05.153063','서울특별시 강남구 언주로 508 14층',1,'허재석',1,4,3,3,0),(152,'2022-04-06 16:15:14.666197','서울 금천구 시흥대로 291 1321312',1,'김동현',6,400524030236402,1,1,0),(153,'2022-04-06 16:15:14.785201','서울 금천구 시흥대로 291 1321312',1,'김동현',6,400524030236402,2,1,0),(167,'2022-04-07 06:25:38.773917','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,353689276922714,2,1,0),(168,'2022-04-07 06:25:38.855915','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,353689276922714,1,1,0),(169,'2022-04-07 06:52:57.193293','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,171833401550481,1,1,0),(170,'2022-04-07 06:54:09.588515','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',0,'제발요',5,39511225668799,1,1,1),(171,'2022-04-07 06:54:54.009543','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,289403903537587,2,1,0),(175,'2022-04-07 07:28:29.616284','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,216023641133842,4,1,0),(176,'2022-04-07 07:30:09.011750','경기 성남시 분당구 성남분당우체국사서함 1 ~ 200 1',1,'제발요',5,11306402323997,19,1,0),(177,'2022-04-07 07:33:08.883672','경기 성남시 분당구 판교역로 235 Chang-dong',1,'111',1,367546857857186,1,3,0),(179,'2022-04-07 18:18:50.563119','서울 강남구 역삼로67길 33 502호',1,'홍승기',10,22249344133414,1,1,0),(180,'2022-04-07 18:18:50.577252','서울 강남구 역삼로67길 33 502호',1,'홍승기',10,22249344133414,3,1,0),(181,'2022-04-07 18:18:50.588401','서울 강남구 역삼로67길 33 502호',1,'홍승기',10,22249344133414,7,1,0),(182,'2022-04-07 18:18:50.598886','서울 강남구 역삼로67길 33 502호',1,'홍승기',10,22249344133414,4,1,0),(183,'2022-04-07 23:53:16.839659','경기 용인시 기흥구 기흥역로58번길 10 111',0,'박주미',2,27615746146272,191,1,0),(184,'2022-04-07 23:53:16.851962','경기 용인시 기흥구 기흥역로58번길 10 111',0,'박주미',2,27615746146272,1,1,1),(185,'2022-04-08 02:03:02.643134','서울 종로구 청와대로 1 85',1,'김종우',7,64639241830853,6,1,0),(186,'2022-04-08 02:03:35.419096','경기 용인시 처인구 명지로60번길 8-3 1',1,'박주미',2,263909602414743,3,1,1),(187,'2022-04-08 02:30:37.602401','서울 관악구 시흥대로 540 123-123',1,'김동현',6,27404289257273,2,1,0);
/*!40000 ALTER TABLE `accounts_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_subscription`
--

DROP TABLE IF EXISTS `accounts_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_subscription` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) NOT NULL,
  `period` int NOT NULL,
  `subscribe_times` smallint unsigned NOT NULL,
  `subscribe_dates` json NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_subscription_product_id_ac96cfed_fk_products_product_id` (`product_id`),
  KEY `accounts_subscription_user_id_980c85f5_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `accounts_subscription_product_id_ac96cfed_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `accounts_subscription_user_id_980c85f5_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `accounts_subscription_chk_1` CHECK ((`subscribe_times` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_subscription`
--

LOCK TABLES `accounts_subscription` WRITE;
/*!40000 ALTER TABLE `accounts_subscription` DISABLE KEYS */;
INSERT INTO `accounts_subscription` VALUES (3,'2022-04-04 16:08:14.346417',6,6,'{\"0\": \"2022-04-05\", \"1\": \"2022-04-11\", \"2\": \"2022-04-17\", \"3\": \"2022-04-23\", \"4\": \"2022-04-29\", \"5\": \"2022-05-08\"}',3,6),(4,'2022-04-04 18:13:31.379563',5,5,'{\"0\": \"2022-04-05\", \"1\": \"2022-04-11\", \"2\": \"2022-04-17\", \"3\": \"2022-04-23\", \"4\": \"2022-04-29\", \"5\": \"2022-05-08\"}',5,6),(33,'2022-04-07 11:36:11.558116',21,3,'{\"0\": \"2022-04-07\", \"1\": \"2022-04-28\", \"2\": \"2022-05-19\"}',3,1),(34,'2022-04-07 19:12:52.857910',21,1,'{\"0\": \"2022-04-08\"}',7,1),(35,'2022-04-07 19:13:01.440663',31,2,'{\"0\": \"2022-04-08\", \"1\": \"2022-05-09\"}',6,1),(39,'2022-04-07 23:50:43.147259',7,2,'{\"0\": \"2022-04-08\", \"1\": \"2022-04-15\"}',1,2),(40,'2022-04-08 02:02:50.272231',90,3,'{\"0\": \"2022-04-08\", \"1\": \"2022-07-07\", \"2\": \"2022-10-05\"}',6,7),(41,'2022-04-08 02:03:17.830443',28,2,'{\"0\": \"2022-04-08\", \"1\": \"2022-05-06\"}',3,2),(42,'2022-04-08 02:30:32.095531',5,5,'{\"0\": \"2022-04-08\", \"1\": \"2022-04-13\", \"2\": \"2022-04-18\", \"3\": \"2022-04-23\", \"4\": \"2022-04-28\"}',2,6);
/*!40000 ALTER TABLE `accounts_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_img` longtext COLLATE utf8mb4_unicode_ci,
  `updated_time` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES (1,'',NULL,0,'2179455344','','',1,1,'2022-04-01 07:43:34.279346','(\'허재석\',)','(\'no email\',)','http://k.kakaocdn.net/dn/cfxpzD/btq7C1j8mcj/d7YuVb1uKvnIQog1KuFWf0/img_640x640.jpg','2022-04-08 02:24:44.688077',0,0),(2,'',NULL,0,'2179452428','','',0,1,'2022-04-01 07:49:43.994587','(\'주미\',)','(\'zummy@kakao.com\',)','http://k.kakaocdn.net/dn/yoJxE/btryHKEjHJc/KkMKMMfrr8KJJWHLH0WWCK/img_640x640.jpg','2022-04-08 02:41:17.662932',0,0),(5,'',NULL,0,'2179662235','','',0,1,'2022-04-05 02:37:14.648852','(\'조성한\',)','(\'no email\',)','http://k.kakaocdn.net/dn/QZ97N/btrmbVdifQr/IyLx9u7Kxane7zjbnldbE1/img_640x640.jpg','2022-04-08 01:26:43.029548',0,0),(6,'',NULL,0,'2161138870','','',0,1,'2022-04-05 06:28:03.246622','(\'김동현\',)','(\'budkim1124@naver.com\',)','http://k.kakaocdn.net/dn/I95x9/btq6HRcesd6/VxaaJlxFNNMsXTTLmkfxV0/img_640x640.jpg','2022-04-08 02:27:18.917578',0,0),(7,'',NULL,0,'2178395861','','',0,1,'2022-04-06 04:50:07.382703','(\'김종우\',)','(\'kjwffr@gmail.com\',)','http://k.kakaocdn.net/dn/bAPVQB/btqZqGiJctJ/f4ZRIdYqpnDAK0V9yCLcnk/img_640x640.jpg','2022-04-08 02:47:42.797181',0,0),(8,'pbkdf2_sha256$320000$toFAwkXoF2kEEQfafucehN$E2RuCK803SXAg9rALASOprqjEBBlEyoOiLh1EfQw/Uk=','2022-04-06 08:32:41.781230',1,'toor21','','',1,1,'2022-04-06 08:32:29.136565',NULL,'chosnhn1@gmail.com',NULL,'2022-04-06 08:32:29.226565',0,0),(9,'',NULL,0,'2191602757','','',0,1,'2022-04-07 04:16:28.748407','(\'주지환\',)','(\'meanstrike@naver.com\',)','http://k.kakaocdn.net/dn/R7PM0/btryoY88UHO/vRJLgd8Vm3QOzRAG52aFd1/img_640x640.jpg','2022-04-07 13:36:35.572516',0,0),(10,'',NULL,0,'2192522283','','',0,1,'2022-04-07 18:17:19.033514','(\'홍승기\',)','(\'no email\',)','http://k.kakaocdn.net/dn/dzm1jy/btrpyjBQD90/sqwP2qX3u0uz5DfphfCsS1/img_640x640.jpg','2022-04-08 02:16:24.526652',0,0);
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_groups`
--

DROP TABLE IF EXISTS `accounts_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_groups_user_id_group_id_59c0b32f_uniq` (`user_id`,`group_id`),
  KEY `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` (`group_id`),
  CONSTRAINT `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `accounts_user_groups_user_id_52b62117_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_groups`
--

LOCK TABLES `accounts_user_groups` WRITE;
/*!40000 ALTER TABLE `accounts_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_user_permissions`
--

DROP TABLE IF EXISTS `accounts_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq` (`user_id`,`permission_id`),
  KEY `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` (`permission_id`),
  CONSTRAINT `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `accounts_user_user_p_user_id_e4f0a161_fk_accounts_` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_user_permissions`
--

LOCK TABLES `accounts_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `accounts_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add user',1,'add_user'),(2,'Can change user',1,'change_user'),(3,'Can delete user',1,'delete_user'),(4,'Can view user',1,'view_user'),(5,'Can add delivery address',2,'add_deliveryaddress'),(6,'Can change delivery address',2,'change_deliveryaddress'),(7,'Can delete delivery address',2,'delete_deliveryaddress'),(8,'Can view delivery address',2,'view_deliveryaddress'),(9,'Can add notice',3,'add_notice'),(10,'Can change notice',3,'change_notice'),(11,'Can delete notice',3,'delete_notice'),(12,'Can view notice',3,'view_notice'),(13,'Can add ingrediant',4,'add_ingrediant'),(14,'Can change ingrediant',4,'change_ingrediant'),(15,'Can delete ingrediant',4,'delete_ingrediant'),(16,'Can view ingrediant',4,'view_ingrediant'),(17,'Can add product',5,'add_product'),(18,'Can change product',5,'change_product'),(19,'Can delete product',5,'delete_product'),(20,'Can view product',5,'view_product'),(21,'Can add included',6,'add_included'),(22,'Can change included',6,'change_included'),(23,'Can delete included',6,'delete_included'),(24,'Can view included',6,'view_included'),(25,'Can add review',7,'add_review'),(26,'Can change review',7,'change_review'),(27,'Can delete review',7,'delete_review'),(28,'Can view review',7,'view_review'),(29,'Can add cart',8,'add_cart'),(30,'Can change cart',8,'change_cart'),(31,'Can delete cart',8,'delete_cart'),(32,'Can view cart',8,'view_cart'),(33,'Can add survey history',9,'add_surveyhistory'),(34,'Can change survey history',9,'change_surveyhistory'),(35,'Can delete survey history',9,'delete_surveyhistory'),(36,'Can view survey history',9,'view_surveyhistory'),(37,'Can add survey question',10,'add_surveyquestion'),(38,'Can change survey question',10,'change_surveyquestion'),(39,'Can delete survey question',10,'delete_surveyquestion'),(40,'Can view survey question',10,'view_surveyquestion'),(41,'Can add survey response',11,'add_surveyresponse'),(42,'Can change survey response',11,'change_surveyresponse'),(43,'Can delete survey response',11,'delete_surveyresponse'),(44,'Can view survey response',11,'view_surveyresponse'),(45,'Can add survey question choices',12,'add_surveyquestionchoices'),(46,'Can change survey question choices',12,'change_surveyquestionchoices'),(47,'Can delete survey question choices',12,'delete_surveyquestionchoices'),(48,'Can view survey question choices',12,'view_surveyquestionchoices'),(49,'Can add log entry',13,'add_logentry'),(50,'Can change log entry',13,'change_logentry'),(51,'Can delete log entry',13,'delete_logentry'),(52,'Can view log entry',13,'view_logentry'),(53,'Can add permission',14,'add_permission'),(54,'Can change permission',14,'change_permission'),(55,'Can delete permission',14,'delete_permission'),(56,'Can view permission',14,'view_permission'),(57,'Can add group',15,'add_group'),(58,'Can change group',15,'change_group'),(59,'Can delete group',15,'delete_group'),(60,'Can view group',15,'view_group'),(61,'Can add content type',16,'add_contenttype'),(62,'Can change content type',16,'change_contenttype'),(63,'Can delete content type',16,'delete_contenttype'),(64,'Can view content type',16,'view_contenttype'),(65,'Can add session',17,'add_session'),(66,'Can change session',17,'change_session'),(67,'Can delete session',17,'delete_session'),(68,'Can view session',17,'view_session'),(69,'Can add order',18,'add_order'),(70,'Can change order',18,'change_order'),(71,'Can delete order',18,'delete_order'),(72,'Can view order',18,'view_order'),(73,'Can add subscription',19,'add_subscription'),(74,'Can change subscription',19,'change_subscription'),(75,'Can delete subscription',19,'delete_subscription'),(76,'Can view subscription',19,'view_subscription'),(77,'Can add recommend',20,'add_recommend'),(78,'Can change recommend',20,'change_recommend'),(79,'Can delete recommend',20,'delete_recommend'),(80,'Can view recommend',20,'view_recommend'),(81,'Can add choices ingrediant',21,'add_choicesingrediant'),(82,'Can change choices ingrediant',21,'change_choicesingrediant'),(83,'Can delete choices ingrediant',21,'delete_choicesingrediant'),(84,'Can view choices ingrediant',21,'view_choicesingrediant');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_notice`
--

DROP TABLE IF EXISTS `community_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `views` int unsigned NOT NULL,
  `author_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `community_notice_author_id_765c9950_fk_accounts_user_id` (`author_id`),
  CONSTRAINT `community_notice_author_id_765c9950_fk_accounts_user_id` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `community_notice_views_628f70fe_check` CHECK ((`views` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_notice`
--

LOCK TABLES `community_notice` WRITE;
/*!40000 ALTER TABLE `community_notice` DISABLE KEYS */;
INSERT INTO `community_notice` VALUES (1,'Re:pill 서비스 개시!','나만의 영양제로 채우다! 영양제 및 건강식품 추천 및 구독 서비스 Re:pill이 오픈하였습니다. 앞으로도 많은 기능과 유용한 정보로 여러분을 찾아뵐 수 있도록 노력하겠습니다. 감사합니다.','2022-04-03 11:23:46.924942','2022-04-08 01:37:21.614741',5,1),(2,'서버 점검 안내 (4/5)','2022년 4월 5일 (화) 내부 서버 점검으로 인해 일부 기능 (쇼핑몰)을 사용하실 수 없습니다. 서버 점검 예정 시간: 04:00 ~ 06:00 사용자분들의 양해 부탁드립니다. 앞으로도 좋은 서비스로 찾아뵙는 Re:pill이 되겠습니다.','2022-04-04 00:10:15.233297','2022-04-04 00:10:15.233297',0,1),(3,'비타민 C 포함 영양제 이벤트!','비타민 C 포함된 영양제 중 일부 구매시 추후 구매액의 5% 마일리지를 지급할 예정입니다! 이벤트 기간: 2022년 4월 8일(금) ~ 2022년 4월 15일(금) 이벤트 기간은 변경될 수 있습니다. 감사합니다.','2022-04-05 03:34:23.740001','2022-04-08 02:43:16.604783',3,1);
/*!40000 ALTER TABLE `community_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (2,'accounts','deliveryaddress'),(18,'accounts','order'),(19,'accounts','subscription'),(1,'accounts','user'),(13,'admin','logentry'),(15,'auth','group'),(14,'auth','permission'),(3,'community','notice'),(16,'contenttypes','contenttype'),(8,'products','cart'),(6,'products','included'),(4,'products','ingrediant'),(5,'products','product'),(7,'products','review'),(17,'sessions','session'),(21,'survey','choicesingrediant'),(20,'survey','recommend'),(9,'survey','surveyhistory'),(10,'survey','surveyquestion'),(12,'survey','surveyquestionchoices'),(11,'survey','surveyresponse');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-04-01 07:42:43.008657'),(2,'contenttypes','0002_remove_content_type_name','2022-04-01 07:42:43.159262'),(3,'auth','0001_initial','2022-04-01 07:42:43.610325'),(4,'auth','0002_alter_permission_name_max_length','2022-04-01 07:42:43.707483'),(5,'auth','0003_alter_user_email_max_length','2022-04-01 07:42:43.727820'),(6,'auth','0004_alter_user_username_opts','2022-04-01 07:42:43.745741'),(7,'auth','0005_alter_user_last_login_null','2022-04-01 07:42:43.763854'),(8,'auth','0006_require_contenttypes_0002','2022-04-01 07:42:43.779842'),(9,'auth','0007_alter_validators_add_error_messages','2022-04-01 07:42:43.797298'),(10,'auth','0008_alter_user_username_max_length','2022-04-01 07:42:43.817291'),(11,'auth','0009_alter_user_last_name_max_length','2022-04-01 07:42:43.835292'),(12,'auth','0010_alter_group_name_max_length','2022-04-01 07:42:43.870291'),(13,'auth','0011_update_proxy_permissions','2022-04-01 07:42:43.902291'),(14,'auth','0012_alter_user_first_name_max_length','2022-04-01 07:42:43.932292'),(15,'accounts','0001_initial','2022-04-01 07:42:44.469311'),(16,'accounts','0002_deliveryaddress','2022-04-01 07:42:44.606954'),(17,'accounts','0003_deliveryaddress_phone_number','2022-04-01 07:42:44.670934'),(18,'accounts','0004_remove_user_uid','2022-04-01 07:42:44.755665'),(19,'admin','0001_initial','2022-04-01 07:42:44.991001'),(20,'admin','0002_logentry_remove_auto_add','2022-04-01 07:42:45.014262'),(21,'admin','0003_logentry_add_action_flag_choices','2022-04-01 07:42:45.036383'),(22,'community','0001_initial','2022-04-01 07:42:45.180786'),(23,'community','0002_alter_notice_views','2022-04-01 07:42:45.363853'),(24,'products','0001_initial','2022-04-01 07:42:45.664015'),(25,'products','0002_ingrediant_dose_recomm_metrics_product_ingrediants','2022-04-01 07:42:45.726522'),(26,'products','0003_review','2022-04-01 07:42:45.970048'),(27,'products','0004_product_thumbnail_url','2022-04-01 07:42:46.043403'),(28,'products','0003_cart','2022-04-01 07:42:46.287506'),(29,'products','0005_merge_0003_cart_0004_product_thumbnail_url','2022-04-01 07:42:46.303507'),(30,'products','0006_remove_review_title','2022-04-01 07:42:46.422393'),(31,'products','0007_remove_cart_delivery_fee','2022-04-01 07:42:46.511772'),(32,'products','0006_alter_product_content','2022-04-01 07:42:46.529623'),(33,'products','0008_merge_20220401_1453','2022-04-01 07:42:46.544671'),(34,'sessions','0001_initial','2022-04-01 07:42:46.631653'),(35,'survey','0001_initial','2022-04-01 07:42:47.168176'),(36,'survey','0002_alter_surveyresponse_answer_text','2022-04-01 07:42:47.189194'),(37,'survey','0003_alter_surveyresponse_answer_choice','2022-04-01 07:42:47.212201'),(38,'survey','0004_alter_surveyresponse_survey','2022-04-01 07:42:47.264200'),(39,'products','0008_merge_20220401_1443','2022-04-01 07:45:26.414939'),(40,'accounts','0004_order','2022-04-03 10:08:55.313252'),(41,'accounts','0005_order_order_number_order_product_order_quantity','2022-04-03 10:08:55.677555'),(42,'accounts','0006_merge_20220403_1908','2022-04-03 10:08:55.695582'),(43,'accounts','0006_merge_20220403_2221','2022-04-03 13:22:11.731383'),(44,'accounts','0007_order_has_review','2022-04-03 13:22:11.820294'),(45,'accounts','0006_merge_20220404_0151','2022-04-03 16:51:12.966928'),(46,'accounts','0008_merge_0006_merge_20220403_1908_0007_order_has_review','2022-04-03 20:48:29.577361'),(47,'accounts','0009_alter_order_order_number','2022-04-04 05:15:04.049430'),(48,'accounts','0010_subscription','2022-04-04 16:05:27.385455'),(49,'survey','0005_recommend','2022-04-05 11:06:56.128210'),(50,'products','0009_alter_included_dose_alter_included_dose_metrics','2022-04-06 05:50:23.621705'),(51,'survey','0006_surveyquestionchoices_related_ingrediant','2022-04-06 05:50:23.772891'),(52,'products','0009_alter_included_dose_alter_included_dose_metrics_and_more','2022-04-06 09:38:56.841432'),(53,'products','0010_alter_included_dose_alter_included_dose_metrics','2022-04-06 11:26:16.244505'),(54,'products','0011_alter_ingrediant_dose_recomm_and_more','2022-04-06 11:47:51.306693'),(55,'survey','0007_alter_surveyquestionchoices_question','2022-04-06 13:31:22.293533'),(56,'survey','0008_remove_surveyquestionchoices_related_ingrediant_and_more','2022-04-06 14:14:02.758377');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('52fyhc3goeuvj32gsmy4jrtg92pm2z84','.eJxVjDsOwjAQRO_iGlnOrvGHkj5nsGzvggPIluKkQtydREoBzRTz3sxbhLguJayd5zCRuAgnTr9divnJdQf0iPXeZG51mackd0UetMuxEb-uh_t3UGIv21opYxlQceZIHlEhRI2OmdF7nZIBcucEii3crPN6oMF4dtYhwpZJfL7R7zb8:1nc15l:3pL9sODqa2vvp1d2NmlGTTemCzqY61J-QjvylXIrGcg','2022-04-20 08:32:41.801230');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` smallint unsigned NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_cart_product_id_52080291_fk_products_product_id` (`product_id`),
  KEY `products_cart_user_id_d53bf7cf_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `products_cart_product_id_52080291_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `products_cart_user_id_d53bf7cf_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `products_cart_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_cart`
--

LOCK TABLES `products_cart` WRITE;
/*!40000 ALTER TABLE `products_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_included`
--

DROP TABLE IF EXISTS `products_included`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_included` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dose` int unsigned DEFAULT NULL,
  `dose_metrics` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ingrediant_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_included_ingrediant_id_0a0142c1_fk_products_` (`ingrediant_id`),
  KEY `products_included_product_id_53672cd2_fk_products_product_id` (`product_id`),
  CONSTRAINT `products_included_ingrediant_id_0a0142c1_fk_products_` FOREIGN KEY (`ingrediant_id`) REFERENCES `products_ingrediant` (`id`),
  CONSTRAINT `products_included_product_id_53672cd2_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `products_included_chk_1` CHECK ((`dose` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_included`
--

LOCK TABLES `products_included` WRITE;
/*!40000 ALTER TABLE `products_included` DISABLE KEYS */;
INSERT INTO `products_included` VALUES (1,NULL,NULL,1,1),(2,NULL,NULL,1,2),(3,NULL,NULL,1,3),(4,NULL,NULL,1,4),(5,NULL,NULL,1,5),(6,NULL,NULL,1,6),(7,NULL,NULL,1,7),(8,NULL,NULL,1,8),(9,NULL,NULL,1,9),(10,NULL,NULL,1,10),(11,NULL,NULL,1,11),(12,NULL,NULL,1,12),(13,NULL,NULL,1,13),(14,NULL,NULL,1,14),(15,NULL,NULL,1,15),(16,NULL,NULL,1,16),(17,NULL,NULL,1,17),(18,NULL,NULL,1,18),(19,NULL,NULL,1,19),(20,NULL,NULL,1,20),(21,NULL,NULL,1,21),(22,NULL,NULL,1,22),(23,NULL,NULL,1,23),(24,NULL,NULL,1,24),(25,NULL,NULL,1,25),(26,NULL,NULL,1,26),(27,NULL,NULL,1,27),(28,NULL,NULL,1,28),(29,NULL,NULL,1,29),(30,NULL,NULL,1,30),(31,NULL,NULL,1,31),(32,NULL,NULL,1,32),(33,NULL,NULL,1,33),(34,NULL,NULL,1,34),(35,NULL,NULL,1,35),(36,NULL,NULL,1,36),(37,NULL,NULL,1,37),(38,NULL,NULL,2,38),(39,NULL,NULL,2,39),(40,NULL,NULL,2,40),(41,NULL,NULL,2,41),(42,NULL,NULL,2,42),(43,NULL,NULL,2,43),(44,NULL,NULL,2,44),(45,NULL,NULL,2,45),(46,NULL,NULL,2,46),(47,NULL,NULL,2,47),(48,NULL,NULL,2,48),(49,NULL,NULL,2,49),(50,NULL,NULL,2,50),(51,NULL,NULL,2,51),(52,NULL,NULL,2,52),(53,NULL,NULL,2,53),(54,NULL,NULL,2,54),(55,NULL,NULL,2,55),(56,NULL,NULL,2,56),(57,NULL,NULL,2,57),(58,NULL,NULL,2,58),(59,NULL,NULL,2,59),(60,NULL,NULL,2,60),(61,NULL,NULL,2,61),(62,NULL,NULL,2,62),(63,NULL,NULL,2,63),(64,NULL,NULL,2,64),(66,NULL,NULL,2,66),(67,NULL,NULL,2,67),(68,NULL,NULL,2,68),(69,NULL,NULL,2,69),(71,NULL,NULL,2,71),(72,NULL,NULL,2,72),(73,NULL,NULL,2,73),(74,NULL,NULL,2,74),(75,NULL,NULL,2,75),(76,NULL,NULL,2,76),(77,NULL,NULL,2,77),(78,NULL,NULL,4,78),(79,NULL,NULL,4,79),(80,NULL,NULL,4,80),(81,NULL,NULL,4,81),(82,NULL,NULL,4,82),(83,NULL,NULL,4,83),(84,NULL,NULL,4,84),(86,NULL,NULL,4,86),(87,NULL,NULL,4,87),(88,NULL,NULL,4,88),(89,NULL,NULL,4,89),(90,NULL,NULL,4,90),(92,NULL,NULL,4,93),(93,NULL,NULL,4,94),(94,NULL,NULL,4,95),(95,NULL,NULL,4,96),(96,NULL,NULL,4,97),(97,NULL,NULL,4,98),(98,NULL,NULL,4,99),(99,NULL,NULL,4,100),(100,NULL,NULL,4,101),(101,NULL,NULL,4,102),(102,NULL,NULL,4,103),(103,NULL,NULL,4,104),(104,NULL,NULL,4,105),(105,NULL,NULL,4,106),(106,NULL,NULL,4,107),(107,NULL,NULL,4,108),(108,NULL,NULL,4,109),(110,NULL,NULL,4,111),(111,NULL,NULL,4,112),(112,NULL,NULL,4,113),(113,NULL,NULL,4,114),(114,NULL,NULL,4,115),(115,NULL,NULL,4,116),(116,NULL,NULL,4,117),(118,NULL,NULL,4,119),(119,NULL,NULL,13,161),(120,NULL,NULL,13,162),(121,NULL,NULL,13,163),(122,NULL,NULL,13,164),(123,NULL,NULL,13,165),(124,NULL,NULL,13,166),(125,NULL,NULL,13,167),(127,NULL,NULL,13,169),(128,NULL,NULL,13,170),(129,NULL,NULL,13,171),(130,NULL,NULL,13,172),(131,NULL,NULL,13,173),(132,NULL,NULL,13,174),(133,NULL,NULL,13,175),(134,NULL,NULL,13,176),(135,NULL,NULL,13,177),(136,NULL,NULL,13,178),(137,NULL,NULL,13,179),(138,NULL,NULL,13,180),(139,NULL,NULL,13,181),(140,NULL,NULL,13,182),(141,NULL,NULL,13,183),(142,NULL,NULL,13,184),(143,NULL,NULL,13,185),(144,NULL,NULL,13,186),(145,NULL,NULL,13,187),(146,NULL,NULL,13,188),(147,NULL,NULL,13,189),(148,NULL,NULL,13,190),(149,NULL,NULL,13,191),(150,NULL,NULL,13,192),(151,NULL,NULL,13,193),(152,NULL,NULL,13,194),(153,NULL,NULL,13,195),(154,NULL,NULL,13,196),(155,NULL,NULL,13,197),(156,NULL,NULL,13,198),(157,NULL,NULL,13,199),(158,NULL,NULL,13,200),(159,NULL,NULL,13,201),(160,NULL,NULL,13,202),(161,NULL,NULL,13,203),(162,NULL,NULL,13,204),(164,NULL,NULL,13,206),(165,NULL,NULL,5,253),(166,NULL,NULL,5,254),(167,NULL,NULL,5,255),(168,NULL,NULL,5,256),(169,NULL,NULL,5,257),(170,NULL,NULL,5,258),(171,NULL,NULL,5,259),(172,NULL,NULL,5,260),(173,NULL,NULL,5,261),(174,NULL,NULL,5,262),(175,NULL,NULL,5,263),(176,NULL,NULL,5,264),(177,NULL,NULL,5,265),(178,NULL,NULL,5,266),(179,NULL,NULL,5,267),(180,NULL,NULL,5,268),(181,NULL,NULL,5,269),(182,NULL,NULL,5,270),(183,NULL,NULL,5,271),(184,NULL,NULL,5,272),(185,NULL,NULL,5,273),(186,NULL,NULL,5,274),(187,NULL,NULL,5,275),(188,NULL,NULL,5,276),(189,NULL,NULL,5,277),(190,NULL,NULL,5,278),(191,NULL,NULL,5,279),(192,NULL,NULL,5,280);
/*!40000 ALTER TABLE `products_included` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_ingrediant`
--

DROP TABLE IF EXISTS `products_ingrediant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_ingrediant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `dose_recomm` int unsigned DEFAULT NULL,
  `dose_recomm_metrics` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `products_ingrediant_chk_1` CHECK ((`dose_recomm` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_ingrediant`
--

LOCK TABLES `products_ingrediant` WRITE;
/*!40000 ALTER TABLE `products_ingrediant` DISABLE KEYS */;
INSERT INTO `products_ingrediant` VALUES (1,'루테인','노화로 인해 감소될 수 있는 황반색소밀도를 유지하여 눈 건강에 도움을 줌',20,'mg'),(2,'비타민 C','결합조직 형성: 비타민 C는 생체 내에서 여러 가지 효소반응의 조효소로 쓰이며, 피부, 골격, 혈관, 연골 등의 결합조직을 구성하는 주요 단백질인 콜라겐의 합성에 관여한다. 아미노산인 프롤린(proline)과 리신(lysine)이 수산화 되어 하이드록시프롤린(hydroxyproline)과 하이드록시리신(hydroxylysine)을 형성할 때 비타민 C가 수산화효소(hydroxylase)의 철분을 환원형으로 유지시키는 역할을 하게 되어 콜라겐은 조직을 유지하게 된다.; 항산화 기능: 비타민 C의 전자제공 기능은 활성산소종(reactive oxygen species, ROS)과 활성질소종(reactive nitrogen species, RNS) 등의 자유기를 제거하는 항산화 활성을 띠게 한다. 특히 안구나 중성구, 정액 등과 같이 자유기로부터 손상을 받기 쉬운 조직은 비타민 C의 함량이 비교적 높은 것으로 알려져 있으며 이외에도 저밀도지단백질(LDL) 등의 지질과산화의 개시를 방지하므로 비타민 E의 절약작용에도 관여한다. 또한 비타민 C의 라디칼은 다른 항산화제에 비해 반감기(half-life)가 5~10초로 비교적 긴 편이어서 안정적인 항산화제로 인정되고 있다.; 철분 흡수: 비타민 C는 소장관에서 철분을 환원형으로 전환시킴으로써 헤모글로빈에 결합되어 있지 않은 식물성 철분의 흡수를 촉진한다.',NULL,NULL),(3,'칼슘','칼슘은 골격과 치아의 구성성분으로 체내 칼슘 함량의 약 99%가 여기에 존재하며, 근육, 신경의 정상적인 기능 유지에도 관여한다. 칼슘은 또한 골격 근육과 심근육 세포의 수축 및 이완작용을 조절하며, 혈액 응고와 관련된 많은 효소의 작용에 꼭 필요한 영양소이다. 또한 칼슘은 근육의 수축과 이완, 신경전달에도 관여한다. 마지막으로 칼슘이온은 혈액응고에 관여하는 단백질인 피브린(fibrin)을 형성하는 반응에 필수적이다. 즉 칼슘 없이는 혈액응고가 이루어 질 수 없다.',700,'mg'),(4,'마그네슘','마그네슘은 세포 내에서 효소의 작용, 에너지 대사, 신경 전달, 호르몬 분비, 체온 조절 등에 관여하는 것으로 파악되고 있다. 마그네슘이 결핍되면 혈중 칼슘 농도가 낮아져 저칼슘혈증(hypocalcemia)이 나타나 근육경련, 고혈압, 관상혈관과 뇌혈관의 경련이 일어날 수 있다. 이는 나트륨과 칼슘 펌프의 손상으로 인해 신경세포 기능이 비정상적으로 되기 때문에 나타난다. 또한 마그네슘은 골격과 무기질의 항상성에 중요한 역할을 하며 골격세포의 기능뿐만 아니라 뼈의 수산화인회석(hydroxyapatite) 결정의 형성과 성장에 직접적인 영향을 주기 때문에, 마그네슘 결핍은 폐경 후 골다공증 발생의 요인이 될 수도 있다. 다만 마그네슘을 과다 복용하면 초기 증상으로 설사, 신장 기능에 이상이 있는 환자에게는 고마그네슘혈증을 유발하며 저혈압, 두통, 오심 등의 증상이 나타날 수 있으니 주의가 필요하다.',350,'mg'),(5,'오메가-3','오메가-3는 혈액의 흐름을 개선하고 혈중중성지방을 조절한다는 연구 결과가 있다. 여러 역학연구들에 의하면, 규칙적으로 생선을 섭취하는 사람들은 관상동맥심장질환(CHD)으로 사망할 확률이 섭취하지 않는 사람들보다 훨씬 더 낮다고 한다. 최근 연구들은 연어 기름을 섭취하는 것이 혈장 콜레스테롤, 중성지방, LDL-콜레스테롤과 VLDL-콜레스테롤 수준을 낮춰 지질 프로파일을 개선시킨다고 보고하였다. 또한, DHA와 EPA가 풍부한 생선 기름은 혈장 HDL-콜레스테롤 농도를 증가시키는 endothelial lipase(EL)의 활성을 억제한다는 연구결과가 보고된 바 있다. 단 DHA 및 EPA는 혈전용해작용으로 피를 멈추지 않게 하는 효과가 있기 때문에 수술 전에는 섭취를 금해야 한다. 또한, 필수지방산인 오메가-3계열의 지방산과 오메가-6계열의 지방산은 체내에서 불포화반응-사슬연장 단계에서 두 지방산간의 경쟁과 체내 요구량의 균형이 매우 중요하므로 식사로 섭취한 지방산 이외에 건강기능식품을 제안된 섭취량 이상으로 과도하게 섭취하는 것은 금해야 한다.',NULL,NULL),(6,'칼륨','칼륨은 세포외액의 나트륨 이온과 함께 세포의 삼투압과 수분평형을 유지하는 기능을 한다. 체액의 산-알칼리 균형을 유지시켜 주며 혈당이 클리코겐으로 전환되어 저장되거나 단백질이 저장될 때 칼륨과 함께 저장된다. 또, 신경 및 근육세포의 흥분과 자극전달을 조절하여 근육의 수축과 이완을 조절하며, 다량 섭취 시 나트륨의 배설을 증가시켜 혈압을 강하시키는 효과도 있다. 칼륨의 결핍증은 건강한 사람에서는 거의 없다. 다만, 심한 설사나 장기간 굶주렸을 때, 이뇨제 복용시 칼륨 결핍이 일어날 수 있는데, 식욕감퇴, 근육경련, 변비, 불규칙한 심장박동의 증상을 보인다.',NULL,NULL),(7,'카테킨','카테킨은 발암억제, 동맥경화, 혈압상승 억제, 혈전예방, 항바이러스, 항비만, 항당뇨, 항균, 해독작용, 소염작용, 충치예방, 구갈방지, 장내 세균총 정상화 등 다양한 효과가 있다. 카테킨의 항산화 작용과 노화의 근본적 요소인 자유라디컬 제거기능은 비타민C와 비타민E에 비해 강력한 활성산소 제거효과를 가지고 있으며, 항산화작용으로 인하여 저밀도지단백(low density lipoprotein) 산화와 같은 심혈관계 보호효과가 보고되었다. 카테킨은 바람직하지 않은 세포군집의 생산과 개시를 멈추거나 느리게 하며, DNA 손상을 경험적으로 야기하는 것들을 저지하는 것으로 나타났다.',NULL,NULL),(8,'나토키나아제','나토키나아제는 강력한 혈전분해능력과 프로유로키나제(pro-urokinase: 혈전용해효소의 전단계 물질) 활성화 능력을 갖고 있다. 최근 연구에 의하면 청국장에 들어있는 나토키나아제가 혈전을 분해시켜 심혈관계 질환에 효과적인 것으로 보고되고 있다. 이 외에도 나토키나아제는 혈전치료제로서 뇌졸중, 심근경색, 혈전증 등에 효과적인 것으로 연구되고 있으며 피브린(fibrin)을 녹이는 혈전 용해 효소로서 경구 섭취해도 그 효과가 탁월한 것으로 보고되고 있다. ',NULL,NULL),(9,'프로바이오틱스','프로바이오틱스는 섭취되어 장에 도달하였을 때에 장내 환경에 유익한 작용을 하는 균주를 말한다. 즉, 장에 도달하여 장 점막에서 생육할 수 있게 된 프로바이오틱스는 젖산을 생성하여 장내 환경을 산성으로 만든다. 산성 환경에서 견디지 못하는 유해균들은 그 수가 감소하게 되고 산성에서 생육이 잘 되는 유익균들은 더욱 증식하게 되어 장내 환경을 건강하게 만들어 주게 되는 것이다. 단 제안된 섭취량 이상으로 섭취하더라도 기능성이 더 좋아지는 것은 아니다. 오히려 과량으로 섭취하면, 이형젖산발효(heterofermentation)를 하는 균주의 경우에는 가스를 발생시켜 설사 등을 유발할 수 있으므로 주의하여야 한다.',NULL,NULL),(10,'셀레늄','셀레늄은 체내의 여러 가지 작용에 필수적인 미량 무기질이며 항산화 물질이다. 셀레늄은 강력한 항산화력으로 세포막 손상을 일으키는 과산화수소와 같은 활성산소를 제거하여 신체 조직의 노화와 변성을 막아 주거나 그 속도를 지연시킨다. 셀레늄의 항산화 작용은 해독 작용과 면역 기능을 증진시키고 자외선, X선, 방사선의 피해를 경감시켜 암, 간 질환, 신장병, 관절염 등을 예방하고 치료하는 데 작용한다. 셀레늄은 필수 미량 영양소이므로 고용량을 섭취하면 독성을 나타낼 수 있다. 셀레늄 독성의 가장 흔한 증상은 머리카락과 손톱이 부스러지고 소실되며 복통, 설사, 구토 등 위장 장애, 피부 발진, 피로감, 신경계 이상 등이 나타날 수 있으니 주의해야 한다.',NULL,NULL),(11,'식이섬유','식이섬유란 사람의 소화효소로 분해되기 어려운 난소화성 고분자 물질로, 식물의 세포벽성분을 지칭하여 부르기 시작한 용어이다. 많은 연구 결과들은 과일, 채소와 같은 식물성 식품의 세포벽을 구성하는 식이섬유들이 “배변활동”, “콜레스테롤 조절”, “식후혈당상승억제”에 도움을 준다고 보고하고 있다. 하지만 식이섬유들은 각 원재료에 따라 물에 용해되는 성질, 분자량, 구성하고 있는 성분 등이 매우 다르므로, 기능성을 나타내는 특성과 유효 섭취량 또한 달라지게 된다.',NULL,NULL),(12,'비타민 E','비타민 E의 주된 기능은 항산화작용을 통해 세포막을 구성하는 불포화지방산의 과산화를 막아주는 것이다. 세포막을 구성하는 다가불포화지방산은 세포에서 만들어진 유리라디칼에 의해 쉽게 산화되는데, 알파-토코페롤은 이러한 산화과정을 중단시키고 유리라디칼을 제거하므로 세포막을 산화적 손상으로부터 보호할 수 있다. 즉 산화환원제로 작용하여 자신이 산화되면서 다른 물질의 산화를 막기 때문에 산화제의 공격으로부터 다른 분자나 세포의 일부분을 보호하는 역할을 한다. 따라서 비타민 E가 부족하면 세포막에 존재하는 불포화지방산이 쉽게 산화되어 세포가 손상되며, 적혈구의 용혈현상이나 근육 및 신경세포의 손상까지 가져올 수 있다. 사람에게 있어서 비타민 E의 결핍증은 거의 나타나지 않으나, 어떤 이유로든 일단 비타민 E가 결핍되면 심각한 신경손상 증상이 나타난다.',NULL,NULL),(13,'코엔자임 Q10','코엔자임 Q10은 항산화 및 높은 혈압 감소에 도움을 줄 수 있다. 세포의 에너지 대사를 활성화하고 활성 산소를 제거해주는 대표적인 항산화 물질이다. 특히 피부 노화와 관련이 많은데, 피부 표피와 진피에 약 10:1정도의 비율로 존재하면서 피부 세포 활력에 영향을 주기 때문이다.',NULL,NULL),(14,'비타민 A','비타민 A는 시력, 성장 및 발달 그리고 면역의 3가지 기본적 생리기능을 유지하기 위해 필요하다. 비타민 A의 부족으로 시각과정에서 소모된 레티날이 대치되지 못하면 안구의 간상세포에서 빛의 감지기능이 늦어지고 그 결과 야맹증이 나타 난다. 비타민 A의 결핍이 더 지속되면 점막을 형성하는 세포가 파괴되어 안구표면의 수분이 보유되지 못하므로 안구건조증(xerophthalmia)으로 발전되며, 심하면 실명될 수도 있다. 비타민 A가 결핍되면 각화과다증(hyperkeratosis)과 같은 피부변화가 나타난다. 케라틴은 보통 피부 외피층에서 피부의 수분손실을 억제하는데, 비타민 A 결핍이 심각해지면 정상적으로 피부 바깥층에 위치하여야 하는 케라틴화 세포가 피부 밑의 상피세포로 위치를 바꾸게 된다. 그 결과 모낭이 케라틴으로 막히면 피부가 거칠고 매우 건조하게 된다. 예외적인 고용량을 1회 섭취하거나 일일권장량의 100배 정도의 양을 수일간 섭취하면 오심, 두통, 현기증, 근육무력감, 가려움증 등의 급성독성 증상이 나타날 수 있으므로 주의해야 한다.',NULL,NULL),(15,'제아잔틴','제아잔틴은 망막황반 중심에서 매우 중요한 물질이다. 노화에 따른 시력감퇴 위험이 제아잔틴의 낮은 혈장 플라즈마 농도와 관계가 있으며, 제아잔틴의 공급이 노화에 따른 시력감퇴를 예방하도록 도와준다고 하였다. 또한 제아잔틴은 백내장의 위험을 낮추는 역할을 한다.',NULL,NULL),(16,'비타민 D3','비타민 D3는 지용성 비타민의 한 종류로서 체내 칼슘농도를 조절하며 내장에서 칼슘이동에 작용하여 혈중칼슘농도를 조절한다. 대구나 다랑어의 간유에 많은 비타민으로 칼슘염과 인산염의 흡수를 촉진하며 골격형성에 도움을 준다. 아세톤을 재결정하여 바늘모양의 결정을 얻어 식품의 강화제로 사용되는데, 과잉증이 있기 때문에 식품 첨가는 신중할 필요가 있다.',NULL,NULL),(17,'L-테아닌','L-테아닌은 백색의 결정성 분말로서 냄새가 없으나 약간 단맛과 특이한 맛을 가지고 있다. 천연에는 다엽 중에 함유되어 있다. 다이어트 식품의 성분, 착향료 등으로 사용되며, 차에 풍미향상의 목적으로 조미료로 사용된다. 긴장 완화, 면역증강작용이 있다는 연구 결과가 보고되었으며, 혈압강하작용, 혈중 콜레스테롤을 저하, 스트레스 해소, 수면 보조, 집중력 강화, 항우울증 치료, 알코올 해독 등의 각종 연구결과가 보고되고 있다.',NULL,NULL),(18,'아연','아연은 지방세포로 포도당이 유입되는 것을 조절하는 인슐린 작용에 영향을 미친다. 성장 호르몬, 성 호르몬, 갑상선호르몬, 프로락틴 등의 호르몬 활성과도 관련이 있다. 또한 아연은 면역 기능에 관여한다. 아연은 효소의 구성 요소로서 탄수화물, 단백질, 지질, 핵산의 합성과 분해에 관여한다. 특히 핵산 DNA와 RNA의 합성에 관여하여 세포의 분화, 증식 및 유전자 발현 과정에서 필수적인 역할을 하여 성장, 조직 및 골격 형성, 생식, 면역 기능 등이 원활하게 이루어지도록 한다. 아연이 결핍되면 위장관이나 폐조직 내막의 손상이 흔히 나타나며 다핵림프구, 자연살해세포 기능에도 영향을 미친다.',NULL,NULL),(19,'클로렐라','엽록소 함유 식물과 클로렐라는 항산화 작용과 피부 건강의 기능성으로 인정되었다. 클로렐라 등 엽록소 함유 식물 섭취는 직접적인 항산화 작용뿐만 아니라 항산화 효소 활성을 촉진시키는 방법을 통하여 세포 내 산화 스트레스 감소에 도움을 줄 것이라 판단할 수 있다.',NULL,NULL),(20,'비타민 B7','비타민 B7 (비오틴)은 황(sulfur)을 함유하고 있는 비타민으로 지방과 탄수화물 대사에 관여한다. 피부와 두발에 좋은 영향을 미치기 때문에 \'비타민 H\'로 지칭된다. 또한 비오틴은 혈구의 생성과 남성 호르몬 분비에 관여하며, 다른 비타민 B군과 함께 신경계와 골수의 기능을 원활하게 한다. 일상의 식사에서 부족한 비오틴를 보충할 목적으로 섭취하는 건강기능식품의 기능성은 지방, 단백질, 글리코겐 합성에 관여한다. 비오틴은 장내 미생물에 의해 생합성되므로 결핍은 거의 일어나지 않지만, 술과 담배는 장내 세균의 활동을 방해하기 때문에 알코올 중독자와 흡연자의 경우 체내 비오틴 생산에 문제가 생겨 비오틴 요구량이 증가한다.',30,'㎍'),(21,'비타민 B1','비타민 B1은 티아민이라고도 하며, 탄수화물 대사과정 중에 조효소로서 매우 중요한 역할을 한다. 비타민 B1의 유도제인 벤포티아민, 푸르설티아민은 체내 지속시간이 연장되어 말초신경염 등에 효과가 있는 합성 비타민 B1이다. 비타민 B1이 결핍되면 초기 식욕감퇴 ·피로 ·체중감소 ·정신불안 등의 증세가 나타나기 시작하며, 각기병, 말초신경장애, 심장장애, 베르니케-코르사코프 증후군 등을 일으킬 수 있다. 말린 곡류(특히 현미나 보리, 콩류), 돼지고기에 다량 함유되어 있다. 과다한 알코올을 섭취하게 되면 장에서는 비타민 B1의 흡수가 방해되며, 체내에선 분해가 촉진되므로 결핍이 일어날 수 있다. 그 외 과다한 당분 섭취, 엽산 부족, 불충분한 식사, 흡수장애 증후군, 지속적인 설사, 장기간 이뇨제 복용, 임부 수유부, AIDS 환자 등에서 결핍될 수 있다.',1,'mg'),(22,'비타민 B2','비타민 B2는 황록색 형광을 띠는 오렌지색 혹은 노란색이며, 리보플라빈이라고 불린다. 시토크롬 효소계 등 수 많은 산화환원반응에 관여하며, 탄수화물, 지방, 단백질 등 열량소의 대사에 조효소로 작용한다. 시각, 점막, 피부, 손톱, 두발조직의 세포성장과 유지에도 필수적이다. 그러므로 결핍되면 여러 대사과정이 저해되어 다양한 장애를 일으킨다. 결핍시 눈이 빛에 민감해지거나 눈의 피로감, 흐린 시야, 결막염, 백내장, 피부염, 홍색 혀, 구내염 등이 유발될 수 있다. 우유, 치즈, 간, 달걀, 돼지고기, 내장고기, 녹색채소에 많이 함유되어 있다. 결핍은 드물지만 섭취 부족, 알코올 중독, 흡수장애 증후군 등에 의해 결핍이 일어날 수 있고, 에너지나 지방의 섭취량이 많을 때, 임신 시, 상처 치유기 등 세포증식이 활발한 시기 등 비타민 B2의 필요량이 증가된 경우 결핍될 수 있다. 장내세균에 의해 합성되므로 항생제 복용으로 설사가 지속될 때 장내세균의 수가 감소되어 결핍될 수 있다.',1,'mg'),(23,'비타민 B3','비타민 B3는 니코틴산 또는 니아신이라고도 하며, 그의 활성형이 니코틴산아미드이다. 생체 내의 산화 ·환원반응에 관여한다. 세포 호흡, 당 분해, 지질합성 과정 등 광범위하게 작용하므로, 모든 조직세포의 정상적인 생명현상을 유지하는 데 없어서는 안 되는 물질이다. 고용량 니코틴산은 중성지방과 LDL-콜레스테롤을 감소시키고 HDL-콜레스테롤을 증가시키는 작용이 있다. 결핍시 초기에는 피로, 식욕감퇴, 체중감소로 시작하여 피부염, 설사, 치매 등이 나타나는 펠라그라가 유발된다. 니코틴산은 효모, 육류, 간, 콩류에 많다. 니코틴산아미드는 동물체 내에서 아미노산인 트립토판으로부터 합성되므로, 우유나 달걀 등 단백질을 많이 섭취하면 결핍증이 생기지 않는다. 급성 질환, 심한 상해, 감염, 화상 등으로 칼로리 소모가 급격히 증가된 경우, 악성종양, 이소니아지드(항결핵약)와 같은 약물의 투여로 인해 결핍이 생길 수 있다.',15,'mg'),(24,'비타민 B5','비타민 B5 (판토텐산)는 생화학반응에 필수적인 조효소 코엔자임 A의 전구체로서 탄수화물, 지방, 단백질이 에너지를 생성하는데 필수적이다. 신경전달물질인 아세틸콜린의 합성을 돕고, 콜레스테롤, 스테로이드, 지방산의 합성과정에서 중요한 역할을 한다. 또한 피부와 머리카락의 구성물질인 콜라겐 생성에 필수적이다. 결핍은 드물지만, 결핍시에는 다른 영양소의 결핍과 함께 나타난다. 식욕부진, 피부염, 소화관 궤양, 발의 타는 듯한 통증, 졸림, 피로, 심혈관계 불안정, 복통, 다리의 반사항진, 근육약화를 동반하는 손발의 감각이상 등이 나타난다. 대부분 식품에 함유되어 있으며, 효모, 배아, 콩류, 간, 동물의 내장 등에 많다. 알코올 중독, 심한 영양 결핍시, 소모성 질환, 갑상선기능항진증, 임부, 수유부, 고콜레스테롤혈증, 급만성질환, 접촉성피부염, 긴장성 변비, 수술 후 장관마비 등에 의해 결핍이 생긴다.',10,'mg'),(25,'비타민 B6','비타민 B6에는 피리독신, 피리독살, 피리독사민이 있으며, 그 중 피리독신이 의약품으로 사용된다. 체내에서 단백질 대사에 광범위하게 관여하며, 수많은 효소의 보조인자로 작용한다. 헤모글로빈의 합성에도 관여하고, 심혈관계 질환의 위험인자인 호모시스테인의 분해에도 관여한다. 피부나 점막, 신경의 기능을 유지시킨다. 결핍시 증상은 니코틴산아미드나 비타민 B2 결핍증과 비슷하다. 효모, 밀, 옥수수, 간에 풍부하게 들어 있다. 장내 세균에 의하여 합성되어 장에서 흡수 이용되기 때문에 결핍은 잘 일어나지 않지만, 알코올 중독, 경구피임약이나 결핵치료제의 복용으로 체내 비타민 B6가 감소되어 결핍증이 생길 수 있다.',2,'mg'),(26,'비타민 B9','비타민 B9은 폴산이라고도 불리며 체내에서 DNA와 아미노산의 합성에 필요하다. 비타민 B12과 함께 적혈구의 생성과정에서 중요한 역할을 한다. 엽산이 결핍되면 거대적아구성 빈혈이 생긴다. 임신부에게 엽산 결핍이 발생할 경우 영아에게 신경관 결손 등의 장애가 나타날 위험이 증가된다. 엽산 결핍이 심할 경우 붉고 쓰린 혀, 미각 감소, 혼돈, 체중 감소 및 우울증이 나타날 수 있다. 녹색 잎 채소, 감귤류 등의 과일, 간, 곡류, 두류 등에 풍부하게 존재한다. 생 잎 채소와 감귤류 과일을 충분히 먹지 않는 등 엽산을 적게 섭취할 때 결핍되기 쉽다. 그 외에도 임신, 수유, 투석 등으로 엽산의 필요량이 증가되었을 때, 엽산의 흡수를 방해하는 질환이나 알코올, 항경련제(페니토인 등), 항암화학요법제(메토트렉세이트) 등의 약물을 투여하는 경우에도 엽산이 결핍될 수 있다.',400,'㎍'),(27,'비타민 B12','비타민 B12는 DNA의 합성과 대사, 탄수화물, 지방, 단백질의 대사에 관여한다. 엽산과 함께 세포분열에 관여한다. 결핍시 적혈구 성숙에 필요한 DNA 를 합성하지 못하므로 세포질만 커진 거대적아구성 빈혈인 악성빈혈을 일으킨다. 신경세포의 형성과 수복, 기능 유지에도 관여하므로 결핍되면 신경통, 요통, 어깨결림, 수족저림 등의 말초신경장애를 일으킨다. 동물성 단백질에 다량 존재하며, 위에서 흡수된다. 그러므로 채식주의자, 위를 절제했거나 고령자등 위산의 분비기능이 저하된 사람에게서 결핍되기 쉽다.',2,'㎍');
/*!40000 ALTER TABLE `products_ingrediant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_product`
--

DROP TABLE IF EXISTS `products_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `products_product_chk_1` CHECK ((`price` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_product`
--

LOCK TABLES `products_product` WRITE;
/*!40000 ALTER TABLE `products_product` DISABLE KEYS */;
INSERT INTO `products_product` VALUES (1,'[5%추가+T11%]비비랩 윤아 저분자 콜라겐 3통(3개월분) 外 이너뷰티 모음전','뉴트리원',45650,'','https://i.011st.com/t/300/pd/22/0/3/7/8/7/2/kGjKt/2567037872_L300.jpg'),(2,'[찜10%]아이클리어 루테인 지아잔틴 3박스 외 종근당건강 건강식품','종근당건강본사직영',36900,'','https://i.011st.com/t/300/pd/22/9/7/3/1/0/2/NKfJP/1489973102_L300.jpg'),(3,'순수식품 rTG 알티지 오메가3 비타민D 6개월분/루테인 지아잔틴 크릴오일 칼슘 MSM','순수식품',26900,'','https://i.011st.com/t/300/pd/22/2/1/2/9/1/0/ycRLI/2790212910_L300.jpg'),(4,'GNM 눈건강 빌베리 루테인 오메가3/프로폴리스/지아잔틴/칼슘/알티지오메가-3/밀크씨슬','GNM자연의품격',37900,'','https://i.011st.com/t/300/pd/21/7/3/6/4/5/4/mOaDc/1255736454_L300.jpg'),(5,'헬스프랜드 캐나다 프리미엄 루테인 2.0 6개월분 눈영양제 눈건강','헬스프랜드',19900,'','https://i.011st.com/t/300/pd/21/1/5/8/1/3/3/APrQI/432158133_B.jpg'),(6,'루테인 눈건강 영양제 캐나다 3개월분','인테로',14800,'','https://i.011st.com/t/300/pd/22/3/3/4/8/8/3/KoZYw/2708334883_L300.jpg'),(7,'안국 루테인 지아잔틴 미니 식물성 180캡슐 1개 6개월분','안국건강',43900,'','https://i.011st.com/t/300/dl/22/6/9/3/0/1/2/qMHlV/2776693012_139037599_05.jpg'),(8,'뉴트리원 정우성 루테인 지아잔틴 164 6박스(6개월분) 눈 건강 비타민 아연','뉴트리원',104900,'','https://i.011st.com/t/300/pd/21/2/1/4/4/9/9/cdelU/2246214499_L300.jpg'),(9,'[JW중외제약] 프리미엄 루테인 골드 6박스 6개월분 눈건강 눈영양제','온푸드★',29900,'','https://i.011st.com/t/300/pd/22/4/1/2/8/9/2/UYGGJ/1585412892_L300.jpg'),(10,'캐나다 루테인 아스타잔틴 지아잔틴 마리골드꽃 비타민A 아연 눈영양제 헤마토코쿠스 6개월분','그랑도눔공식한국지사',49800,'','https://i.011st.com/t/300/pd/22/8/5/1/3/7/8/DYKaz/2812851378_L300.jpg'),(11,'루테인 프리미엄 (6개월분) - 눈영양제 눈건강','튼튼닷컴',22900,'','https://i.011st.com/t/300/pd/21/7/9/3/6/0/5/OXxPB/1042793605_L300.jpg'),(12,'일양 눈건강 루테인골드 120캡슐 눈영양제 4박스 (4개월분)','주식회사씨앤에스헬스케어',32000,'','https://i.011st.com/t/300/pd/22/6/3/6/8/8/5/Kexqv/3351636885_L300.jpg'),(13,'JW중외제약 아이사랑 프리미엄 키즈루테인 60포 2개월분 비타민A 16종부원료!','PNPstore',39500,'','https://i.011st.com/t/300/pd/20/4/8/9/6/7/5/IkyTe/3242489675_B.jpg'),(14,'종근당건강 아이팜루테인 3개월 눈영양제 눈건강 루테인','대진이샵',27500,'','https://i.011st.com/t/300/pd/21/3/3/5/7/1/8/jomGA/172335718_B.jpg'),(15,'루테인 오메가3 4종 복합 기능성 6개월분 6박스(180캡슐)','순수식품',32900,'','https://i.011st.com/t/300/pd/22/3/9/5/6/7/0/xqymO/2410395670_L300.jpg'),(16,'[쿠폰가49,900원]뉴트리원 정우성 루테인 지아잔틴 164 AX 3박스(3개월분)','뉴트리원',58350,'','https://i.011st.com/t/300/pd/22/8/7/2/3/7/1/mYjAw/2478872371_L300.jpg'),(17,'뉴트리원 정우성 루테인 지아잔틴 164 2박스(2개월분) 外 눈 건강 비타민 아연','뉴트리원',40100,'','https://i.011st.com/t/300/pd/21/3/4/5/3/6/4/RxnKV/1603345364_L300.jpg'),(18,'GNM자연의품격 눈건강 루테인11 6박스 (6개월분)','GNM자연의품격',27900,'','https://i.011st.com/t/300/pd/21/3/7/0/2/0/5/ebmAA/1536370205_L300.jpg'),(19,'안국 루테인 지아잔틴 플러스 식물성 90캡슐 1개 3개월분','안국건강',36900,'','https://i.011st.com/t/300/dl/22/2/1/5/4/8/3/oxpwW/2479215483_139037608_05.jpg'),(20,'JW중외제약 아이사랑 프리미엄 키즈루테인 2박스 4개월분 비타민A 16종부원료!','PNPstore',67000,'','https://i.011st.com/t/300/pd/20/5/0/3/9/6/7/tPfpB/3242503967_B.jpg'),(21,'[조정석밀크씨슬]GNM자연의품격 밀크씨슬 실리마린 6개월분/루테인/오메가-3/마그네슘 외','GNM자연의품격',29800,'','https://i.011st.com/t/300/pd/20/1/8/1/4/8/8/MXzKZ/1187181488_L300.jpg'),(22,'[대웅제약] 세노메가 알티지오메가3 루테인 비타민D 3박스(3개월)/혈행,눈,뼈건강','대웅제약본사',38500,'','https://i.011st.com/t/300/pd/22/1/8/7/2/4/9/qDGJr/3546187249_L300.jpg'),(23,'대웅생명과학 루테인 지아잔틴 아스타잔틴 알티지 오메가3 3박스 (180캡슐)','퓨어랑',48900,'','https://i.011st.com/t/300/pd/21/0/6/1/0/3/9/QQlov/3618061039_B.jpg'),(24,'안국 눈에좋은 루테인플러스 180캡슐 1개','안국건강',38900,'','https://i.011st.com/t/300/dl/22/2/5/0/3/4/8/OSDKX/1321250348_139037602_05.jpg'),(25,'[톡10%]보뚜 루테인 오메가3 비타민A 30캡슐 2박스(총60캡슐)/4중복합기능성','본사_보뚜슈퍼푸드',14900,'','https://i.011st.com/t/300/pd/22/3/2/4/4/1/5/vjkam/1830324415_L300.jpg'),(26,'메이플트리 캐나다 루테인2.0 (3개월분) 눈영양제','나이스이샵',13900,'','https://i.011st.com/t/300/pd/21/2/7/4/7/8/5/ypJOD/832274785_L300.jpg'),(27,'하립골 마리골드 메리골드 꽃차 직접재배  눈건강 국내산 루테인 선물 세트','하립골',20000,'','https://i.011st.com/t/300/pd/18/0/5/9/1/7/8/DOaAg/1625059178_B.jpg'),(28,'[한미헬스케어] 눈에좋은 루테인 골드 2병 6개월분 눈건강 눈영양제','온푸드★',26900,'','https://i.011st.com/t/300/pd/22/7/9/7/9/5/8/LxaiL/1324797958_L300.jpg'),(29,'[안국건강] 루테인 미니 지아잔틴 플러스 선택','안국건강',24900,'','https://i.011st.com/t/300/dl/22/0/9/6/0/9/3/OKJQo/1521096093_139037606_05.jpg'),(30,'안국 아스타잔틴 미니 60캡슐 1박스 / 2개 구매시 루테인지아잔틴 1개','주_오마이비타',28900,'','https://i.011st.com/t/300/dl/22/3/1/5/4/6/1/jozqe/2052315461_139037581_05.jpg'),(31,'메디타민 원헌드레드 루테인 지아잔틴 아스타잔틴 1개월분 눈건강 눈의피로 개선','슬림플래닛',17500,'','https://i.011st.com/t/300/pd/21/2/8/5/6/5/2/rjpwZ/3421285652_L300.png'),(32,'루테인오메가3 플러스6 30캡슐 1통 1개월분','나이스이샵',4500,'','https://i.011st.com/t/300/pd/19/4/1/0/4/6/3/UrpCE/2498410463_B.jpg'),(33,'안국 루테인 지아잔틴 플러스 식물성 30캡슐 4박스 4개월분','안국건강',44900,'','https://i.011st.com/t/300/dl/22/5/6/0/5/3/8/PYLXK/2708560538_139037607_05.jpg'),(34,'일양약품 누네존 루테인 트리플케어 90캡슐-눈영양제','&hearts;키즈팡팡&hearts;',39000,'','https://i.011st.com/t/300/dl/22/2/5/6/0/5/8/tDsdD/4201256058_139206441_05.jpg'),(35,'일양약품 루테인 스페셜 90캡슐-눈영양제/비타민/아연','&hearts;키즈팡팡&hearts;',29900,'','https://i.011st.com/t/300/dl/22/4/1/4/2/5/0/eVulh/4151414250_139189007_05.jpg'),(36,'일양약품 루테인스페셜 500mgX90캡슐-눈영양제/눈건강비타민','&hearts;키즈팡팡&hearts;',32900,'','https://i.011st.com/t/300/dl/22/8/7/7/6/4/9/XqhNA/4145877649_139188099_05.jpg'),(37,'JW중외제약 프리미엄 파워루테인 베타카로틴 3개월분 리뉴얼신제품','PNPstore',22500,'','https://i.011st.com/t/300/pd/20/1/5/4/9/9/7/ySIFm/2665154997_B.jpg'),(38,'[메가뷰티위크] 한율 어린쑥 수분진정/달빛유자 비타민C세럼/빨간쌀진액스킨','아모레퍼시픽',27000,'','https://i.011st.com/t/300/pd/22/8/1/6/3/2/5/wJWIg/2184816325_L300.jpg'),(39,'순수식품 100포 500달톤 저분자 피쉬 콜라겐 1500MG 비타민C 먹는 어류 콜라겐','순수식품',19900,'','https://i.011st.com/t/300/dl/22/2/9/7/3/7/9/hobKe/2658297379_139189629_05.jpg'),(40,'[고려은단] 비타민C1000 이지+비타민D 12개월분 (6박스, 720정)','GSSHOP',59900,'','https://i.011st.com/t/300/pd/22/5/3/4/8/1/1/NyaSe/4179534811_B.jpg'),(41,'미백 순수22 비타민 앰플 비타민C 세럼 에센스 2세트','인포벨홈쇼핑',99900,'','https://i.011st.com/t/300/pd/21/0/1/2/0/1/4/hLQQL/3559012014_L300.jpg'),(42,'[종근당] 비타민C 1000mg 200정/600정 비타민씨','온푸드★',21900,'','https://i.011st.com/t/300/pd/21/4/7/8/0/3/0/tIBGZ/746478030_L300.jpg'),(43,'[약국정품]고려은단 비타민C 1000 300정 효도선물','인산웰빙스토어',24390,'','https://i.011st.com/t/300/an/9/9/4/4/8/7/1572994487_L300.jpg'),(44,'종근당 비타민C 1000mg 600정 / 비타민씨 200정 400정','이웃사랑팜',24800,'','https://i.011st.com/t/300/pd/20/7/6/3/6/4/1/YLoEE/1032763641_L300.jpg'),(45,'순수식품 메가 비타민C 3000MG 분말 스틱 2박스(200포) 메가도스 비타민씨 100%','순수식품',30900,'','https://i.011st.com/t/300/dl/22/9/1/0/8/9/0/uhPpZ/3042910890_139189941_05.jpg'),(46,'[약국정품+쇼핑백] 고려은단 비타민C 1000 300정','인산웰빙스토어',28590,'','https://i.011st.com/t/300/pd/17/3/2/8/2/1/1/TOuFf/1196328211_L300.jpg'),(47,'고려은단 골드플러스 150정 X 2개 (10개월분)','고려은단헬스케어',57900,'','https://i.011st.com/t/300/pd/21/5/5/2/2/6/7/OZbPq/2059552267_B.jpg'),(48,'일양약품 데일리 비타민C 1000 골드플러스 200포-프리미엄비타C/레모나/비타500','&hearts;키즈팡팡&hearts;',25900,'','https://i.011st.com/t/300/pd/22/5/8/1/7/2/8/swUvm/4059581728_L300.jpg'),(49,'[본사직영] 비타민C 1000 600정/ 고려은단','롯데ON',43900,'','https://i.011st.com/t/300/am/3/0/1/4/9/6/1441301496_B_V27.jpg'),(50,'일동제약 마이니 카카오 비타민 인기 상품 모음전','일동제약공식몰',21000,'','https://i.011st.com/t/300/pd/22/6/4/8/2/5/1/GfALt/3354648251_L300.jpg'),(51,'바이오-씨 비타민C','ranymalll',21000,'','https://i.011st.com/t/300/pd/21/9/9/2/2/1/5/vLABW/4055992215_L300.jpg'),(52,'일양약품 프리미엄 비타C 레몬맛 200포-비타민C','&hearts;키즈팡팡&hearts;',22320,'','https://i.011st.com/t/300/pd/22/8/6/7/2/5/9/MhVOj/3826867259_L300.jpg'),(53,'포플러스/코큐텐 코엔자임큐텐 포플러스 아연/셀렌/비타민D/비타민C 3개월 (1박스)','엘엔비샵',28900,'','https://i.011st.com/t/300/pd/21/9/1/1/4/9/6/xpkPp/2713911496_L300.jpg'),(54,'비타하임 발포 비타민C 레몬맛 120정(20정 x 6통)','헬스인비타',19300,'','https://i.011st.com/t/300/pd/21/3/2/1/4/9/7/Fidxu/175321497_L300.jpg'),(55,'프로폴리스 (6개월분) - 항산화 / 플라보노이드 아연 비타민C 함유 / 캡슐타입','튼튼닷컴',19900,'','https://i.011st.com/t/300/pd/21/0/1/0/6/7/2/zQwbo/1509010672_L300.jpg'),(56,'[휴온스] 메가도스 비타민 메리트 C 산 3000mg 90포 4박스','CJONSTYLE',164600,'','https://i.011st.com/t/300/pd/22/9/3/9/7/6/2/hxNpS/3527939762_B.jpg'),(57,'비타하임 발포비타민 120정 종합 멀티 비타민C 영양제 아연 칼슘 마그네슘','힐링팩토리',18000,'','https://i.011st.com/t/300/pd/20/2/4/0/1/1/2/WukKP/292240112_L300.jpg'),(58,'영국 DSM 비타민C 메가도스 3000mg/3gx60포/분말 비타민C','다소미아',20500,'','https://i.011st.com/t/300/ak/8/8/8/7/7/0/646888770_L300_V3.jpg'),(59,'[경남제약] 카카오 레모나 2g x 70포+쇼핑백','LIVECARE',19900,'','https://i.011st.com/t/300/dl/22/5/6/3/1/5/0/jCJRV/3702563150_139037386_05.jpg'),(60,'영국DSM 파인파우더분말비타민C 100% 500g 면역항산화','HNH365',35900,'','https://i.011st.com/t/300/pd/20/0/3/9/6/4/3/vxZMr/78039643_L300.png'),(61,'B-50/복합비타민 울트라 B-50 플러스C  비타민B 100일분','파마젠몰',18900,'','https://i.011st.com/t/300/pd/21/8/3/2/2/1/9/wpviF/1185832219_L300.jpg'),(62,'영국 DSM 비타민C 500g/포장 용기 선택가능.다소미아','다소미아',30300,'','https://i.011st.com/t/300/pd/20/8/0/1/2/6/0/QrxtZ/66801260_B.jpg'),(63,'RU21 알유21 (6정) 비타민C x 12개 (총72정) 숙취해소제','위즈마마',35900,'','https://i.011st.com/t/300/pd/20/4/5/8/8/5/9/ChviP/3042458859_B.jpg'),(64,'[휴온스] 메가도스 비타민 메리트 C 산 3000mg 90포 1박스','CJONSTYLE',44400,'','https://i.011st.com/t/300/pd/22/9/3/3/5/6/1/vgWxa/3527933561_B.jpg'),(66,'영국 DSM 울트라파인파우더분말비타민C 100% 270g 초미립자항산화비타민가루','HNH365',27000,'','https://i.011st.com/t/300/pd/20/9/1/0/0/9/5/vdess/80910095_L300.png'),(67,'[조아제약] 2박스_톡톡 깔라만시_상큼 달콤함 비타민C','NUTRI365',9900,'','https://i.011st.com/t/300/pd/21/2/8/1/3/1/3/FHhmZ/1552281313_B.jpg'),(68,'영국 DSM사 백색분말비타민C 100% 500g /먹는바르는순수한흰색미립자','HNH365',35900,'','https://i.011st.com/t/300/pd/20/8/2/1/3/3/7/CnQDb/80821337_L300.png'),(69,'비타민C 1000mg 비타민D 1000IU (6개월분) - 1정으로 간편섭취','튼튼닷컴',26900,'','https://i.011st.com/t/300/pd/21/3/3/9/4/3/3/lJMrA/2578339433_L300.jpg'),(71,'[비타민앰플신제품]네클라 비타민c앰플/미백/2중기능성/피부톤개선','네클라본사',19800,'','https://i.011st.com/t/300/pd/22/6/3/8/1/8/5/zslfg/3824638185_B.jpg'),(72,'순수식품 고함량 L-아르기닌 2240mg 2박스(240정X1200mg) 타우린 비티민씨','순수식품',24900,'','https://i.011st.com/t/300/pd/21/3/4/6/0/1/4/aKqcK/3683346014_L300.jpg'),(73,'버퍼드C/버퍼드 비타민/중성비타민C/고함량/CANADA 120일분','파마젠몰',24900,'','https://i.011st.com/t/300/pd/20/7/5/2/4/7/6/dGrPG/1185752476_L300.jpg'),(74,'[경남제약] 레모비타120정 5가지맛 씹어먹는비타민','유한월드',4980,'','https://i.011st.com/t/300/al/4/3/1/4/1/6/351431416_L300_V3.jpg'),(75,'영국산 DSM 울트라파인파우더비타민C 180g 면역항산화','HNH365',19000,'','https://i.011st.com/t/300/pd/20/3/5/1/0/7/2/HspaG/269351072_L300.png'),(76,'파마젠 버퍼드 비타민C 1100 1500mg 120정 1개','엘엔비샵',25000,'','https://i.011st.com/t/300/pd/22/5/4/2/7/3/9/Bthoo/4150542739_B.jpg'),(77,'닥터영 비타민씨 화이트닝 안티링클 비타민앰플 30ml /화장품파우치+여성청결액포함','해피더스킨',55000,'','https://i.011st.com/t/300/pd/21/5/4/8/4/1/3/wtnaU/3935548413_B.jpg'),(78,'순수식품 칼슘 마그네슘 비타민D 아연 6개월분 180정 /MSM 글루코사민','순수식품',20900,'','https://i.011st.com/t/300/pd/22/0/7/0/9/3/2/ECVAa/2828070932_L300.jpg'),(79,'칼슘 마그네슘 아연 비타민D 뼈건강 영양제 3개월분','인테로',13800,'','https://i.011st.com/t/300/pd/22/4/2/5/5/1/5/rUUxQ/2708425515_L300.jpg'),(80,'[총 3개월분] GNM 키즈 어린이 칼슘 마그네슘 아연 비타민D 1병 / 뼈건강','GNM자연의품격',21900,'','https://i.011st.com/t/300/pd/21/1/8/0/9/5/9/NyKdj/3356180959_L300.jpg'),(81,'[한미양행] 로하비 프리미엄 마그네슘 이엑스 4개월분 비타민 B군 영양제 눈떨림','LOHAB',15800,'','https://i.011st.com/t/300/pd/20/7/1/8/2/8/1/PMCyK/1287718281_L300.jpg'),(82,'물에 타먹는 일동후디스 하이뮨 프로틴밸런스 산양유단백질 칼슘 마그네슘 304g 2통','아이셀프',49700,'','https://i.011st.com/t/300/pd/22/4/6/5/9/1/0/YOmdS/3839465910_L300.jpg'),(83,'뉴트리 마그네슘 300 / 아연 미네랄 영양제 보충제 90정','데일리뉴트리션',22000,'','https://i.011st.com/t/300/pd/21/9/9/8/8/1/4/WSDOo/1519998814_L300.jpg'),(84,'비타민마을 맘편한 어린이 칼슘 마그네슘 아연 비타민D 1병 180정 3개월분 어린이영양제','주_비타민마을',12900,'','https://i.011st.com/t/300/pd/22/3/9/2/3/0/0/uhsTH/4290392300_L300.jpg'),(86,'[한미헬스케어] 뼈에좋은 칼슘 마그네슘 아연 비타민D 2병 6개월분 칼슘제','온푸드★',26900,'','https://i.011st.com/t/300/pd/21/9/1/4/8/3/5/odvzs/1473914835_L300.jpg'),(87,'칼슘마그네슘비타민D (6개월분) - 뼈건강 칼슘 마그네슘 영양제 칼슘제','튼튼닷컴',23900,'','https://i.011st.com/t/300/pd/21/4/8/7/0/7/5/upHoW/1223487075_L300.jpg'),(88,'JW중외제약 해조 코랄 칼슘 마그네슘 아연 비타민D 2000IU 2병 (6개월분)','퓨어랑',29900,'','https://i.011st.com/t/300/pd/20/2/4/0/4/0/7/ROAVu/3156240407_B.jpg'),(89,'마그네슘 비타민 2통 200일분 영양제 보충제 눈떨림','e사랑마을',29900,'','https://i.011st.com/t/300/pd/21/4/3/1/5/3/0/KbwKA/638431530_L300.jpg'),(90,'뉴트리 미국 칼슘 500 비타민D / 마그네슘 칼슘제 영양제','데일리뉴트리션',28000,'','https://i.011st.com/t/300/pd/21/7/5/2/6/8/9/eMWFA/1025752689_L300.jpg'),(93,'브리오 해조칼슘 마그네슘 망간 비타민D / 임산부 어린이 천연 원료 칼슘제 종합 영양제','브리오',29000,'','https://i.011st.com/t/300/pd/21/6/2/7/0/7/1/VOZnH/1976627071_L300.jpg'),(94,'오늘은 휴 / 테아닌 마그네슘 / 편안한밤 스트레스 긴장완화 [60정/1개월분]','CMG건강연구소',29900,'','https://i.011st.com/t/300/pd/21/4/4/8/8/5/0/qKlzG/3308448850_L300.jpg'),(95,'헬스프랜드 캐나다 마그네슘 앤 비타민B6 6개월분 눈떨림 영양제 보충제','헬스프랜드',19900,'','https://i.011st.com/t/300/pd/21/4/3/1/5/8/6/QHDpF/432431586_B.jpg'),(96,'캐나다 코랄칼슘/6개월분/아연/마그네슘/망간/비타민D/산호칼슘/글루코사민/상어연골/내추럴영','내추럴홀딩스코리아',34800,'','https://i.011st.com/t/300/pd/21/2/2/0/8/9/6/ysZzD/2365220896_L300.jpg'),(97,'종근당 칼슘 마그네슘 비타민D 아연 180정 칼마디 뼈건강','주식회사소유',12900,'','https://i.011st.com/t/300/pd/22/9/9/3/1/6/2/tdRvT/2005993162_L300.jpg'),(98,'뉴트리 아연 50 / 마그네슘 미네랄 영양제 보충제 칼슘 칼슘제','데일리뉴트리션',22000,'','https://i.011st.com/t/300/pd/17/9/4/6/2/1/4/48946214_B_V4.jpg'),(99,'헬스프랜드 캐나다 칼슘 마그네슘 비타민D 아연 6개월분 칼슘제 영양제','헬스프랜드',18900,'','https://i.011st.com/t/300/dl/20/7/6/7/4/7/5/mupxO/435767475_133298060_05.jpg'),(100,'울트라 마그네슘 영양제 400mg x 175캡슐 건강식품','행복꿈',25000,'','https://i.011st.com/t/300/pd/20/5/9/2/9/7/3/ViMDF/2642592973_B.jpg'),(101,'메이플트리 캐나다 칼슘마그네슘아연+비타민D 90정 3개월분','나이스이샵',14900,'','https://i.011st.com/t/300/pd/21/2/7/6/0/8/9/kEKly/1293276089_L300.jpg'),(102,'[한미헬스케어] 메가파워 마그네슘315 2병 6개월분 영양제 눈떨림','온푸드★',26900,'','https://i.011st.com/t/300/pd/21/8/7/3/9/4/0/nWBmB/1199873940_L300.jpg'),(103,'[쿠폰가39,940원]뉴트리원 정우성 어골칼슘+마그네슘+비타민D 3박스(3개월분)','뉴트리원',50160,'','https://i.011st.com/t/300/pd/22/1/0/3/3/0/6/AGMlO/2883103306_L300.jpg'),(104,'액티브 마그네슘 비타민B 비타민D 30정 5개','주_오마이비타',17900,'','https://i.011st.com/t/300/pd/22/4/0/5/8/2/7/ImBcc/2111405827_B.jpg'),(105,'종근당건강 칼슘 마그네슘 비타민D 망간 6개월분 칼슘제 4중기능성 칼슘마그네슘','대진이샵',27500,'','https://i.011st.com/t/300/pd/20/3/7/9/5/0/5/zaabu/93379505_B.jpg'),(106,'마그네슘 비타민 100일분 영양제 보충제 눈떨림 마그내슘','e사랑마을',16000,'','https://i.011st.com/t/300/pd/21/4/3/5/0/0/0/NLJVD/196435000_L300.jpg'),(107,'온푸드 리얼 칼슘 마그네슘 아연 비타민D 1병 3개월분 뼈건강','온푸드★',14900,'','https://i.011st.com/t/300/pd/21/9/5/6/8/5/2/OZiZP/1260956852_L300.jpg'),(108,'1 + 1 데일리베스트 맥스칼/총 4개월분/칼슘/마그네슘/망간/비타민D','헬스인비타',39900,'','https://i.011st.com/t/300/dl/22/6/0/8/2/3/9/ubFBI/1466608239_138691913_05.jpg'),(109,'내츄럴플러스 코랄 칼슘 앤 마그네슘 2:1 플러스 120정','주식회사소유',15900,'','https://i.011st.com/t/300/pd/21/8/3/2/7/0/6/iaaDy/210832706_L300.jpg'),(111,'Canada 캐나다정품 통라이프-하이칼슘+마그네슘+아연+비타민D-3개월분-남성칼슘-1병','통라이프푸드',16900,'','https://i.011st.com/t/300/pd/21/9/0/6/6/9/9/mcamH/1858906699_L300.jpg'),(112,'칼슘 마그네슘 아연 비타민D 2병 180정 + 와이즈 멀티비타민 미네랄 1병','주_비타민마을',16900,'','https://i.011st.com/t/300/pd/22/2/0/5/3/4/8/PIfvh/3967205348_L300.jpg'),(113,'릴렉스피드 테아닌 홍경천 마그네슘 스트레스 피로회복제 개선제 영양제','바른영양연구소',89000,'','https://i.011st.com/t/300/pd/20/0/2/6/6/9/0/UuIaw/3232026690_L300.jpg'),(114,'[온푸드] 리얼 메가 마그네슘350 1병 6개월분 영양제 보충제','온푸드★',24900,'','https://i.011st.com/t/300/pd/21/3/2/7/9/0/2/OxDaI/2249327902_L300.jpg'),(115,'보령 칼슘 마그네슘 아연 비타민D 2병 (6개월분)','퓨어랑',23900,'','https://i.011st.com/t/300/pd/19/0/9/7/4/4/5/NDMGU/2217097445_B.jpg'),(116,'캐나다 직수입 비타민B 콤플렉스 위드 씨 3개월분/비타민/마그네슘/루테인/오메가3/밀크씨슬','우리가스토리',12900,'','https://i.011st.com/t/300/pd/19/3/2/9/9/1/6/NhbgU/2602329916_L300.jpg'),(117,'Bluebonnet 블루보넷 킬레이트 마그네슘 베지캡슐 120정 2팩','직구의신_ZICGOOGOD',54900,'','https://i.011st.com/t/300/pd/22/3/1/3/7/0/5/WeyjG/4264313705_B.jpg'),(119,'캐나다 직수입 8중복합 프리미엄 밀크씨슬 컴플렉스/루테인/오메가3/마그네슘/아연구리','우리가스토리',9900,'','https://i.011st.com/t/300/pd/18/5/4/9/3/3/6/nvrHC/2213549336_L300.jpg'),(123,'애니멀퍼레이드 4종 골라담기, 종합비타민, 아연, 칼슘, 비타민D 어린이 유아 키즈 영양제','뉴트리션라이프',27720,'','https://i.011st.com/t/300/pd/20/0/1/8/0/8/8/hPcEE/1876018088_B.jpg'),(130,'뉴스킨 파마넥스 본 포뮬러 120캡슐 1병 1개월분','휴먼라이프',39800,'','https://i.011st.com/t/300/pd/21/4/3/7/6/9/5/dJTfx/3578437695_L300.jpg'),(133,'덴티큐 2통 4개월 칼슘제 부모님 치아건강 영양제 칼슘 보충제 선물','e사랑마을',30000,'','https://i.011st.com/t/300/pd/21/4/6/6/7/4/9/msFdV/1456466749_L300.jpg'),(135,'좋은습관 콘드로이친 분말 가루 효능 상어연골칼슘 1200 콘드로이틴','더건강하게좋은습관',17000,'','https://i.011st.com/t/300/pd/21/2/3/2/5/8/9/fqRTY/3982232589_B.jpg'),(137,'종근당 칼슘 마그네슘 비타민D 아연 180정 칼마디 뼈건강','주식회사소유',12900,'','https://i.011st.com/t/300/pd/22/9/9/3/1/6/2/tdRvT/2005993162_L300.jpg'),(140,'온푸드 대용량 칼슘/밀크씨슬/루테인/비타민 외 필수영양제 모음','온푸드★',14900,'','https://i.011st.com/t/300/pd/22/8/1/8/4/7/1/dGYbN/1162818471_L300.jpg'),(142,'[종근당건강]헤모론철분 2개월 프리미엄 헴철 해조칼슘 철분제 수유 임산부 대진이샵','대진이샵',21000,'','https://i.011st.com/t/300/pd/20/9/0/8/7/0/2/mrnJr/29908702_B.jpg'),(143,'일양약품 잇큐 750mgX240정(4개월분)-치아와 뼈건강','&hearts;키즈팡팡&hearts;',25000,'','https://i.011st.com/t/300/pd/22/5/8/0/8/7/4/OtrMW/4070580874_L300.jpg'),(145,'상토/배양토모음 계분 퇴비 비료 분갈이흙 마사토 다육이 흙 유기질 고추 칼슘 영양제','영농사',9500,'','https://i.011st.com/t/300/pd/21/7/9/9/7/9/2/oLEfR/232799792_B.jpg'),(146,'총2병 미국 프라보텐큐 1355mgx60정 프로폴리스 치아 건강 잇몸 리소짐 칼슘 비타민D','대진이샵',38600,'','https://i.011st.com/t/300/pd/20/7/5/0/9/9/5/rfWkE/46750995_B.jpg'),(147,'본메이트 칼슘 & 비타민 D','ranymalll',25410,'','https://i.011st.com/t/300/pd/21/1/0/2/2/5/8/eQVkZ/3580102258_L300.jpg'),(148,'[한미] 웰키커 어린이 영양제 베스트셀러 모음전 (비타민/칼슘/유산균/아연/철분)','닥터포이',10900,'','https://i.011st.com/t/300/pd/22/8/4/0/0/4/9/upWZC/3165840049_L300.jpg'),(149,'GNM 인도산 보스웰리아 정제 60정 x 2병 (총 120정) / 해조칼슘, 초록입홍합','GNM자연의품격',19800,'','https://i.011st.com/t/300/pd/22/5/6/9/2/2/8/savGB/3042569228_L300.jpg'),(150,'키즈플러스칼슘골드 360정x4Box 어린이 청소년 성장발육도움','디디디몰',166000,'','https://i.011st.com/t/300/pd/20/0/3/0/2/7/3/TDAwa/2030273_L300.jpg'),(151,'일양약품 헬스뱅 산양 초유 고칼슘 프로틴 1통-단백질보충제','&hearts;키즈팡팡&hearts;',25900,'','https://i.011st.com/t/300/pd/21/5/9/2/4/9/6/DiYBx/3847592496_L300.jpg'),(153,'어골 칼슘 뉴질랜드산 생선뼈 어류칼슘 뼈 관절 건강 영양제 분말 가루 캡슐 60정','오진샵',56000,'','https://i.011st.com/t/300/pd/21/6/0/4/4/8/4/OqOoS/3205604484_L300.jpg'),(154,'덴티큐 2개월 칼슘제 부모님 치아 건강 영양제','e사랑마을',16000,'','https://i.011st.com/t/300/pd/21/8/4/2/2/3/6/IcjVu/1565842236_L300.jpg'),(158,'이큐파워 240캡슐 (4개월) / 뼈건강 치아건강','블루마미',29200,'','https://i.011st.com/t/300/pd/20/0/7/0/8/1/8/wPqwG/1268070818_B.jpg'),(159,'내츄럴플러스 상어연골 칼슘 180캡슐 3개월분 어골 뼈건강','주식회사소유',19900,'','https://i.011st.com/t/300/pd/21/6/6/6/2/2/3/KMwvE/3179666223_L300.jpg'),(161,'코엔자임Q10 영양제 코큐텐 코엔자임큐텐 항산화 2개월분','인테로',17800,'','https://i.011st.com/t/300/pd/22/4/3/6/0/6/7/XowrI/2708436067_L300.jpg'),(162,'[한미양행] 로하비 프리미엄 코엔자임Q10 이엑스 4개월분 코큐텐 항산화','LOHAB',29800,'','https://i.011st.com/t/300/pd/18/1/5/6/0/6/5/NPAZc/1091156065_L300.jpg'),(163,'헬스프랜드 캐나다 코엔자임Q10 코큐텐 6개월분 코엔자임큐텐 항산화 영양제','헬스프랜드',43900,'','https://i.011st.com/t/300/pd/21/6/9/8/2/1/2/HgSps/4022698212_B.jpg'),(164,'[대웅제약] 오메가3 코엔자임Q10 세노메가 큐텐 3박스(3개월분)/혈행+혈압 동시케어','대웅제약본사',42750,'','https://i.011st.com/t/300/pd/22/5/3/8/4/2/0/uqbKs/3084538420_L300.jpg'),(165,'[JW중외제약] 플러스 코엔자임Q10 6박스 6개월분 코큐텐','온푸드★',89400,'','https://i.011st.com/t/300/pd/21/9/9/0/7/0/5/AvZPh/340990705_L300.jpg'),(166,'코엔자임 큐텐 2통 6개월 코큐10 코큐텐 영양제 보충제','e사랑마을',59900,'','https://i.011st.com/t/300/product/1269050685/L300.jpg?468000000'),(167,'마미앤대디 프리미엄 코엔자임Q10 코큐텐 식물성캡슐 350mg x 30캡슐 1박스','마미앤대디',19900,'','https://i.011st.com/t/300/pd/22/3/5/7/6/2/9/wbYHq/2452357629_L300.jpg'),(169,'코엔자임 Q10 (6개월분) - 항산화 / 높은 혈압 감소에 도움을 줄 수 있는 영양제','튼튼닷컴',46900,'','https://i.011st.com/t/300/pd/21/6/9/4/2/8/6/hECSf/1489694286_L300.jpg'),(170,'코엔자임 큐텐 3개월분 코큐10 코Q10  코큐텐 비타민 영양제','e사랑마을',31900,'','https://i.011st.com/t/300/pd/17/4/4/7/4/9/4/fJGHd/1326447494_L300.jpg'),(171,'나우푸드 루테인/마카/아르기닌/실리마린/코엔자임Q10','프리미엄USA',14500,'','https://i.011st.com/t/300/pd/17/9/2/2/1/0/6/QIIMd/1851922106_L300.jpg'),(172,'온푸드 리얼 솔루션 코엔자임Q10 1병 3개월분 코큐텐','온푸드★',27900,'','https://i.011st.com/t/300/pd/21/1/6/7/6/0/8/ggQxX/1174167608_L300.jpg'),(173,'포플러스/코큐텐 코엔자임큐텐 포플러스 아연/셀렌/비타민D/비타민C 3개월 (3박스)','엘엔비샵',79900,'','https://i.011st.com/t/300/pd/21/1/3/5/0/6/3/dzYlJ/2721135063_L300.jpg'),(174,'포플러스/코큐텐 코엔자임큐텐 포플러스 아연/셀렌/비타민D/비타민C 3개월 (2박스)','엘엔비샵',54900,'','https://i.011st.com/t/300/pd/21/1/3/2/0/7/3/tRFBQ/2721132073_L300.jpg'),(175,'코큐텐/코엔자임Q10 100mg/혈압/혈행 60일분','파마젠몰',24900,'','https://i.011st.com/t/300/pd/21/8/1/6/9/4/3/vzYkB/1185816943_L300.jpg'),(176,'[한미헬스케어] 프리미엄 코엔자임Q10 2병 6개월분 코큐텐 코엔자임큐텐','온푸드★',48900,'','https://i.011st.com/t/300/pd/21/1/4/8/9/8/1/GmRZY/1596148981_L300.jpg'),(177,'코엔자임 큐텐','ranymalll',23000,'','https://i.011st.com/t/300/pd/22/0/5/2/8/5/9/QzDsk/4174052859_L300.png'),(178,'[GNM자연의품격] 코엔자임Q10 코큐텐 오메가3 3박스(3개월) / 오메가-3','GNM자연의품격',37900,'','https://i.011st.com/t/300/pd/21/0/3/0/9/7/0/Qquck/2037030970_L300.jpg'),(179,'11종복합기능성 코엔자임Q10 코큐텐 11 맥스 2병 + 와이즈 멀티비타민 미네랄 1병','주_비타민마을',45900,'','https://i.011st.com/t/300/pd/22/8/6/3/7/3/8/tZPJM/4122863738_L300.jpg'),(180,'뉴트리 캐나다 코큐텐 코엔자임 큐텐 Q10 영양제','데일리뉴트리션',29900,'','https://i.011st.com/t/300/pd/21/8/8/4/3/4/0/ukwMk/1890884340_L300.jpg'),(181,'포플러스/엘엔비 코큐텐 코엔자임큐텐 포플러스 (2개)','파마젠몰',37600,'','https://i.011st.com/t/300/pd/21/1/4/6/9/7/6/QDstb/3901146976_L300.jpg'),(182,'포플러스/엘엔비 코큐텐 코엔자임큐텐 포플러스','파마젠몰',19800,'','https://i.011st.com/t/300/pd/21/6/6/9/9/0/3/LTPTO/2990669903_L300.jpg'),(183,'해외솔가폴리코사놀/에스터C/오메가/유산균/코엔자임','프리미엄USA',14900,'','https://i.011st.com/t/300/pd/17/9/4/8/6/7/5/RuCgB/1839948675_L300.jpg'),(184,'2병 My Life 마이라이프 코큐텐 코엔자임 200mg 120야채캡슐','오가닉USA',66900,'','https://i.011st.com/t/300/pd/22/3/7/0/1/2/7/hVWaY/1865370127_B.jpg'),(185,'2병 My Life 마이라이프 코큐텐 코엔자임 100mg 120 야채캡슐','오가닉USA',39900,'','https://i.011st.com/t/300/pd/22/1/7/9/1/5/3/JHLpB/1860179153_B.jpg'),(186,'[GNM자연의품격]코엔자임Q10 코큐텐 11 6박스 선물세트(총 6개월분)','롯데아이몰',53900,'','https://i.011st.com/t/300/pd/22/5/9/0/6/0/5/QJxse/2210590605_B.jpg'),(187,'세노비스 코엔자임 큐텐 600mg x 60캡슐','나르샤몰',25980,'','https://i.011st.com/t/300/pd/21/2/5/8/3/6/8/Cqoje/3865258368_B.jpg'),(188,'GNM 코엔자임Q10 11 4박스(총 4개월분) 코큐텐/코엔자임큐텐 / 선물세트','GNM자연의품격',38900,'','https://i.011st.com/t/300/pd/21/3/2/1/6/7/7/zpiGg/1536321677_L300.jpg'),(189,'인테로 코엔자임Q10 2개월분 X 3','11초이스',39200,'','https://i.011st.com/t/300/pd/22/1/3/7/9/2/3/LfSFk/3884137923_B.jpg'),(190,'GNM자연의품격 코엔자임Q10 코큐텐11 500mg x 30캡슐 x 1박스','멸치쇼핑',8330,'','https://i.011st.com/t/300/pd/22/6/9/2/1/7/7/tesHj/4049692177_B.jpg'),(191,'코엔자임큐텐 코큐텐 약2개월 높은 혈압감소 도움 코엔자임q10 항산화에좋은 coq10','비비킹공식몰',17800,'','https://i.011st.com/t/300/dl/22/1/2/6/9/5/9/lLuiu/3835126959_139305657_05.jpg'),(192,'유니시티 코엔자임 큐텐 Q10 300mg 60캡슐 1개','아네마음',24900,'','https://i.011st.com/t/300/pd/20/7/8/9/1/6/7/ubzti/2699789167_B.png'),(193,'[세노비스] 코엔자임 큐텐(비타민C+셀렌) 60캡슐/60일분','세노비스공식판매처',33200,'','https://i.011st.com/t/300/pd/21/7/8/5/7/4/0/xOKuI/169785740_L300.jpg'),(194,'종근당건강 코큐텐 플러스 500mg  60캡슐 코엔자임','팜빌리지스토어',23300,'','https://i.011st.com/t/300/product/2563773728/L300.jpg?899000000'),(195,'녹차/코엔자임 필링젤/각질/피지/블랙헤드/스크럽','시드물',4800,'','https://i.011st.com/t/300/pd/22/2/6/5/7/9/1/srpxR/24265791_L300.jpg'),(196,'세노비스 코엔자임 큐텐600mg x 60캡슐 텐 어른영양제','수스토어',65520,'','https://i.011st.com/t/300/pd/22/9/5/8/4/7/8/qnYQJ/4299958478_L300.jpg'),(197,'템테이션 셀 코엔자임 Q10 트윈케익 21호 베어베이지 투웨이 화장팩 커버','두바이2',22230,'','https://i.011st.com/t/300/pd/22/1/0/1/9/9/7/jAGXD/4298101997_L300.jpg'),(198,'한국화장품 템테이션 셀 코엔자임 Q10 3종 세트 여성 엔Q10크림 엔Q10로션 3','신나는쇼핑',54370,'','https://i.011st.com/t/300/pd/22/7/0/4/6/2/6/sgoJP/4297704626_L300.jpg'),(199,'네츄럴라이즈 코엔자임10 큐10 60캡슐(2개월분)/코큐','뉴웰빙건강몰',35000,'','https://i.011st.com/t/300/product/887689398/L300.jpg?534000000'),(200,'[실속]써큐시안 블러드케어(콜레스테롤 혈행 혈압) 오메가3+코엔자임Q10+홍국 3개월','파이토웨이',159000,'','https://i.011st.com/t/300/pd/21/9/8/9/7/4/7/vVGAM/3904989747_L300.png'),(201,'메디트리 코큐텐11 코엔자임Q10 5박스(5개월분)','웰빙플래너',39800,'','https://i.011st.com/t/300/pd/21/7/0/8/2/0/2/QNhxp/2007708202_B.jpg'),(202,'템테이션 셀 코엔자임 Q10 스킨커버 23호리얼베이지 엔Q10 팩트 팩 메이','주식회사제이야드',22850,'','https://i.011st.com/t/300/pd/22/2/4/0/0/0/1/lpKtW/4301240001_L300.jpg'),(203,'코엔자임 Q10 밸런스 500mg 2개','브랜드여행가방',36000,'','https://i.011st.com/t/300/pd/22/4/0/4/5/3/5/mlzEo/4299404535_L300.jpg'),(204,'유한m 코엔자임 큐텐골드 120캅셀 유한메디타 코큐텐','헬퍼스',100000,'','https://i.011st.com/t/300/product/2036470874/L300.jpg?558000000'),(206,'오메가3/코엔자임Q10/맨즈파워 쏘팔메토 등 건강식품','11초이스',39900,'','https://i.011st.com/t/300/pd/22/1/1/7/6/7/1/Muqhk/3902117671_B.jpg'),(253,'[15%+10%+T11%]프로메가 알티지 오메가3 3박스 외 / 종근당건강 rTG오메가3','종근당건강본사직영',59900,'','http://i.011st.com/t/300/pd/22/9/6/2/2/3/2/SkOTY/2624962232_L300.jpg'),(254,'비타민마을 rTG 알티지 오메가3 트루 4박스 8개월분 + 상어간유 1박스','주_비타민마을',39900,'','http://i.011st.com/t/300/pd/22/1/0/9/0/3/7/SRgxE/3621109037_L300.jpg'),(255,'알티지 오메가3 RTG 엔초비 2개 [3개월+3개월] 장용성 식물성 오메가','인테로',38800,'','http://i.011st.com/t/300/pd/22/4/0/9/0/9/5/zWsVE/2925409095_L300.jpg'),(256,'[조정석 오메가3] GNM rTG 알티지오메가3 비타민E 식물성캡슐 2박스(총 2개월분)','GNM자연의품격',26900,'','http://i.011st.com/t/300/pd/21/5/0/8/0/3/2/JYvet/1981508032_L300.jpg'),(257,'rTG 오메가3/장용성/알티지오메가3 180캡슐/데일리베스트','헬스인비타',39900,'','http://i.011st.com/t/300/pd/22/5/2/2/3/7/4/KwVVg/153522374_L300.jpg'),(258,'유니시티 오메가 라이프 -3 리졸브 DHA/EPA 최신상품','ranymalll',29000,'','http://i.011st.com/t/300/pd/20/3/5/8/4/9/4/cNAZq/2873358494_B.jpg'),(259,'캐나다 6개월분 알티지오메가3 1200 비타민D rTG 오메가3 콜레스테롤','내추럴홀딩스코리아',44800,'','http://i.011st.com/t/300/pd/20/9/9/2/8/5/6/dusUB/3208992856_L300.jpg'),(260,'오메가/rTG 알티지 오메가3 EPA+DHA1200 캐나다산 180일분 (2박스)','파마젠몰',64500,'','http://i.011st.com/t/300/pd/22/5/8/9/0/4/7/DZjAJ/2162589047_L300.jpg'),(261,'인테로 오메가3 밸런스 1200 (6개월분) 혈행관리 기억력개선','PURESTELLA',20800,'','http://i.011st.com/t/300/pd/22/5/6/1/4/8/9/jTMrY/4141561489_L300.png'),(262,'파마젠 rTG 알티지 오메가3 1300 비타민E 초임계저온추출 엔쵸비 6개월','엘엔비샵',33100,'','http://i.011st.com/t/300/pd/22/4/8/1/3/2/7/nfbBr/3642481327_L300.jpg'),(263,'브리오 초임계 알티지 오메가3 맥스 / 식물성 캡슐 퓨어 RTG 오메가-3 영양제','브리오',39000,'','http://i.011st.com/t/300/pd/22/6/3/8/4/8/9/hBEvI/12638489_L300.jpg'),(264,'[50프로 세일] 팔레오 노르웨이 알티지 오메가3 12개월분','W쇼핑_TV홈쇼핑',99000,'','http://i.011st.com/t/300/pd/22/9/2/8/9/7/7/LAYWG/4177928977_B.jpg'),(265,'파미스 플래티넘 오메가3 1300 / 비타민D 1000IU 함유','약사랑',24700,'','http://i.011st.com/t/300/al/3/8/7/9/3/5/186387935_L300_V13.jpg'),(266,'펄세스 크릴56 3개월 펄세스 크릴오일 본사직영 +  크릴미니 2개증정','펄세스온라인공식몰',84800,'','http://i.011st.com/t/300/pd/21/7/4/2/9/7/4/vuaGh/2335742974_L300.jpg'),(267,'종근당건강 프로메가 알티지오메가3 듀얼 6박스 (6개월분)','누리인터내셔날',91500,'','http://i.011st.com/t/300/pd/20/7/5/4/5/9/3/MvLYq/2714754593_L300.jpg'),(268,'미국산 알티지 rTG 오메가3 6개월 고함량 오메가-3 omega3 영양제','e사랑마을',55000,'','http://i.011st.com/t/300/product/196433122/L300.jpg?557000000'),(269,'헬스프랜드 미국 프리미엄 rTG 알티지 오메가3 1200 6개월분 비타민D 비타민E 함유','헬스프랜드',33900,'','http://i.011st.com/t/300/pd/22/8/2/2/6/0/5/QysRm/434822605_L300.jpg'),(270,'밸리스 고양이스틱 간식 치카 만능 오메가3, 락토페린 국산 고양이 간식 대용량 파우치','밸리스',20000,'','http://i.011st.com/t/300/pd/21/9/5/5/7/6/9/ZRHaV/2572955769_L300.jpg'),(271,'뉴스킨 파마넥스 마린오메가 120캡슐 1병 1개월분','휴먼라이프',44900,'','http://i.011st.com/t/300/pd/21/7/7/1/5/4/4/nMHGO/3570771544_L300.jpg'),(272,'파마젠 rTG 알티지 오메가3 1300 비타민E 초임계저온추출 엔쵸비 6개월 x (2개)','엘엔비샵',65000,'','http://i.011st.com/t/300/pd/22/0/2/7/0/2/5/XBRXg/4247027025_L300.jpg'),(273,'식물성 오메가3 아마씨유 플랙시드오일 저온압착 캐나다산 3개월분','인테로',11800,'','http://i.011st.com/t/300/pd/22/6/4/2/3/0/0/KvDCf/2709642300_L300.jpg'),(274,'캐나다 MEG-3 오메가365맥스 프리미엄 캐나다산 오메가3','바이오인트로',32800,'','http://i.011st.com/t/300/pd/20/9/2/2/7/9/1/tLRyo/197922791_L300.jpg'),(275,'캐나다 트루웰 플래티넘 오메가3 1300','약사랑',25000,'','http://i.011st.com/t/300/pd/16/7/5/3/3/8/6/OvPNA/50753386_L300.jpg'),(276,'온푸드 캐나다 초임계 알티지 rTG 엔초비 오메가3 비타민D 오메가3 모음전','온푸드★',27900,'','http://i.011st.com/t/300/pd/22/6/8/7/0/8/6/utKBB/78687086_L300.jpg'),(277,'3+1 좋은습관 캐나다 남극 크릴오일 인지질 56% 1300mg','더건강하게좋은습관',59000,'','http://i.011st.com/t/300/pd/21/2/4/7/7/3/5/yGNhm/2917247735_L300.jpg'),(278,'한미 프리미엄 알티지오메가3 60캡슐 X 2박스','주식회사씨앤에스헬스케어',30000,'','http://i.011st.com/t/300/pd/21/8/4/0/0/8/3/gcCoU/3700840083_B.jpg'),(279,'JW중외제약 초임계 rTG 알티지 오메가3 맥스 2000 1병 (60캡슐)','퓨어랑',34900,'','http://i.011st.com/t/300/pd/20/1/4/8/6/6/6/UsZEg/3156148666_B.jpg'),(280,'대웅생명과학 루테인 지아잔틴 아스타잔틴 알티지 오메가3 3박스 (180캡슐)','퓨어랑',48900,'','http://i.011st.com/t/300/pd/21/0/6/1/0/3/9/QQlov/3618061039_B.jpg'),(282,'데일리베스트 rTG 알티지 오메가3 6개월분 혈행개선 영양제','e사랑마을',40000,'','http://i.011st.com/t/300/pd/20/4/9/8/0/7/6/TPekC/2428498076_L300.jpg'),(283,'인테로 알티지 RTG 오메가3 (3개월분 x 2개) 총6개월분 엔초비 혈행개선 기억력개선','PURESTELLA',39900,'','http://i.011st.com/t/300/pd/22/8/0/3/9/8/6/PreMT/4161803986_L300.png'),(284,'오메가3 ADE (6개월분) - 혈중 중성지질 개선 / 혈행 개선 등','튼튼닷컴',24800,'','http://i.011st.com/t/300/pd/21/8/0/5/9/3/8/wVete/1042805938_L300.jpg'),(285,'대웅생명과학 루테인 지아잔틴 오메가3 3박스 (90캡슐)','퓨어랑',26900,'','http://i.011st.com/t/300/pd/21/8/3/7/5/2/4/dUGtE/3851837524_B.jpg'),(286,'트루웰 캐나다 프리미어 오메가3 1300','약사랑',27000,'','http://i.011st.com/t/300/pd/18/5/1/3/7/6/3/ppGYj/2090513763_B.jpg'),(287,'알티지(rTG) 오메가3 (6개월분) - 혈중 중성지질 개선 / 혈행 개선 등','튼튼닷컴',29900,'','http://i.011st.com/t/300/pd/21/2/7/1/5/0/4/fCTyF/3780271504_L300.jpg'),(288,'고함량 rTG 알티지 오메가3 6개월분 EPA DHA 혈행개선 영양제','e사랑마을',55000,'','http://i.011st.com/t/300/product/1391624751/L300.jpg?557000000');
/*!40000 ALTER TABLE `products_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_review`
--

DROP TABLE IF EXISTS `products_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` smallint unsigned NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_review_product_id_d933ffa7_fk_products_product_id` (`product_id`),
  KEY `products_review_user_id_2e53b831_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `products_review_product_id_d933ffa7_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `products_review_user_id_2e53b831_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `products_review_chk_1` CHECK ((`rating` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_review`
--

LOCK TABLES `products_review` WRITE;
/*!40000 ALTER TABLE `products_review` DISABLE KEYS */;
INSERT INTO `products_review` VALUES (1,'2022-04-01 13:48:49.620120','2022-04-07 22:59:06.005429','사은품인지 낱개로 6개 더 줘서 좋네요 귀여워요 ㅎ',5,1,1),(2,'2022-03-01 13:48:49.620120','2022-04-08 02:14:49.995854','윤아처럼 피부가 탱탱해지고 싶어서 구매했는데\n한달동안 먹어보니 생각보다 괜찮은 것 같아요\n구독한 2개월치까지 더 먹어봐야 알 것 같아요 !',4,1,2),(3,'2022-03-02 13:48:49.620120','2022-03-02 13:48:49.620120','먹기편하게 포장되어있어서 편리합니다.요즘 콜라겐 꼭 챙겨먹잖아요.이제품이 가장 무난한거같아요',4,1,5),(4,'2022-03-03 13:48:49.620120','2022-03-03 13:48:49.620120','예전에 먹었건 건데 이번에 세일하길래 재구매했어요~요즘 피부가 더 푸석하고 예민한데 먹고 조금이나마 효과가 있었으면 좋겠네요..',5,1,1),(5,'2022-03-04 13:48:49.620120','2022-03-04 13:48:49.620120','늘 먹던 비오틴콜라겐 샀는데 핑크색 콜라겐도 서비스 있네요ㅋ비오틴콜라겐 맛있고 잘 넘어가요.',5,1,5),(6,'2022-03-04 13:48:49.620120','2022-03-04 13:48:49.620120','초록색통이 뭐가 더 들어가서 조금이라도 좋겠지싶어 돈더주고 이걸로먹고있어요. ',4,1,6),(7,'2022-03-04 13:48:49.620120','2022-03-04 13:48:49.620120','행사할때 저렴하게 잘샀어요.. 아직 먹는중이라 잘 모르겠지만, 피부에는 좋을꺼라 믿어요.. ',4,1,7),(8,'2022-04-05 07:15:44.935331','2022-04-05 07:15:44.935331','좋아요.',5,1,5),(9,'2022-04-05 07:34:36.844321','2022-04-05 07:34:36.844321','좋아요.',5,2,5),(10,'2022-04-05 07:34:48.603936','2022-04-05 07:34:48.603936','먹을만합니다.',4,3,5),(11,'2022-04-05 07:42:52.586801','2022-04-05 07:42:52.586801','오래 먹었는데 딱히 뭐가 좋아지는지 잘 모르겠어요.',2,5,5),(12,'2022-03-06 13:48:49.620120','2022-03-06 13:48:49.620120','효과는 모르겠고 배송느리고 타쇼핑몰에서 더 저렴하게 판매하고 있어서 속은 기분이네요.',1,1,8),(13,'2022-03-07 13:48:49.620120','2022-03-07 13:48:49.620120','광고성으로 주문했는데...가루가 입안에 뭉치면서 달라붙는게 별로 맛도 시큼 향도 별로네요',2,1,7),(14,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','상품은 잘왔어요 장기복용 하려구 했는데 화학적 첨가물이 들어 있어서 이 번만 먹을려구요 확인을 안하구 산 제 잘못이라 반품은 안합니다',2,1,2),(15,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','믿고 먹는 저분자 콜라겐 잠자기전에 먹어라고 하네요.',3,1,8),(16,'2022-03-15 13:48:49.620120','2022-03-15 13:48:49.620120','석류캔디맛이네요. 새콤달콤. 그냥먹었는데도 맛있어요. 상큼한 과일캔디맛이네요. 콜라겐섭취안됫는데. 잘먹을께요 추천해요',3,1,5),(17,'2022-03-17 13:48:49.620120','2022-03-17 13:48:49.620120','맛은 약간 달달~ 할인 받아서 저렴하게 잘 샀어오! 첨 먹어보는데 잘 챙겨먹겠습니당! 그리고 또 살게요',4,1,6),(18,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','다른 콜라겐 쭉 먹다가 요즘 광고도 많이 나오길레 처음 구입해봤어요 포장도 맘에들고 사은품까지 있어 좋네요 유통기한 본품 24년까지 아주 길구요 맛도 좋네요 단시간에 효과를 보진 못하겠지만 3개월 열씸 먹어볼께요~~',5,1,8),(19,'2022-04-11 13:48:49.620120','2022-04-11 13:48:49.620120','맛은세콤한맛고 조금달콤한맛이섞여있구요 꾸준히 먹고있는데 피부가 깨끗해 지고 탱탱해지는 느낌?기분탓일수도있는데 열심히복용중입니다',5,1,7),(20,'2022-04-06 16:34:52.686211','2022-04-06 16:34:52.687125','피부가 요즘 안좋아져서 먹고있습니다.\n두 통째 먹고 있는데 효과가 눈에 보여요!\n강추합니다 ^0^',5,1,2),(21,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620153','잘 챙겨먹고 있습니다.',4,19,5),(22,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','정말 맛있어요',5,4,1),(23,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','정말 좋아요',5,5,1),(24,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','알은 다들 아는 루테인 알약 크기. 유통기한 널널해서 두고두고 먹을만함',5,2,1),(25,'2022-03-17 13:48:49.620120','2022-03-17 13:48:49.620120','알 크기도 적당하고 하루에 1번만 먹어도 되고~ 좋아요.눈건강도 챙겨야죠~! 루테인!!! 계속 꾸준히 먹고있습니다!',5,2,1),(26,'2022-03-17 13:48:49.620120','2022-03-17 13:48:49.620120','개인적으로는 저는 효과를 많이 보았습니다 나이가 들어서 눈이 침침하고 건조하였는데 루테인 먹고후부터는 그러지 않습니다.그래서 꾸준히 복용중',5,2,1),(27,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','눈이 요즈음에 침침해져서 루테인이 좋다고 해서 구매해서 먹고 있습니다. 루테인은 지아잔틴 포함된게 좋다고 해서 구매했어요~',5,2,2),(28,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','전 장이 심한둔감형이라 유산균도 하루 한번이 아니라 세번먹어도 화장실 힘들어 둔감형으로 나온제품은 첨이라 복용해보고 좋으면 이제품만 복용하려구요',4,2,2),(29,'2022-03-23 13:48:49.620120','2022-03-23 13:48:49.620120','처음구입하는데 할인하고 포인트로 저렴하게 샀네요 배송도 정말빨랐어요~3개월섭취후 눈건강에 효과가 있었으면 좋겠네요~',4,2,2),(30,'2022-03-23 13:48:49.620120','2022-03-23 13:48:49.620120','크기가 적당하니 먹기 좋고, 포장도 꼼꼼히 잘 되어 있어~ 만족합니다. 같이 보내주신 사은품(비타민)도 괜찮네요.',4,2,5),(31,'2022-03-23 13:48:49.620120','2022-03-23 13:48:49.620120','평소에 장 때문에 일상 생활에서 어려움을 겪는데 개선 되었으면 좋겠어요 계속 먹어보고 한 달 뒤에 리뷰 써볼게요',4,2,5),(32,'2022-03-24 13:48:49.620120','2022-03-24 13:48:49.620120','눈영양제가 다 먹어서 사려하는데 마침 딜떠서 저렴하거 구매했어요. 효과있었으면 좋겠네요^^',3,2,5),(33,'2022-03-24 13:48:49.620120','2022-03-24 13:48:49.620120','이 회사 제품은 어떤가하고 사서 먹고 있는데 사실 효과는 기대에 못 미칩니다. 재구매는 생각 없습니다',3,2,6),(34,'2022-03-26 13:48:49.620120','2022-03-26 13:48:49.620120','상품잘받았습니다.먹고있는데아직까지 특별히 효과를잘모르겠는데꾸준히먹으면 나뻐지지않을것같아서 먹고있어요.',3,2,6),(35,'2022-04-03 13:48:49.620120','2022-04-03 13:48:49.620120','선물 받아 복용하고 효과 있으리라 믿고 재구매 했어요 복용 안하는것 보다 눈 상태가 편해요',3,2,6),(36,'2022-04-06 13:48:49.620120','2022-04-06 13:48:49.620120','가격도 별것도 아닌 루테인이 비싸기만하고 가격도 성능도 그냥 그런 것...',2,2,7),(37,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','도움을 줌인중 알았는데 도움을 줄수있음이라 아쉽네요 ㅠㅠ',2,2,7),(38,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','종근당 회사를 믿고 유산균, 루테인은 여기꺼 먹고있어요. 눈에띄는 효과는 사실 기대하긴 어렵지만, 노화를 지연시켜준다하니 이번엔 부모님 보내드렸어요. 행사 자주부탁합니다.',5,2,7),(39,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','노화가 진행중인 시력때문에 구매해봤어요 휴대하기도 편하게 개별포장되었네요',4,2,8),(41,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','비타민d가 부족하면 면역력이 떨어진다고 하여 신랑을 위해 구매했습니다. ',5,3,1),(42,'2022-03-14 13:48:49.620120','2022-03-14 13:48:49.620120','순수식품 알티지 오메가3는 온가족이 다 먹는 제품이라 항상 6박스씩 구매하고 있는데 이번에 너무 저렴한 가격으로 세일해서 구매했습니다',5,3,5),(43,'2022-03-16 13:48:49.620120','2022-03-16 13:48:49.620120','알티지 오메가가 좋다고 나올길래 바꾸게 되었네요. 할인을 받을때 저렴하게 구매 한거 같아 만족하고 무엇보다 개별 포장이라 더 좋은거 같습니다. ',5,3,6),(44,'2022-03-18 13:48:49.620120','2022-03-18 13:48:49.620120','아직 효과는 못 느끼겠으나 꾸준히 먹고 있어요 트림하면 냄새나는게 너무 싫어서 식물성으로 찾아서 먹고 있는데 아에 안나는건 아니에요 약간 나요 ',4,3,8),(45,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','오메가3는 필수로 챙겨먹고 있어서 이번에 할인하길래 순수식품에서 구매해 봤어요. ',4,3,7),(46,'2022-03-26 13:48:49.620120','2022-03-26 13:48:49.620120','오메가3는 꼭 챙겨먹는 영양제라 이번에 순수식품에서 구매해봤는데 효과도 좋았으면 해요.',4,3,9),(47,'2022-03-28 13:48:49.620120','2022-03-28 13:48:49.620120','오메가는 꼭 챙겨먹어요.건강해지는 느낌입니다',3,3,1),(49,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','너무 하시네요. 하루만에 4000원 더 쎄일하시고 ㅜㅜ 360개 42000원에 샀는데 취소하고 다시 시키고 싶네오ㅡ.',2,3,6),(50,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','함량미달 제품 사기치네요. 뉴스에 까지 나오는데 당장 환불해줘요',1,3,7),(51,'2022-04-03 13:48:49.620120','2022-04-03 13:48:49.620120','자회사 오메가3 먹고 있었는데 루테인 들어간 제품도 괜찮을거 같아서 바꿔봤어요 아직 복용하기 전이지만 가성비좋네요',5,3,8),(52,'2022-04-06 13:48:49.620120','2022-04-06 13:48:49.620120','배송 빠르고 가격 저렴하게 구매했어요.혈관에 좋다고 하니 열심히 먹어봐야죠.효능은 겉으로 표가 나는게 아니라서 잘 모르겠습니다',4,3,5),(53,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','가격이 저렴해서 가성비가 좋긴한데 DHA + EPA 합이 600mg인게 조금 아쉬워요',3,3,1),(54,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','파손되지 않게 상품 잘 받았구여 보통 오메가3 크키랑 비슷한 알약이예용 유통기한도 넉넉하고 저렴하게 잘 샀어요 ',5,3,9),(55,'2022-03-10 13:48:49.620120','2022-03-10 13:48:49.620120','약의 사이즈가 조금 큰 편이라 복용시 목에 부담을 느낄수도 있어요',5,4,1),(56,'2022-03-10 13:48:49.620120','2022-03-10 13:48:49.620120','눈이 피로하고 특히 야간 운전시 불빛이 번져 보여서 꾸준히 먹어보려고 구입했네요. 오메가3에 비타민도 들어있으니 이거 한알로 끝',5,4,2),(57,'2022-03-11 13:48:49.620120','2022-03-11 13:48:49.620120','약알이 쫌 크기가 있어요~~큰알약을 목넘김이 예민하신 분들은 조금 힘들수도 있겠어요~~전 목넘김 크게 상관없긴했어요!!',5,4,5),(58,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','계속 가격이 올라 안타깝지만 덕분에 눈의 피로가 덜해 꾸준히 먹습니다',5,4,6),(59,'2022-03-14 13:48:49.620120','2022-03-14 13:48:49.620120','저렴하게 잘 샀어요 겨울되면 안구건조가 심해지는데 먹으면 더 나은거 같아요 눈은 소중하니깐 항상 신경써야죠',5,4,7),(60,'2022-03-17 13:48:49.620120','2022-03-17 13:48:49.620120','알이 조금크긴함 쨋든 간편 하루한알로 너무좋음',5,4,8),(61,'2022-03-17 13:48:49.620120','2022-03-17 13:48:49.620120','핸펀 볼때도 눈피로도 덜하구요.나한테 맞는눈영양제가 있는지 전 다른 유명제품 보다 여기 루테인이 획실히 잘 맞더라구요.',4,4,9),(62,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','비타민D 씹어먹어야 하는지 모르고 주문해서 이상하면 어쩌나 했는데 톡 터뜨러 먹으니 상큼한 오렌지맛 젤리느낌?나네요.',4,4,8),(63,'2022-03-25 13:48:49.620120','2022-03-25 13:48:49.620120','꾸준히 먹고 있는 칼슘영양제예요.마그네슘이랑 아연..비타마D까지 한번에 먹을 수 있어서 좋아요.',4,4,7),(64,'2022-03-27 13:48:49.620120','2022-03-27 13:48:49.620120','원하는 제품 다시 구매했습니다. 6개월치라 가격도 저렴하네요. 다른제품과 비교했을때 제일저렴합니다...',3,4,6),(65,'2022-04-03 13:48:49.620120','2022-04-03 13:48:49.620120','이 제품은 처음 신청해분데 왠지 조정석때문에 친근해요',3,4,5),(66,'2022-04-03 13:48:49.620120','2022-04-03 13:48:49.620120','먹으면 괜찮은듯하다가 안먹으면 또 암튼 오메가를 안먹기가 그래요',3,4,2),(67,'2022-04-05 13:48:49.620120','2022-04-05 13:48:49.620120','구입하고나니 다른사이트에서 더 싸게 살수 있어서 아쉽내요. ',3,4,1),(68,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','루테인이 오메가와 함께 있다보니 알약 크기가 커요. 매일 먹고는 있는데 효과는 모르겠어요. 각각 따로 먹는게 나은거 같아요.',2,4,2),(69,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','아직 안먹어봐서',1,4,5),(70,'2022-03-09 13:48:49.620120','2022-03-09 13:48:49.620120','배송빠르고 상품평 좋아 믿고 구매했어요',5,5,6),(71,'2022-03-11 13:48:49.620120','2022-03-11 13:48:49.620120','가격도 저렴하고 유통기한도 길고 배송도 빠르고 다 좋네요',4,5,6),(72,'2022-03-12 13:48:49.620120','2022-03-12 13:48:49.620120','6개월치 들어있네요. 눈영양에 도움이 되길',4,5,5),(73,'2022-03-16 13:48:49.620120','2022-03-16 13:48:49.620120','배송빠르고 상품평 좋아 믿고 구매했어요',4,5,5),(74,'2022-03-20 13:48:49.620120','2022-03-20 13:48:49.620120','나이가 들어 누이 침침해 꾸주히 먹구 있는데 대용량 저렴하게 나와 집사람 하구복용 할가해서 구매 먹어보고 좋으면 재구매 하겠음',4,5,2),(75,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','주문후 리뷰를 보는데 돈피라고 해서 놀랐어요',4,5,7),(76,'2022-03-24 13:48:49.620120','2022-03-24 13:48:49.620120','성능은 먹어보지 않아서 잘모르겠고.타회사상품 구매해서 계속먹었는데.효과는크게못봐서.한번갈아타봤습니다.',4,5,8),(77,'2022-03-24 13:48:49.620120','2022-03-24 13:48:49.620120','며칠전에 상품을 받았는데 오늘에야 시간이 나서 리뷰를 작성하네요. 잘 먹고 있어요.',4,5,9),(78,'2022-03-27 13:48:49.620120','2022-03-27 13:48:49.620120','요즘 눈이 침침해지는것 같아 구매해봤어여 캐나다산 영양제는 처음 먹어보는데 효과가 있었으면 좋겠네요',3,5,1),(79,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','루테인 꾸준하게 먹고있는데 효과는 잘 모르겠던데 그래도 먹어야 겠죠.',3,5,7),(80,'2022-04-02 13:48:49.620120','2022-04-02 13:48:49.620120','제품이 다 떨어져서 다시 주문 했어요. 구매했던 제품이라 더욱 마음에 들어요.',3,5,6),(81,'2022-04-02 13:48:49.620120','2022-04-02 13:48:49.620120','양이 많고 오래 먹을수 있어 좋네요.',3,5,1),(82,'2022-04-04 13:48:49.620120','2022-04-04 13:48:49.620120','루테인 영양제를 알게 된 이후 꾸준히 사서 복용하고 있습니다. ',3,5,5),(83,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','별로효과없음',2,5,2),(84,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','잘 받았습니다.',1,5,1),(85,'2022-03-20 13:48:49.620120','2022-03-20 13:48:49.620120','종류별로 시켜먹고 잇으며 부모님 항상 사드리고 있어요',5,6,9),(86,'2022-03-21 13:48:49.620120','2022-03-21 13:48:49.620120','인테로 평이 좋아서 구매해보았네요.건강에 많은 도움이 되었으면 합니다.',5,6,1),(87,'2022-03-24 13:48:49.620120','2022-03-24 13:48:49.620120','꾸준히 먹는 제품이라 주문했어요. 배송도 괜찮았어요. 추천.',5,6,8),(88,'2022-03-25 13:48:49.620120','2022-03-25 13:48:49.620120','눈이 요새 침침해 지는거같아서 구매했어요',5,6,7),(89,'2022-03-27 13:48:49.620120','2022-03-27 13:48:49.620120','제품 아주 만족스럽습니다 다음에 또 구매하고 싶어요',5,6,6),(90,'2022-03-28 13:48:49.620120','2022-03-28 13:48:49.620120','눈의 건강을위해 2통 구매...좋아요!',5,6,5),(91,'2022-03-29 13:48:49.620120','2022-03-29 13:48:49.620120','크기는 물과 함께 넘길때 걸리지 않고 무향이라서 거부감 없네요~ 유통기한도 길고 가격도 좋아서 다음에 또 구입의사 있습니다',4,6,2),(92,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','요즘 핸드폰이며 책이며 눈이 많이 피로한 아이들 먹일려고 주문했어요 일단 알이 작아서 먹이기좋네요',4,6,1),(93,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','꾸준히 먹으면 좋아지겠지싶어 계속 복용중입니다.이 제품으로 두번째 구입.가격도 싸고 사이즈는 작아서 목넘김이 수월합니다',4,6,1),(94,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','루테인 확실히효과 있네요 먹구 후기올려요 인테로 제품 가격대비 좋습니다 다른영양제도 재구매의사 있어요',4,6,2),(95,'2022-04-03 13:48:49.620120','2022-04-03 13:48:49.620120','약사이즈는 적당해서 목넘김 불편하지않고요 1일1알복용이라 간편하기도 하고 약케이스도 줘서 넘나 편하게 복용할거같아요.',3,6,5),(96,'2022-04-05 13:48:49.620120','2022-04-05 13:48:49.620120','눈에 좋은 영양제 찾다가 좋은 제품을 찾았네요',3,6,6),(97,'2022-04-06 13:48:49.620120','2022-04-06 13:48:49.620120','가격저렴해서 사봤는데 효과는 잘 모르겠어요',2,6,7),(98,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','10일은먹어봐야',1,6,8),(99,'2022-04-07 13:48:49.620120','2022-04-07 13:48:49.620120','잘 모름',1,6,9),(100,'2022-04-02 13:48:49.620120','2022-04-03 13:48:49.620120','솔직히 그냥 그래요',5,7,1),(101,'2022-04-01 13:48:49.620120','2022-04-07 13:48:49.620120','너무 좋아요 다시 구매할래요',5,7,7),(102,'2022-03-30 13:48:49.620120','2022-04-01 13:48:49.620120','일단은 먹어봐야 알거 같아요~!',3,7,1),(103,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278571','오메가3는 비린내나서 못먹는데 미세조류 추출물이라고 해서 구매해봤어요',5,3,2),(104,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278538','비타민은 역시 고려은단',5,43,1),(105,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','마그네슘 먹어야한다는 말이 있어서 구매했습니다',5,78,5),(106,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','보스웰리아 할인한다해서 2통 샀습니다. 일단은 좋은것같네요',5,149,6),(107,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','눈 건강에 좋은 것 같네요',5,27,7),(108,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278538','부모님께 드리는 영양제 고르다가 치아건강있어서 샀습니다. ',4,154,7),(109,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','조금 비싸네요ㅠㅠ',4,130,7),(110,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','혈압감소에 도움이된다던데 아직 잘 모르겠네요 더 먹어봐야알것같습니다',3,191,8),(111,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','루테인과 오메가3를 동시에 챙길 수 있어서 좋아요',5,23,7),(112,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','콜레스테롤 수치가 높아서 검색하다가 한 번 구매해봅니다. 좋으면 또 시킬게요',5,200,9),(113,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','6개월분이라 좋아요 두고두고 먹을 수 있네요',5,284,7),(114,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278538','알약이 적당히 먹을만할정도의 사이즈네요 추천합니다',4,284,9),(115,'2022-04-01 13:48:49.620120','2022-04-01 13:48:49.620120','고함량이라길래 샀는데 별 효과가 없네요 비추합니다',2,288,6),(116,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278538','모델믿고 샀는데 그냥 그렇네요 ',1,256,6),(117,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','유산균도 중요하다고해서 구매합니다',5,183,5),(118,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','철분많이섭취하면 철인되나?',4,142,5),(119,'2022-03-29 13:48:49.620120','2022-03-29 13:48:49.620120','캐나다 직수입인데 가격도 저렴하네요 강추',5,116,1),(120,'2022-03-29 13:48:49.620120','2022-03-29 13:48:49.620120','물에타먹을수있어서 좋스빈다',5,82,1),(121,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','씹어먹는비타민 신선하네요',4,74,5),(122,'2022-03-30 13:48:49.620120','2022-03-30 13:48:49.620120','좋아용',5,67,6),(123,'2022-03-29 13:48:49.620120','2022-03-29 13:48:49.620120','아직 잘 모르겠음',3,66,7),(124,'2022-04-08 02:16:55.278538','2022-04-08 02:16:55.278538','일단 더 먹어봐야 알것같습니다.',4,52,8);
/*!40000 ALTER TABLE `products_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_choicesingrediant`
--

DROP TABLE IF EXISTS `survey_choicesingrediant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_choicesingrediant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `choice_id` bigint NOT NULL,
  `ingrediant_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_choicesingred_choice_id_afb1cb63_fk_survey_su` (`choice_id`),
  KEY `survey_choicesingred_ingrediant_id_4bc5cd4f_fk_products_` (`ingrediant_id`),
  CONSTRAINT `survey_choicesingred_choice_id_afb1cb63_fk_survey_su` FOREIGN KEY (`choice_id`) REFERENCES `survey_surveyquestionchoices` (`id`),
  CONSTRAINT `survey_choicesingred_ingrediant_id_4bc5cd4f_fk_products_` FOREIGN KEY (`ingrediant_id`) REFERENCES `products_ingrediant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_choicesingrediant`
--

LOCK TABLES `survey_choicesingrediant` WRITE;
/*!40000 ALTER TABLE `survey_choicesingrediant` DISABLE KEYS */;
INSERT INTO `survey_choicesingrediant` VALUES (1,1,3),(2,1,4),(3,2,3),(4,2,4),(5,2,6),(6,2,7),(7,3,3),(8,3,4),(9,3,6),(10,4,4),(11,4,5),(12,4,8),(13,5,4),(14,5,5),(15,5,13),(16,39,9),(17,40,9),(18,40,10),(19,41,9),(20,42,2),(21,42,11),(22,42,12),(23,43,9),(24,44,1),(25,44,2),(26,44,5),(27,44,12),(28,45,2),(29,45,12),(30,45,14),(31,46,5),(32,46,12),(33,47,12),(34,47,13),(35,48,2),(36,48,12),(37,48,14),(38,49,1),(39,49,5),(40,49,14),(41,50,4),(42,50,16),(43,51,2),(44,51,14),(45,52,1),(46,52,15),(47,53,1),(48,53,5),(49,53,14),(50,54,5),(51,55,2),(52,55,16),(53,56,4),(54,56,5),(55,57,2),(56,57,5),(57,57,14),(58,58,3),(59,58,6),(60,59,3),(61,59,16),(62,60,14),(63,61,3),(64,61,16),(65,62,17),(66,63,5),(67,63,9),(68,63,16),(69,63,18),(70,64,5),(71,64,9),(72,64,16),(73,64,18),(74,65,5),(75,65,16),(76,66,19),(77,67,20),(78,68,18),(79,69,20),(80,70,21),(81,70,22),(82,70,24),(83,71,21),(84,71,22),(85,71,24),(86,72,21),(87,72,24),(88,5,23),(89,39,23),(90,45,23),(91,66,26),(92,66,27),(93,68,25),(94,68,27);
/*!40000 ALTER TABLE `survey_choicesingrediant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_recommend`
--

DROP TABLE IF EXISTS `survey_recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_recommend` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rating` double NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_recommend_product_id_8ecaabde_fk_products_product_id` (`product_id`),
  KEY `survey_recommend_user_id_6d4479ad_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `survey_recommend_product_id_8ecaabde_fk_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `products_product` (`id`),
  CONSTRAINT `survey_recommend_user_id_6d4479ad_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_recommend`
--

LOCK TABLES `survey_recommend` WRITE;
/*!40000 ALTER TABLE `survey_recommend` DISABLE KEYS */;
INSERT INTO `survey_recommend` VALUES (137,1.028,149,1),(138,1.542,7,2),(139,1.039,43,2),(140,1.05,78,2),(141,1.039,82,2),(142,1.039,116,2),(143,1.006,149,2),(144,1.05,183,2),(145,1.007,149,5),(146,1.628,7,6),(147,1.023,23,6),(148,1.023,27,6),(149,1.008,43,6),(150,1.008,82,6),(151,1.008,116,6),(152,1.023,284,6),(153,1.022,43,7),(154,1.022,82,7),(155,1.022,116,7),(156,1.067,149,7),(157,1.076,200,8),(158,1.828,284,8),(159,4.414,1,9),(160,3.803,2,9);
/*!40000 ALTER TABLE `survey_recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_surveyhistory`
--

DROP TABLE IF EXISTS `survey_surveyhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_surveyhistory` (
  `id` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `respondent_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_surveyhistory_respondent_id_bfc65ab9_fk_accounts_user_id` (`respondent_id`),
  CONSTRAINT `survey_surveyhistory_respondent_id_bfc65ab9_fk_accounts_user_id` FOREIGN KEY (`respondent_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_surveyhistory`
--

LOCK TABLES `survey_surveyhistory` WRITE;
/*!40000 ALTER TABLE `survey_surveyhistory` DISABLE KEYS */;
INSERT INTO `survey_surveyhistory` VALUES ('02ba4ceae3374358a57c14e06eb780f4','2022-04-07 16:23:57.537844',5),('1c19933ed0f044c69a23a889351368fc','2022-04-07 13:51:48.045480',7),('1d5829cd1bb14baab51adaaf5d8d5f8e','2022-04-07 17:10:20.401539',1),('303431ebb36f46d29be5b016b82b6f76','2022-04-07 22:52:11.940584',1),('59bd011a07f240bc91232dbdb15a49f7','2022-04-08 00:08:31.754054',2),('6a9851cf4cde412baf323e82032379d9','2022-04-08 02:29:25.579906',6),('765aef4e2e1644b0885b86fe0ea01ce2','2022-04-07 18:03:56.993661',2),('9f0b08ab74f74dfba2a0eb9b55cbe067','2022-04-08 02:17:51.188806',10);
/*!40000 ALTER TABLE `survey_surveyhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_surveyquestion`
--

DROP TABLE IF EXISTS `survey_surveyquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_surveyquestion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` smallint unsigned NOT NULL,
  `content` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_descriptive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `survey_surveyquestion_chk_1` CHECK ((`number` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_surveyquestion`
--

LOCK TABLES `survey_surveyquestion` WRITE;
/*!40000 ALTER TABLE `survey_surveyquestion` DISABLE KEYS */;
INSERT INTO `survey_surveyquestion` VALUES (1,1,'키 (cm)를 입력해주세요.',1),(2,2,'몸무게 (kg)를 입력해주세요.',1),(3,3,'혈압/혈행 관련 건강습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(4,4,'소화/장 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(5,5,'피부 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(6,6,'눈 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(7,7,'두뇌 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(8,8,'뼈/관절 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(9,9,'면역 관련 건강 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(10,10,'모발 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0),(11,11,'간 건강 관련 습관 및 증상 중 해당되는 항목을 모두 선택하세요.',0);
/*!40000 ALTER TABLE `survey_surveyquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_surveyquestionchoices`
--

DROP TABLE IF EXISTS `survey_surveyquestionchoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_surveyquestionchoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` smallint unsigned NOT NULL,
  `content` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_surveyquestio_question_id_802b2fa8_fk_survey_su` (`question_id`),
  CONSTRAINT `survey_surveyquestio_question_id_802b2fa8_fk_survey_su` FOREIGN KEY (`question_id`) REFERENCES `survey_surveyquestion` (`id`),
  CONSTRAINT `survey_surveyquestionchoices_chk_1` CHECK ((`number` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_surveyquestionchoices`
--

LOCK TABLES `survey_surveyquestionchoices` WRITE;
/*!40000 ALTER TABLE `survey_surveyquestionchoices` DISABLE KEYS */;
INSERT INTO `survey_surveyquestionchoices` VALUES (1,1,'장기간 주 1회 이상 음주 혹은 흡연을 해 왔거나 하고 있어요.',3),(2,2,'기름기가 많거나 짠 음식을 자주 먹어요.',3),(3,3,'일상 생활에서 머리가 무겁거나 숨이 차는 증상을 종종 겪어요.',3),(4,4,'손발의 혈액 흐름이 원활하지 않아요.',3),(5,5,'해당 사항은 없지만 혈압 및 혈행 건강이 걱정돼요.',3),(39,1,'1주일에 3일 이상 설사나 변비 증상이 있어요.',4),(40,2,'식사 후 속이 쓰리거나 불편감이 자주 있어요.',4),(41,3,'배변할 때 힘들거나 시간이 10분 이상 걸리는 경우가 잦아요.',4),(42,4,'채소나 과일을 하루 2회 이하로 먹어요.',4),(43,5,'해당 사항은 없지만 소화 및 장 건강이 걱정돼요.',4),(44,1,'피부가 많이 건조한 편이에요.',5),(45,2,'피부에 여드름 등 트러블이 종종 발생해요.',5),(46,3,'자외선에 많이 노출되는 편이에요.',5),(47,4,'피부 회복력 및 보습 등의 피부 상태가 악화되었어요',5),(48,5,'해당 사항은 없지만 피부 건강이 걱정돼요.',5),(49,1,'눈이 건조해 뻑뻑하고 간지러움을 느껴요.',6),(50,2,'눈 주변이 떨려요.',6),(51,3,'하루에 모니터 및 스마트폰을 5시간 이상 사용해요.',6),(52,4,'어두운 곳에 들어가면 한참동안 눈앞이 캄캄해요.',6),(53,5,'해당 사항은 없지만 눈 건강이 걱정돼요.',6),(54,1,'기억력이 떨어지는 것 같아요.',7),(55,2,'일에 집중이 잘 안 돼요.',7),(56,3,'불안, 긴장감, 우울한 감정을 자주 느껴요.',7),(57,4,'해당 사항은 없지만 두뇌 건강이 걱정돼요.',7),(58,1,'골절 경험이 있어요.',8),(59,2,'무릎 등 관절 통증을 느껴요.',8),(60,3,'손톱 및 발톱이 자주 갈라지거나 깨지는 편이에요.',8),(61,4,'해당 사항은 없지만 뼈와 관절 건강이 걱정돼요.',8),(62,1,'스트레스가 매우 많아요.',9),(63,2,'아토피 또는 비염 등 알레르기 질환이 있어요.',9),(64,3,'감기와 같은 감염성 질환에 자주 걸려요.',9),(65,4,'해당 사항은 없지만 면역이 걱정돼요.',9),(66,1,'탈모가 진행되고 있거나 탈모가 걱정돼요.',10),(67,2,'머리카락이 갈라지고 끊어지는 등 모발 상태가 나빠요.',10),(68,3,'같은 또래보다 새치가 많이 나요.',10),(69,4,'해당 사항은 없지만 모발 건강이 걱정돼요.',10),(70,1,'수면을 취한 후에도 피곤함을 느껴요.',11),(71,2,'무기력감이 종종 있어요.',11),(72,3,'해당 사항은 없지만 간 건강이 걱정돼요.',11);
/*!40000 ALTER TABLE `survey_surveyquestionchoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_surveyresponse`
--

DROP TABLE IF EXISTS `survey_surveyresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_surveyresponse` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer_choice` smallint unsigned DEFAULT NULL,
  `answer_text` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `question_id` bigint NOT NULL,
  `survey_id` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_surveyrespons_question_id_41ef3f89_fk_survey_su` (`question_id`),
  KEY `survey_surveyrespons_survey_id_9a5de89c_fk_survey_su` (`survey_id`),
  CONSTRAINT `survey_surveyrespons_question_id_41ef3f89_fk_survey_su` FOREIGN KEY (`question_id`) REFERENCES `survey_surveyquestion` (`id`),
  CONSTRAINT `survey_surveyrespons_survey_id_9a5de89c_fk_survey_su` FOREIGN KEY (`survey_id`) REFERENCES `survey_surveyhistory` (`id`),
  CONSTRAINT `survey_surveyresponse_chk_1` CHECK ((`answer_choice` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_surveyresponse`
--

LOCK TABLES `survey_surveyresponse` WRITE;
/*!40000 ALTER TABLE `survey_surveyresponse` DISABLE KEYS */;
INSERT INTO `survey_surveyresponse` VALUES (1,NULL,'173',1,'1c19933ed0f044c69a23a889351368fc'),(2,NULL,'64',2,'1c19933ed0f044c69a23a889351368fc'),(3,2,NULL,3,'1c19933ed0f044c69a23a889351368fc'),(4,5,NULL,4,'1c19933ed0f044c69a23a889351368fc'),(5,1,NULL,5,'1c19933ed0f044c69a23a889351368fc'),(6,3,NULL,6,'1c19933ed0f044c69a23a889351368fc'),(7,4,NULL,7,'1c19933ed0f044c69a23a889351368fc'),(8,4,NULL,8,'1c19933ed0f044c69a23a889351368fc'),(9,4,NULL,9,'1c19933ed0f044c69a23a889351368fc'),(10,3,NULL,10,'1c19933ed0f044c69a23a889351368fc'),(11,3,NULL,11,'1c19933ed0f044c69a23a889351368fc'),(12,NULL,'123',1,'02ba4ceae3374358a57c14e06eb780f4'),(13,NULL,'123',2,'02ba4ceae3374358a57c14e06eb780f4'),(14,1,NULL,3,'02ba4ceae3374358a57c14e06eb780f4'),(15,2,NULL,3,'02ba4ceae3374358a57c14e06eb780f4'),(16,39,NULL,4,'02ba4ceae3374358a57c14e06eb780f4'),(17,44,NULL,5,'02ba4ceae3374358a57c14e06eb780f4'),(18,45,NULL,5,'02ba4ceae3374358a57c14e06eb780f4'),(19,50,NULL,6,'02ba4ceae3374358a57c14e06eb780f4'),(20,54,NULL,7,'02ba4ceae3374358a57c14e06eb780f4'),(21,58,NULL,8,'02ba4ceae3374358a57c14e06eb780f4'),(22,59,NULL,8,'02ba4ceae3374358a57c14e06eb780f4'),(23,63,NULL,9,'02ba4ceae3374358a57c14e06eb780f4'),(24,67,NULL,10,'02ba4ceae3374358a57c14e06eb780f4'),(25,70,NULL,11,'02ba4ceae3374358a57c14e06eb780f4'),(26,NULL,'123',1,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(27,NULL,'123',2,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(28,3,NULL,3,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(29,41,NULL,4,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(30,47,NULL,5,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(31,52,NULL,6,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(32,57,NULL,7,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(33,61,NULL,8,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(34,64,NULL,9,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(35,68,NULL,10,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(36,71,NULL,11,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(37,70,NULL,11,'1d5829cd1bb14baab51adaaf5d8d5f8e'),(38,NULL,'174',1,'765aef4e2e1644b0885b86fe0ea01ce2'),(39,NULL,'45',2,'765aef4e2e1644b0885b86fe0ea01ce2'),(40,5,NULL,3,'765aef4e2e1644b0885b86fe0ea01ce2'),(41,42,NULL,4,'765aef4e2e1644b0885b86fe0ea01ce2'),(42,44,NULL,5,'765aef4e2e1644b0885b86fe0ea01ce2'),(43,49,NULL,6,'765aef4e2e1644b0885b86fe0ea01ce2'),(44,50,NULL,6,'765aef4e2e1644b0885b86fe0ea01ce2'),(45,51,NULL,6,'765aef4e2e1644b0885b86fe0ea01ce2'),(46,52,NULL,6,'765aef4e2e1644b0885b86fe0ea01ce2'),(47,54,NULL,7,'765aef4e2e1644b0885b86fe0ea01ce2'),(48,55,NULL,7,'765aef4e2e1644b0885b86fe0ea01ce2'),(49,59,NULL,8,'765aef4e2e1644b0885b86fe0ea01ce2'),(50,60,NULL,8,'765aef4e2e1644b0885b86fe0ea01ce2'),(51,65,NULL,9,'765aef4e2e1644b0885b86fe0ea01ce2'),(52,69,NULL,10,'765aef4e2e1644b0885b86fe0ea01ce2'),(53,71,NULL,11,'765aef4e2e1644b0885b86fe0ea01ce2'),(54,NULL,'777',1,'59bd011a07f240bc91232dbdb15a49f7'),(55,NULL,'777',2,'59bd011a07f240bc91232dbdb15a49f7'),(56,1,NULL,3,'59bd011a07f240bc91232dbdb15a49f7'),(57,40,NULL,4,'59bd011a07f240bc91232dbdb15a49f7'),(58,47,NULL,5,'59bd011a07f240bc91232dbdb15a49f7'),(59,53,NULL,6,'59bd011a07f240bc91232dbdb15a49f7'),(60,54,NULL,7,'59bd011a07f240bc91232dbdb15a49f7'),(61,60,NULL,8,'59bd011a07f240bc91232dbdb15a49f7'),(62,65,NULL,9,'59bd011a07f240bc91232dbdb15a49f7'),(63,69,NULL,10,'59bd011a07f240bc91232dbdb15a49f7'),(64,71,NULL,11,'59bd011a07f240bc91232dbdb15a49f7'),(65,NULL,'173',1,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(66,NULL,'68',2,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(67,1,NULL,3,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(68,43,NULL,4,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(69,44,NULL,5,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(70,51,NULL,6,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(71,57,NULL,7,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(72,61,NULL,8,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(73,65,NULL,9,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(74,69,NULL,10,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(75,70,NULL,11,'9f0b08ab74f74dfba2a0eb9b55cbe067'),(76,NULL,'190',1,'6a9851cf4cde412baf323e82032379d9'),(77,NULL,'100',2,'6a9851cf4cde412baf323e82032379d9'),(78,1,NULL,3,'6a9851cf4cde412baf323e82032379d9'),(79,3,NULL,3,'6a9851cf4cde412baf323e82032379d9'),(80,42,NULL,4,'6a9851cf4cde412baf323e82032379d9'),(81,48,NULL,5,'6a9851cf4cde412baf323e82032379d9'),(82,50,NULL,6,'6a9851cf4cde412baf323e82032379d9'),(83,51,NULL,6,'6a9851cf4cde412baf323e82032379d9'),(84,55,NULL,7,'6a9851cf4cde412baf323e82032379d9'),(85,58,NULL,8,'6a9851cf4cde412baf323e82032379d9'),(86,63,NULL,9,'6a9851cf4cde412baf323e82032379d9'),(87,64,NULL,9,'6a9851cf4cde412baf323e82032379d9'),(88,67,NULL,10,'6a9851cf4cde412baf323e82032379d9'),(89,70,NULL,11,'6a9851cf4cde412baf323e82032379d9');
/*!40000 ALTER TABLE `survey_surveyresponse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:50:27
