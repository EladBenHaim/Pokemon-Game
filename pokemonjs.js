var tmp4;
var checkMusic = 0;
var startCorX;
var startCorY;
var endCorX;
var endCorY;
var lastRandNum, tRandum, lRandum;
var randNum;
var startX;
var startY;
var k;
var firstChange = 0;
var pokemonHasCatched;
var pokemonToSendToBattle;

function startCor() {
    startX = document.getElementById('pokeball').offsetLeft;
    startY = document.getElementById('pokeball').offsetTop;

}

function getCor(e) {
    startCorX = document.getElementById('pokeball').offsetLeft;
    startCorY = document.getElementById('pokeball').offsetTop;
    document.getElementById("pokemonToBattleChoose").style.display = "none";


}

function getDragCor(e) {
    if (firstChange == 0) {
        firstChange = 1;
        document.getElementById("swipeUp").style.display = "none";

    }

    var dragx;
    var dragy;
    dragx = e.pageX;
    dragy = e.pageY;
    pokeballEl = document.getElementById("pokeball");
    X = startCorX;
    Y = startCorY;
    endCorX = dragx;
    endCorY = dragy;
    if (X == endCorX) {
        X += 0.1;
    }
    dt = 20;
    Vx = -(X - endCorX) / 1000; // pixels per milisecondsecond
    Vy = (endCorY - Y) / 1000;
    h = setInterval("movePokeball(h)", dt);
    clearInterval(h2);
}

function movePokeball(h) {
    X = X + Vx * dt;
    Y = Y + Vy * dt;
    pokeballEl.style.left = X + "px";
    pokeballEl.style.top = Y + "px";
    if (Y <= endCorY) {
        clearInterval(h);
        catchPokemon();
        pokeballEl.style.left = startX + "px";
        pokeballEl.style.top = startY + "px";
    }
}

function generalClock() {

    document.getElementById('startMusic').muted = true;
    document.getElementById("catchAll").style.display = "none";
    h2 = setInterval("showPoke()", 1000);
    startCor();
    document.getElementById("pokeball").style.display = "block";
    document.getElementById("pokemonMenu").style.display = "inherit";
    document.getElementById("swipeUp").style.display = "block";
    document.getElementById("play").style.display = "none";
    for (var i = 0; i < 7; i++) {
        if (localStorage.getItem('pokemon' + i) != null) {
            if (JSON.parse(localStorage.getItem('pokemon' + i)).id < 100 && JSON.parse(localStorage.getItem('pokemon' + i)).id > 9) {
                document.getElementById("pokemon_" + (i + 1)).src = 'images/0' + JSON.parse(localStorage.getItem('pokemon' + i)).id + '.png';
            }
            else {
                document.getElementById("pokemon_" + (i + 1)).src = 'images/' + JSON.parse(localStorage.getItem('pokemon' + i)).id + '.png';
            }
        }
    }
}

function showPoke() {
    document.getElementById('body1').src = "";
    k = Math.floor(Math.random() * 59) + 1;
    if (k < 100 && k > 9) {
        k = '0' + k;
    }
    document.getElementById('body1').src = 'images/' + k + '.png';
    tRandum = Math.floor(Math.random() * 400) + 100;
    lRandum = Math.floor(Math.random() * 1200);
    document.getElementById('body1').style = "display:block;height:110px;width:110px;top:" + tRandum + "px;left:" + lRandum + "px;position:absolute;";

}
function catchPokemon() {

    if ((endCorY >= tRandum - 55 && endCorY <= tRandum + 55) && (endCorX >= lRandum - 100 && endCorX <= lRandum + 100) && document.getElementById('body1').style.display == 'block') {
        document.getElementById('body1').style.display = "none";
        document.getElementById("catchedPoke").style.display = "block";
        document.getElementById('body2').style = "background-image:url(images/bg/bgcatchpokeball.png);background-size:cover;background-repeat:no-repeat;height:100%;position:sticky;";
        changeGif();
        document.getElementById('bgSound').muted = true;
        document.getElementById('catchPokeSuccess').muted = false;
        document.getElementById('catchPokeSuccess').play();
        document.getElementById("continueCatching").style.display = "block";
        document.getElementById("pokeball").style.display = "none";
        document.getElementById('pokemonCatchedImage').src = document.getElementById('body1').src;
        document.getElementById('pokemonCatchedImage').style.display = 'block';
        document.getElementById('pokemonCatchedDiv').style.display = 'block';
        document.getElementById('addToPokemons').style.display = 'block';


    }
    else {

        document.getElementById("pokeball").style.display = "none";
        document.getElementById("tryAgain").style.display = "block";
    }

}

