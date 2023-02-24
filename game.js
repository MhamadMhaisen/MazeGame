
document.addEventListener('DOMContentLoaded', function () {

    const boundaries = document.getElementsByClassName("boundary");
    const player = document.getElementById("start");
    const end = document.getElementById("end");
    const status = document.getElementById("status");
    const game = document.getElementById("game");
    let score = 0;
    const scoreBox = document.createElement("div");
    scoreBox.id = "scoreBox";
    document.body.appendChild(scoreBox);
    let gameFinished = false;


    player.addEventListener("mouseup", function () {
        addBoundaries();
        addWin();
        resetWalls();
        game.addEventListener("mouseleave", function () {

            status.innerHTML = "CHEATER!";
            for (let i = 0; i < boundaries.length; i++) {
                boundaries[i].style.backgroundColor = "red";
            }

        })

    })

    // add mouseover event listener to each boundary element
    function addBoundaries() {

        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].addEventListener("mouseover", function () {
                status.innerHTML = "You LOST! retry by moving your mouse over the 'S'";

                for (let i = 0; i < boundaries.length; i++) {
                    boundaries[i].style.backgroundColor = "red";
                }
            });

        }


    }
    //winning situation
    function addWin() {
        end.addEventListener("mouseover", function () {
            if (boundaries[0].style.backgroundColor != "red") {
                status.innerHTML = "You WON!"
                score += 5;
                console.log(score)
            }
        });
    }

    function resetWalls() {
        status.innerHTML = "Move your mouse towards the end"
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "#eee";
        }
    }
    scoreBox.innerHTML = score;

}, false);

