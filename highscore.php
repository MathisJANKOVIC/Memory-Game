<?php
    $id = mysqli_connect("localhost:3306","root","","memory_game"); //⚠ connexion infos

    if(mysqli_connect_errno()){
        die("<script>alert('⚠ Erreur de connexion à la base de données')</script>");
    }

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $player = $data["player"];
        $score = $data["score"];

        mysqli_query($id, "INSERT INTO highscore(player,score) VALUES('$player',$score)");
    }
    else if($_SERVER["REQUEST_METHOD"] == "GET")
    {
        ?>
        <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Scores | Memory Game</title>
                <link rel="stylesheet" href="style/highscore.css">
            </head>
            <body>
                <h1>Meilleurs Scores</h1>

                <?php
                    $select_query = "SELECT player,score,DATE_FORMAT(date, '%d-%m-%Y %H:%i') from highscore ORDER BY score ASC limit 10" ;
                    $res = mysqli_query($id,$select_query) ;
                    $i = 1 ; //to print the rang of the player based on his score
                ?>

                <table>
                    <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Joueur</th>
                            <th>Score (coups)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody> <?php while($highscore = mysqli_fetch_assoc($res)){ ?>
                        <tr>
                            <td><?=$i?></td>
                            <td><?=$highscore["player"]?></td>
                            <td><?=$highscore["score"]?></td>
                            <td><?=$highscore["DATE_FORMAT(date, '%d-%m-%Y %H:%i')"]?></td>
                        </tr> <?php $i = $i + 1 ; } ?>
                    </tbody>
                </table>

                <?php
                    if(isset($_GET["game"])) //if the user comes from a game
                    {
                        ?>
                            <div class='button first-button' onclick="window.location.href='game.html'">Nouvelle Partie</div>
                            <div class='button' onclick="window.location.href='index.html'">Menu Principal</div>
                        <?php
                    }
                    else //if the user comes from main menu
                    {
                        ?><div class='button first-button' onclick="window.location.href='index.html'">Retour</div> <?php
                    }
                ?>

                <!-- <li></li> = 1 square (must edit with CSS each li) -->
                <ul class="background"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
            </body>
            </html>
        <?php
    }
?>
