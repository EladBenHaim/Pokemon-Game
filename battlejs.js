var checkPauseCounter = 0;
var oponentAttack;
var oponentHP;
var playerAttack;
var playerHP;
var oponentDefence;
var playerDefence;
var checkRandomDone = 0;
var xPlayer = 0;
var xOponent = 0;
var stopIntervalPlayer = 0;
var stopIntervalOponent = 0;
var PlayerDie = 0;
var OponentDie = 0;
var arrowsCounter = 1;
var attackCalculate;
var currentAttackPlayer;
var currentAttackOponent;
var tmp;
function arrowsInterval() {
    document.getElementById("lastAttackTD").style.display = "none";
    document.getElementById("powerAttack").style.display = "block";
    for (var i = 0; i < 4; i++) {
        if ((pokemon[localStorage.getItem("pokemonToSend")].type[i]) != null) {
            if (pokemon[localStorage.getItem("pokemonToSend") - 1].type[i] != null) {
                document.getElementById("attackBtn" + (i + 1)).innerText = pokemon[localStorage.getItem("pokemonToSend") - 1].type[i] + " ATK";
                if (pokemon[localStorage.getItem("pokemonToSend")].type[i] != null)
                    document.getElementById("attackBtn" + (i + 1)).style.display = "block";
            }
        }
    }
    document.getElementById("setBtn").style.display = "none";
    arrowsTimer = setInterval("runningArrows()", 100);
}
function runningArrows() {
    for (var i = 1; i < 9; i++) {
        if (arrowsCounter == i) {
            document.getElementById("arrow_" + i).style.display = "block";
            attackCalculate = i;

        }
        else {
            document.getElementById("arrow_" + i).style.display = "none";
        }
    }

    if (arrowsCounter == 8) {
        arrowsCounter = 1;
    }
    else {
        arrowsCounter++;
    }

}

function moveElementPlayer() {


    document.getElementById("attackGifPlayer").style.display = "block";
    setPauseInterval2 = setInterval("checkSetPause2()", 33);
    oponentAttackFunc();
    moveClockPlayer = setInterval("moveElementPlayer2()", 50);

}

var hideGifPlayer = 0;
function gifTimerPlayerHide() {
    hideGifPlayerTime = setInterval("calculateTime()", 100);
}

function calculateTime() {
    hideGifPlayer++;
    if (hideGifPlayer > 6) {
        document.getElementById("attackGifPlayer").style.display = "none";
    }
}

function checkIFPlayerDie() {
    catchPokemon();
    gifTimerPlayerHide();

    clearInterval(setPauseInterval);
    clearInterval(setPauseInterval2);
    playerHP = 0;
    document.getElementById("returnToCatch").style.display = "none";
    document.getElementById("playerHPAmount").innerHTML = playerHP;
    swal({
        title: "Not Good Enough!",
        text: "Choose - Rematch OR Catch More POKEMONS",
        icon: "error",

        buttons: ["Rematch", "Go Home"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                window.location.href = "POKEMON.html";

            }
            else {
                window.location.href = "battle.html"
            }
        });

}

function oponentAttackFunc() {
    randomPowerOponent = Math.floor(Math.random() * 8) + 1;
    var totalPower;
    if ((randomPowerOponent >= 4) && (randomPowerOponent != 8) && (randomPowerOponent != 7)) {
        totalPower = 6;
    }
    else {
        totalPower = randomPowerOponent;
    }
    playerHP = Math.floor(playerHP - (oponentAttack / 10) * (totalPower / 3));
    if (playerHP <= 0) {
        playerHP = 0;
        checkIFPlayerDie();
    }
    currentAttackOponent = Math.floor((oponentAttack / 10) * (totalPower / 3));
    document.getElementById("lastAttackTD2").innerHTML = "LAST ATTACK " + currentAttackOponent;
    document.getElementById("playerHPAmount").innerHTML = playerHP;
}

function moveElementPlayer2() {
    stopIntervalPlayer += 1;

    if (stopIntervalPlayer >= 15) {
        document.getElementById("attackGifPlayer").style.display = "none";
        clearInterval(moveClockPlayer);
        stopIntervalPlayer = 0;
        return;
    }
    if (xPlayer == 0) {
        document.getElementById('playerPokemon').style.top = "111%";
        document.getElementById('playerPokemon').style.left = "8%";
        xPlayer = 1;
        return;
    }
    if (xPlayer == 1) {

        document.getElementById('playerPokemon').style.top = "110%";
        document.getElementById('playerPokemon').style.left = "7%";
        xPlayer = 2;
        return;
    }

    if (xPlayer == 2) {
        document.getElementById('playerPokemon').style.top = "111%";
        document.getElementById('playerPokemon').style.left = "8%";
        xPlayer = 3;
        return;
    }

    if (xPlayer == 3) {

        document.getElementById('playerPokemon').style.top = "110%";
        document.getElementById('playerPokemon').style.left = "7%";
        xPlayer = 0;
        return;
    }
}
function catchPokemon() {
    if (sessionStorage.getItem("pageLoad") != null) {
        sessionStorage.removeItem("pageLoad");
    }
    sessionStorage.setItem("pageLoad", true);
}
function checkSetPause2() {
    if (playerHP > 0) {
        checkPauseCounter++;
        if (checkPauseCounter > 15) {
            checkPauseCounter = 0;
            clearInterval(setPauseInterval2);
            document.getElementById("setBtn").style.display = "block";

        }
    }
}

