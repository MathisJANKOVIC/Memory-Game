DROP database if exists scores;
CREATE database scores;

DROP table if exists scores;
CREATE table scores
(
    player varchar(30) not null,
    numberMoves int not null,
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)