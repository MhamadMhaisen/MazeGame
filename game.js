document.addEventListener('DOMContentLoaded', function () {

    const boundaries = document.getElementsByClassName("boundary");
    const player = document.getElementById("start");
    const end = document.getElementById("end");
    const status = document.getElementById("status");
    const game = document.getElementById("game");
    let score = 0;
    const scoreBox = document.createElement("div");
    scoreBox.style.display = "flex";
    scoreBox.style.justifyContent = "center";
    scoreBox.style.alignItems = "center";
    // Set the initial position of the player
    const startPosition = {
        x: player.offsetLeft,
        y: player.offsetTop
    };

    scoreBox.id = "scoreBox";
    document.body.appendChild(scoreBox);

    let hasWon = false; // boolean flag to track whether player has won or not
    let gameOver = false; // boolean flag to track whether the game is over or not

    player.addEventListener("mouseup", function () {
        addBoundaries();
        addWin();
        resetWalls();
        game.addEventListener("mouseleave", function () {
            if (!hasWon && !gameOver) { // only show "CHEATER" message if player has not won and the game is not over
                status.innerHTML = "CHEATER!";
                for (let i = 0; i < boundaries.length; i++) {
                    boundaries[i].style.backgroundColor = "red";
                }
                score -= 10;
                scoreBox.innerHTML = score;
                console.log(score);
                gameOver = true;
                resetPlayer();
            }
        });
    });

    // add mouseover event listener to each boundary element
    function addBoundaries() {
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].addEventListener("mouseover", function () {
                if (!hasWon && !gameOver) { // only change color of boundaries to red if player has not won and the game is not over
                    status.innerHTML = "You LOST! retry by moving your mouse over the 'S'";
                    for (let i = 0; i < boundaries.length; i++) {
                        boundaries[i].style.backgroundColor = "red";
                    }
                    score -= 10;
                    scoreBox.innerHTML = score;
                    console.log(score);
                    gameOver = true;
                    resetPlayer();
                }
            });
        }
    }

    //winning situation
    function addWin() {
        end.addEventListener("mouseover", function () {
            if (!hasWon && !gameOver) { // only update score and status message if player has not won and the game is not over
                hasWon = true;
                status.innerHTML = "You WON!";
                score += 5;
                scoreBox.innerHTML = score;
                console.log(score);
                gameOver = true;
                resetPlayer();
            }
        });
    }

    function resetWalls() {
        status.innerHTML = "Move your mouse towards the end";
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "#eee";
        }
        hasWon = false;
        gameOver = false; // reset the gameOver flag
    }

    function resetPlayer() {
        player.style.left = startPosition.x + "px";
        player.style.top = startPosition.y + "px";
        gameStarted = false; // reset the gameStarted flag
    }


    let gameStarted = false;

    player.addEventListener("mousedown", function () {
        gameStarted = true;
    });

    game.addEventListener("mousemove", function (event) {
        if (!gameStarted) {


            return; // Don't update player position if game has not started
        }

        // Get the offset of the game element
        const rect = game.getBoundingClientRect();

        // Subtract the offset from the mouse position


        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Update the position of the player to match the position of the cursor
        player.style.left = x + "px";
        player.style.top = y + "px";
    });


}, false);
