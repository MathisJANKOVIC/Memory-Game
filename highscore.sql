-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 01 fév. 2023 à 18:18
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `matching_game`
--

-- --------------------------------------------------------

--
-- Structure de la table `highscore`
--

DROP TABLE IF EXISTS `highscore`;
CREATE TABLE IF NOT EXISTS `highscore` (
  `player` varchar(40) NOT NULL,
  `score` int(9) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `highscore`
--

INSERT INTO `highscore` (`player`, `score`, `date`) VALUES
('Mathis', 33, '2023-01-19 17:10:07'),
('Mathis', 26, '2023-01-19 17:16:26'),
('Mathis', 25, '2023-01-19 17:18:52'),
('Mathis', 20, '2023-01-19 21:41:22'),
('Mathis', 24, '2023-01-19 17:26:36'),
('Nadine', 20, '2023-01-20 11:11:37'),
('Mathis', 25, '2023-01-20 14:27:50'),
('Mathis', 25, '2023-01-20 14:29:33'),
('Mathis', 24, '2023-01-20 15:17:50'),
('Mathis', 25, '2023-01-20 15:37:13'),
('Mathis', 27, '2023-01-20 15:10:38'),
('Valentino', 17, '2023-01-23 09:38:12'),
('Oumar', 23, '2023-01-23 09:39:49'),
('Maxime', 21, '2023-01-23 09:43:08'),
('Valentino', 18, '2023-01-23 09:44:10'),
('Adahe', 23, '2023-01-23 09:46:10'),
('Coop', 16, '2023-01-23 09:47:24'),
('Coop', 15, '2023-01-23 09:48:31'),
('Coop', 16, '2023-01-23 09:49:37'),
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
