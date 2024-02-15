# Memory-Game

Memory Game is a game on browser. The game consists of pairs of cards with identical illustrations which you can customize on skins page. The set of cards is mixed and displayed. You will then have to return 2 cards of your choice by clicking on them. If both cards are identical, they remain visible faces. Otherwise, cards go back to hidden faces.

The game ends when all pairs of cards have been discovered and are displayed visible faces. The goal is to win in as few moves as possible in order to be the highest ranked. If your score is in the top 10 of highscore, it will be saved in the database and you will be able to see it on highscore page.

![game screen](/screen_game.png)

## Requirements
- Apache Server
- PHP
- MySQL or MariaDB

## Installation
1. Download and extract the zip or clone the project
2. Move the project into your virtual host directory
2. Run your Apache server
3. Import `database.sql` in phpMyAdmin
4. Adjust connexion info in `highscore.php` line 2
