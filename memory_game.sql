DROP TABLE IF EXISTS `highscore`;
CREATE TABLE IF NOT EXISTS `highscore`
(
  `player` varchar(40) NOT NULL,
  `score` int(9) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

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
('Coop', 16, '2023-01-23 09:49:37');
