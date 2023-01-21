<?php
    $id = mysqli_connect("localhost:3306","root","","scores (memory game)") ;
    if (mysqli_connect_errno()){
        die('Erreur de connexion a la BDD') ;
    }
    
    if(isset($_GET["player"]) and isset($_GET["score"]))
    {
        // Récupération de la variable cryptée
        $encryptedPlayer = $_GET['player'];
        $encryptedScore = $_GET['score'];
        
        // Décryptage de la variable
        $player = base64_decode($encryptedPlayer);
        $n_moves = base64_decode($encryptedScore);
        if($player != NULL and $player != "")
        {
            $insertReq = "INSERT INTO scores(player,score) VALUES('$player',$n_moves)";
            $res = mysqli_query($id,$insertReq) ;
        }   
    }
    // $data = json_decode(file_get_contents('php://input'), true);
    // if(json_last_error() != JSON_ERROR_NONE){
    //     echo "Erreur lors du décodage des données JSON: " . json_last_error_msg();
    // }
   
 //EM206 
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scores | Matching Game</title>
    <link rel="stylesheet" href="style/highscore.css">
</head>
<body>
    <h1>Meilleurs Scores</h1>
    <?php

        $selectReq = "SELECT player,score,DATE_FORMAT(date, '%d-%m-%Y %H:%i') from scores ORDER BY score ASC limit 10";
        $res = mysqli_query($id,$selectReq);
        $i = 1 ;
        
        echo("
            <table>
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Joueur</th>
                        <th>Score (coups)</th>
                        <th>Date</th>
                    </tr>
                </thead> 
                <tbody>              
        ");
        while($scores = mysqli_fetch_assoc($res))
        {   
            echo
            ("                                                  
                    <tr>        
                        <td>$i</td>
                        <td>".$scores["player"]."</td>
                        <td>".$scores["score"]."</td>
                        <td>".$scores["DATE_FORMAT(date, '%d-%m-%Y %H:%i')"]." </td>
                    </tr>                               
            ");                      
            $i = $i + 1 ;           
        }
        echo("  </tbody>
            </table>"
        );

        if(isset($_GET["player"]) and isset($_GET["score"]))
        {
            echo
            ("
                <div class='button' onclick=\"window.location.href='game.html'\">Nouvelle Partie</div>
                <div class='button' onclick=\"window.location.href='index.html'\">Menu Principal</div>
            ");
        }
        
    ?>
    
    
</body>
</html>