function checkSetPause() {
    if (oponentHP > 0) {
        checkPauseCounter++;
        if (checkPauseCounter > 15) {
            checkPauseCounter = 0;
            clearInterval(setPauseInterval);
            moveElementPlayer();
        }
    }
}
function moveElementOponent() {
    document.getElementById("powerAttack").style.display = "none";
    clearInterval(arrowsTimer);
    for (var i = 1; i < 5; i++) {
        document.getElementById("attackBtn" + i).style.display = "none";
    }
    playerAttackFunc();
    moveClockOponent = setInterval("moveElementOponent2()", 50);
    document.getElementById("attackGifOponent").style.display = "block";
}

function checkIFOponentDie() {
    clearInterval(setPauseInterval);
    clearInterval(setPauseInterval2);
    oponentHP = 0;
    document.getElementById("oponentHPAmount").innerHTML = 0;
    document.getElementById("returnToCatch").style.display = "none";
    document.getElementById('winBattleMusic').muted = false;
    document.getElementById('winBattleMusic').play();
    catchPokemon();
    swal("Good job!", "You Won!", "success")
        .then((willDelete) => {
            if (willDelete) {

                window.location.href = "POKEMON.html";

            }
        });


}
function playerAttackFunc() {
    oponentHP = Math.floor(oponentHP - (playerAttack / 10) * (attackCalculate / 3));
    if (oponentHP <= 0) {
        oponentHP = 0;
        checkIFOponentDie();
    }
    currentAttackPlayer = Math.floor((playerAttack / 10) * (attackCalculate / 3));
    document.getElementById("lastAttackTD").style.display = "block";
    document.getElementById("lastAttackTD").innerHTML = "LAST ATTACK " + currentAttackPlayer;
    document.getElementById("oponentHPAmount").innerHTML = oponentHP;
    setPauseInterval = setInterval("checkSetPause()", 73);

}

function moveElementOponent2() {
    stopIntervalOponent += 1;
    if (stopIntervalOponent >= 15) {
        document.getElementById("attackGifOponent").style.display = "none";
        clearInterval(moveClockOponent);
        stopIntervalOponent = 0;
        return;
    }
    if (xOponent == 0) {
        document.getElementById('oponentPokemon').style.top = "200%";
        document.getElementById('oponentPokemon').style.right = "80%";
        xOponent = 1;
        return;
    }
    if (xOponent == 1) {
        document.getElementById('oponentPokemon').style.top = "201%";
        document.getElementById('oponentPokemon').style.right = "81%";
        xOponent = 2;
        return;
    }

    if (xOponent == 2) {
        document.getElementById('oponentPokemon').style.top = "200%";
        document.getElementById('oponentPokemon').style.right = "80%";
        xOponent = 3;
        return;
    }

    if (xOponent == 3) {
        document.getElementById('oponentPokemon').style.top = "201%";
        document.getElementById('oponentPokemon').style.right = "81%";
        xOponent = 0;
        return;
    }
}

function loadBattle() {

    var pokemonRandom = localStorage.getItem("randomPokemon");
    tmp = localStorage.getItem("pokemonToSend").split('0');
    if (tmp[1] > 9 && tmp[1] < 100) {
        localStorage.removeItem("pokemonToSend");
        localStorage.setItem("pokemonToSend", tmp[1]);
    }


    if (pokemonRandom < 100 && pokemonRandom > 9) {
        document.getElementById("oponentPokemon").src = "images/0" + pokemonRandom + ".png";
    }
    else {
        document.getElementById("oponentPokemon").src = "images/" + pokemonRandom + ".png";
    }
    var x = parseInt(localStorage.getItem("pokemonToSend"), 10);
    if (x < 100 && x > 9) {
        document.getElementById("playerPokemon").src = "images/0" + localStorage.getItem("pokemonToSend") + ".png";
    }
    else {
        document.getElementById("playerPokemon").src = "images/" + localStorage.getItem("pokemonToSend") + ".png";
    }
    oponentAttack = pokemon[pokemonRandom - 1].base.Attack;
    oponentDefence = pokemon[pokemonRandom - 1].base.Defense;
    oponentHP = pokemon[pokemonRandom - 1].base.HP;
    playerAttack = pokemon[localStorage.getItem("pokemonToSend") - 1].base.Attack;
    playerDefence = pokemon[localStorage.getItem("pokemonToSend") - 1].base.Defense;
    playerHP = pokemon[localStorage.getItem("pokemonToSend") - 1].base.HP;

    document.getElementById("oponentHPAmount").innerHTML = oponentHP;
    document.getElementById("playerHPAmount").innerHTML = playerHP;
    document.getElementById("oponentAttack").innerHTML = "ATTACK " + oponentAttack;
    document.getElementById("playerAttack").innerHTML = "ATTACK " + playerAttack;

}

function returnToHome() {
    catchPokemon();
    swal({
        title: "Are you sure?",
        text: "You will end the match and return to HOME",
        icon: "warning",
        buttons: ['Stay Fight', 'Yes, I am sure!'],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                window.location.href = "POKEMON.html";

            }
        });
}
