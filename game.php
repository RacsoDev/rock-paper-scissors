<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="game.css">
    <title>Paper, scissors, rock</title>
</head>
<body>
    <div class="container">
        <div id="result-board"></div>
        <div class="users">
            <div>
                <?php
                    if(isset($_SESSION["username"]))
                    {
                        $username = $_SESSION["username"];
                        echo htmlspecialchars($username);
                    }
                ?>
            </div>
            <div>Them</div>
        </div>
        <div id="game-board">
            <div id="user-board"></div>
            <div class="vertical-line"></div>
            <div id="machine-board"></div>
        </div>

        <div class="buttons-container">
            <button id="paper">Paper</button>
            <button id="scissors">Scissors</button>
            <button id="rock">Rock</button>
            <button id="reset">Reset</button>
        </div>
    </div>
    <script src="constants.js"></script>
    <script src="game.js"></script>
</body>
</html>