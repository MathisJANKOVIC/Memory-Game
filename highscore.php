<?php
    $id = mysqli_connect("localhost:3306","root","","matching_game") ; //connexion infos
    date_default_timezone_set('Europe/Paris'); //enter your timezone
    
    if(mysqli_connect_errno()){
        die("<script>alert('⚠ Error DB connexion')</script>") ;
    }
    
    if(isset($_GET["player"]) and isset($_GET["score"])) //if user entered authorised characters for his name on last page
    {
        //get encrypted data
        $encrypted_player = $_GET['player'];
        $encrypted_score = $_GET['score'];
        
        //data decryption
        $player = base64_decode($encrypted_player);
        $score = base64_decode($encrypted_score);

        $req = mysqli_query($id,"SELECT date FROM highscore ORDER BY date DESC limit 1");

        if($highscore = mysqli_fetch_assoc($req))
        {            
            $current_date = date('Y-m-d H:i:s');
            $current_time = strtotime($current_date); //converts date format to timestamp Unix format (number of sec elapsed from 01/01/1970)
    
            $last_query_time = strtotime($highscore["date"]);        

            $last_query_sec_elapsed = $current_time - $last_query_time ;      
            
            //checks if user didn't enter unauthorised characters in URL as $player value or if he didn't just quickly refresh the page
            if(!preg_match("/[^a-zA-Z0-9_-]/",$player) and $last_query_sec_elapsed >= 40/*sec*/) 
            {
                $insert_query = "INSERT INTO highscore(player,score) VALUES('$player',$score)";
                mysqli_query($id, $insert_query);
            } 
        }
        else //if there is no saved score in DB
        {
            if(!preg_match("/[^a-zA-Z0-9_-]/",$player)) //checks if user didn't enter unauthorised characters in URL
            {
                $insert_query = "INSERT INTO highscore(player,score) VALUES('$player',$score)";
                mysqli_query($id, $insert_query);
            } 
        }    
    }
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
        echo($last_query_sec_elapsed." sec");

        $select_query = "SELECT player,score,DATE_FORMAT(date, '%d-%m-%Y %H:%i') from highscore ORDER BY score ASC limit 10" ;
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
        while($highscore = mysqli_fetch_assoc($result))
        {   
            echo
            ("                                                  
                    <tr>        
                        <td>$i</td>
                        <td>".$highscore["player"]."</td>
                        <td>".$highscore["score"]."</td>
                        <td>".$highscore["DATE_FORMAT(date, '%d-%m-%Y %H:%i')"]." </td>
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