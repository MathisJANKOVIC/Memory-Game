-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 20 jan. 2023 à 17:35
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `scores (memory game)`
--

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `player` varchar(30) NOT NULL,
  `score` int DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`player`, `score`, `date`) VALUES
('Mathis', 33, '2023-01-19 18:10:07'),
('Mathis', 26, '2023-01-19 18:16:26'),
('Mathis', 25, '2023-01-19 18:18:52'),
('Mathis', 20, '2023-01-19 22:41:22'),
('Mathis', 24, '2023-01-19 18:26:36'),
('Nadine', 20, '2023-01-20 12:11:37'),
('Mathis', 25, '2023-01-20 15:27:50'),
('Mathis', 25, '2023-01-20 15:29:33'),
('Mathis', 24, '2023-01-20 16:17:50'),
('Mathis', 25, '2023-01-20 16:37:13'),
('Mathis', 27, '2023-01-20 16:10:38');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
