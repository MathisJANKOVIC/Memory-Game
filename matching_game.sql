DROP database IF EXISTS matching_game;
CREATE database IF NOT EXISTS matching_game;

DROP TABLE IF EXISTS highscore;
CREATE TABLE IF NOT EXISTS highscore (
  player varchar(30) NOT NULL,
  score int DEFAULT NULL,
  date timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO highscore(player, score, date) VALUES
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