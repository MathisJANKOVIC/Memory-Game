<?php
    $id = mysqli_connect("localhost:3306","root","","scores (memory game)") ;
    if (mysqli_connect_errno()){
        die('Erreur de connexion a la BDD') ;
    }
    $name = $_GET["name"];
    $nMoves = $_GET["nMoves"];
    $insertReq = "INSERT INTO scores(player,numberMoves) VALUES('$name',$nMoves)";
    $res = mysqli_query($id,$insertReq) ;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scores</title>
    <link rel="stylesheet" href="scores.css">
</head>
<body>
    <h1>Meilleurs Scores</h1>
    <?php
        $selectReq = "SELECT * from scores";
        $res = mysqli_query($id,$selectReq);
        $line = mysqli_fetch_assoc($res);
        $i = 1 ;
        while($score = mysqli_fetch_assoc($res))
        {   
            echo(
                "<tr>
                    <td>$i</td>
                    <td>".$score["player"]."</td>
                    <td>".$score["numberMoves"]."</td>
                    <td>".$score["date"]." </td>
                </tr><br>"
            );
            $i++;
            
        }
    ?>
    
</body>
</html>

<?php
//echo("<script>alert('ok')</script>");

?>