function continueCatch() {
    document.getElementById("pokemonToBattleChoose").style.display = "none";
    if (checkMusic == 1) {

        document.getElementById('bgSound').play();
        document.getElementById('bgSound').muted = false;
    }

    document.getElementById("startBattleTD").style.display = "block";
    if (chnageGifcheck != 0) {
        clearInterval(chnageGifcheck);
    }
    changeGifdid = 0;
    counterChagneGif = 0;
    changeGifdid = 0;
    document.getElementById("catchedPoke").src = "images/bg/pokeballopen.gif";
    document.getElementById("arrow").style.display = 'none';
    document.getElementById("plsChangePokemon").style.display = "none";
    document.getElementById("pokeball").style.display = "block";
    document.getElementById("tryAgain").style.display = "none";
    document.getElementById("catchedPoke").style.display = "none";
    document.getElementById('body2').style = "background-image:url(images/bg/bgimg5.png);background-size:cover;background-repeat:no-repeat;height:100%;position:sticky;";

    document.getElementById("continueCatching").style.display = "none";
    h2 = setInterval("showPoke()", 1000);
    document.getElementById('pokemonCatchedImage').style.display = 'none';
    document.getElementById('pokemonCatchedDiv').style.display = 'none';
    document.getElementById('addToPokemons').style.display = 'none';
    document.getElementById("pokeball").style.left = "45%";
    document.getElementById("pokeball").style.top = "900%";
}
function onOffMusic() {

    if (document.getElementById('bgSound').muted == false) {
        checkMusic = 0;
        document.getElementById('bgSound').muted = true;
        document.getElementById('imgSoundUnmute').style.display = 'block';
        document.getElementById('imgSoundMute').style.display = 'none';

    }
    else {
        checkMusic = 1;
        document.getElementById('bgSound').muted = false;
        document.getElementById('imgSoundUnmute').style.display = 'none';
        document.getElementById('imgSoundMute').style.display = 'block';

    }
}

function catchSuccess() {
    document.getElementById('bgSound').muted = true;
    document.getElementById('catchPokeSuccess').muted = false;
    document.getElementById('catchPokeSuccess').play();
}

function choosePokemon(el1) {

    var el2;
    var strpok = "pokemon_";
    var strslct = "_select";
    var tmpSTR;

    el2 = el1 + "_select";
    for (var i = 1; i < 8; i++) {
        if (el2 == strpok + i + strslct) {
            if (document.getElementById(el2).style.backgroundColor == "greenyellow") {
                document.getElementById(el2).style.background = "none";
            }
            else {

                if (document.getElementById(strpok + i).src != document.getElementById("checkImage").src) {
                    document.getElementById(el2).style.background = "greenyellow";
                    pokemonToSendToBattle = document.getElementById(strpok + i).src;
                    document.getElementById("pokemonToBattleChoose").style.display = "none";
                }
            }
        }
        else {

            tmpSTR = strpok + i + strslct;
            document.getElementById(tmpSTR).style.background = "none";
        }
    }



    var tmp2 = pokemonToSendToBattle.split("/");

    var tmp3 = tmp2[tmp2.length - 1].split(".");

    tmp4 = tmp3[0];
}
var pokemonTmp;
var pokemonReplace;
var countYellow = 0;

var counterAddPokemon = localStorage.getItem('counterAddPokemon');
if (localStorage.getItem('counterAddPokemon') === null) {
    localStorage.setItem('counterAddPokemon', 0);
    counterAddPokemon = 0;
}

