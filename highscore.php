<?php

    $id = mysqli_connect("localhost:3306","root","","matching_game") ; //connexion infos
    
    if (mysqli_connect_errno()){
        die('⚠ Error DB connexion') ;
    }
    
    if(isset($_GET["player"]) and isset($_GET["score"])) //if user entered authorised characters for his name on last page
    {
        //get encrypted data
        $encrypted_player = $_GET['player'];
        $encrypted_score = $_GET['score'];
        
        //data decryption
        $player = base64_decode($encrypted_player);
        $score = base64_decode($encrypted_score);
        
        //check if using get method
        $insert_query = "INSERT INTO scores(player,score) VALUES('$player',$score)";
        mysqli_query($id,$insert_query);         
    }

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
        $select_query = "SELECT player,score,DATE_FORMAT(date, '%d-%m-%Y %H:%i') from scores ORDER BY score ASC limit 10" ;
        $result = mysqli_query($id,$select_query) ;
        $i = 1 ; //to print the rang of the player based on his score
        
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
        while($matching_game = mysqli_fetch_assoc($result))
        {   
            echo
            ("                                                  
                    <tr>        
                        <td>$i</td>
                        <td>".$matching_game["player"]."</td>
                        <td>".$matching_game["score"]."</td>
                        <td>".$matching_game["DATE_FORMAT(date, '%d-%m-%Y %H:%i')"]." </td>
                    </tr>                               
            ");                      
            $i = $i + 1 ;           
        }
        echo("  </tbody>
            </table>"
        );

        if(isset($_GET["player"])) //if the user clicked on "cancel" button or entered authorised characters on last page
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