function addPokemon() {
    document.getElementById("pokemonToBattleChoose").style.display = "none";
    pokemonTmp = pokemon[k - 1];
    if (localStorage.getItem('counterAddPokemon') < 7) {
        localStorage.setItem('pokemon' + localStorage.getItem('counterAddPokemon'), JSON.stringify(pokemonTmp));
        counterAddPokemon++;
        localStorage.removeItem('counterAddPokemon');
        localStorage.setItem('counterAddPokemon', counterAddPokemon);
        if (pokemonTmp.id < 100 && pokemonTmp.id > 9) {
            document.getElementById("pokemon_" + localStorage.getItem('counterAddPokemon')).src = 'images/0' + pokemonTmp.id + '.png';
            document.getElementById("addToPokemons").style.display = 'none';
        }
        else {
            document.getElementById("pokemon_" + localStorage.getItem('counterAddPokemon')).src = 'images/' + pokemonTmp.id + '.png';
            document.getElementById("addToPokemons").style.display = 'none';
        }
    }
    else {
        for (var i = 0; i < 7; i++) {
            if (document.getElementById("pokemon_" + (i + 1) + "_select").style.backgroundColor == "greenyellow") {
                countYellow++;
            }
        }
        if (countYellow == 0) {
            pokemonTmp = pokemon[k + 1];
        }
        document.getElementById("arrow").style.display = 'block';
        document.getElementById("plsChangePokemon").style.display = "block";
        document.getElementById("startBattleTD").style.display = "none";
        for (var i = 0; i < 7; i++) {
            if (document.getElementById("pokemon_" + (i + 1) + "_select").style.backgroundColor == "greenyellow") {
                if (pokemonTmp.id < 100 && pokemonTmp.id > 9) {
                    localStorage.removeItem('pokemon' + i);
                    localStorage.setItem('pokemon' + i, JSON.stringify(pokemonTmp));
                    document.getElementById("pokemon_" + (i + 1)).src = 'images/0' + JSON.parse(localStorage.getItem('pokemon' + i)).id + '.png';
                    document.getElementById("addToPokemons").style.display = 'none';
                    document.getElementById("arrow").style.display = 'none';
                    document.getElementById("plsChangePokemon").style.display = "none";
                    document.getElementById("startBattleTD").style.display = "block";
                }
                else {
                    localStorage.removeItem('pokemon' + i);
                    localStorage.setItem('pokemon' + i, JSON.stringify(pokemonTmp));
                    document.getElementById("arrow").style.display = 'none';
                    document.getElementById("plsChangePokemon").style.display = "none";
                    document.getElementById("pokemon_" + (i + 1)).src = 'images/' + JSON.parse(localStorage.getItem('pokemon' + i)).id + '.png';
                    document.getElementById("addToPokemons").style.display = 'none';
                    document.getElementById("startBattleTD").style.display = "block";
                }

            }
        }

    }


    for (var i = 1; i < 8; i++) {
        document.getElementById("pokemon_" + i + "_select").style.background = "none";
    }
}

function hideAll() {
    if ((performance.navigation.type == 1) || (sessionStorage.getItem("pageLoad"))) {
        generalClock();
        if (sessionStorage.getItem("pageLoad") != null) {
            sessionStorage.removeItem("pageLoad");
        }
        sessionStorage.setItem("pageLoad", true);
    }
    else {
        document.getElementById("pokeball").style.display = "none";
        document.getElementById("pokemonMenu").style.display = "none";
        document.getElementById('startMusic').play();
        document.getElementById('startMusic').muted = false;
        document.getElementById('startMusic').autoplay = true;
        document.getElementById('startMusic').load();
    }

}

function beepPlay() {
    document.getElementById('beepSound').muted = false;
    document.getElementById('beepSound').play();
}

function goBattle() {
    var checkThesSelect = 0;
    for (var i = 1; i < 8; i++) {
        if (document.getElementById("pokemon_" + i + "_select").style.backgroundColor == "greenyellow") {
            checkThesSelect = 1;

        }
    }

    if (checkThesSelect == 0) {
        document.getElementById("startBattle").href = "#";
        document.getElementById("pokemonToBattleChoose").style.display = "block";
        return;
    }

    if (tmp4 > 0) {
        document.getElementById("startBattle").href = "battle.html";
        if (localStorage.getItem('pokemonToSend') === null) {
            localStorage.setItem('pokemonToSend', tmp4);
        }
        else {
            localStorage.removeItem('pokemonToSend');
            localStorage.setItem('pokemonToSend', tmp4);
        }
        randomPokemon = Math.floor(Math.random() * 809) + 1;

        if (localStorage.getItem("randomPokemon") === null) {
            localStorage.setItem("randomPokemon", Math.floor(Math.random() * 809) + 1);
        }
        else {
            localStorage.removeItem("randomPokemon");
            localStorage.setItem("randomPokemon", Math.floor(Math.random() * 809) + 1);
        }
    }
    else {
        document.getElementById("startBattle").href = "#";
    }
}

var counterChagneGif = 0;
var changeGifdid = 0, chnageGifcheck;
function changeGif() {
    chnageGifcheck = setInterval("changeGif2()", 1);
}

function changeGif2() {
    counterChagneGif++;
    if ((counterChagneGif > 820) && (changeGifdid == 0)) {
        changeGifdid = 1;
        document.getElementById("catchedPoke").src = "images/bg/1234.gif";

    }
    if (counterChagneGif > 1280) {
        document.getElementById("catchedPoke").src = "images/bg/catchpoke.jpg";
        clearInterval(chnageGifcheck);
        changeGifdid = 0;
        counterChagneGif = 0;
    }
}

