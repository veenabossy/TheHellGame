var characterX = 0;
var characterY = 0
var zombieIdleX = 0;
var zombieIdleY = 0;
var zombieRunX = 0;
var zombieAttackX = 0;
var animateVikingId = 0;
var viking = document.getElementById("character");
var vikingMarginTop = 50;
var vikingJumped = false;
var vikingMarginLeft = -500;
var vikingRunLeftAnimationId = 0;
var vikingRunRightAnimationId = 0;
var vikingAttacked = false;
var background = document.getElementById("bg");
var backgroundPosition = 0;
var vikingRunRightStatus = false;
var vikingRunLeftStatus = false;
var characterJumpId = 0;
var leftEnd = false;
var rightEnd = false;
var rightKeyIsPressing = false;
var leftKeyIsPressing = false;
var animateWalkZombieId = 0;
var zombie1 = document.getElementById("zombie1");
var zombie1MarginLeft = 1000;
var zombie1WalkAnimationId = 0;
var zombieUrl;
var zombieAttack1AnimationId = 0;
var difference = zombie1MarginLeft - vikingMarginLeft;
var attackStatus = 0;
var zombieHealth = 150;
var vikingHealth = 250;
var zombieWalkStatus = false;
var score = 0;
var scoreStatus = false;
var scoreTag = document.getElementById("scoreTag");
var zombieHealthTag = document.getElementById("marginZombie");
var zombieWithViking = false;
var checkingHealthViking;
var checkingHealthZombie;
var zombieDeadCompleteCheck;
var decreasingVikingHealth;
var zombieAttack = 0;
var outerMarginViking = document.getElementById("outerMarginViking");
var outerMarginZombie = document.getElementById("outerMarginZombie");
var scoreId1;
var removeId;
var big = document.getElementById("big");
var musicStatus = false;
var music = new Audio("sounds/Monster 3.mp3");
var dieMan = new Audio("sounds/Dying Man Groan 2.mp3");

function start() {



    if (window.innerWidth - 1650 >= vikingMarginLeft + 500) {
        if (leftKeyIsPressing == true) {
            clearInterval(scoreId1);
            scoreStatus = false;
        }
    }

    scoreStart();

    zombieWalk();
    checkingHealthViking = setInterval(function() {

        if (vikingHealth <= 0) {
            vikingDeadAnimation();
        }
    }, 100);
    zombieHealthCheck();

    attackStatusCheck();


    viking.style.backgroundImage = "url('sprite/elf2.png')";
    zombieUrl = "url('sprite/warrior 2/walk.png')";
    zombie1.style.backgroundImage = zombieUrl;

    animateVikingId = setInterval(function() {
        console.log(leftEnd);
        characterX = characterX - 1500;
        if (characterX <= -15001) {
            characterX = 0;
        }
        viking.style.backgroundPositionX = characterX + "px";
    }, 100)

    animateWalkZombieId = setInterval(function() {
        //alert(zombieIdleX, zombieIdleY);
        console.log();
        zombieIdleX = zombieIdleX - 500;
        zombie1.style.backgroundPositionX = zombieIdleX + "px";
        if (zombieIdleX == -3000) {
            zombieIdleX = 0;
            zombieIdleY = zombieIdleY - 400;
            zombie1.style.backgroundPositionY = zombieIdleY + "px";
        }
    }, 100);


}

document.body.addEventListener('keypress', function(e) {

    if (vikingJumped == false) {
        if (e.which == 32) {
            vikingJumped = true
            characterY = 3150.24;
            viking.style.backgroundPositionY = characterY + "px";
            characterX = 0;

            characterJumpId = setInterval(function() {

                if (characterX == -1500) {
                    viking.style.marginTop = vikingMarginTop + "px";
                }

                if (characterX == -3000) {

                    vikingMarginTop = vikingMarginTop - 1.5;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -4500) {

                    vikingMarginTop = vikingMarginTop - 1;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -6000) {

                    vikingMarginTop = vikingMarginTop - 0.9;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -7500) {

                    vikingMarginTop = vikingMarginTop - 0.5;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -9000) {

                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -10500) {
                    vikingMarginTop = vikingMarginTop + 1.8;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -12000) {

                    vikingMarginTop = vikingMarginTop + 2;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -13500) {
                    vikingMarginTop = vikingMarginTop + 0.9;
                    viking.style.marginTop = vikingMarginTop + "px";
                }
                if (characterX == -15000) {
                    vikingMarginTop = 100;
                    viking.style.marginTop = vikingMarginTop + "px";
                    characterY = 0;
                    viking.style.backgroundPositionY = characterY + "px";
                    clearInterval(characterJumpId);
                    vikingJumped = false
                }
            }, 0.01)

        }
    }
})



function vikingRunAnimationRight() {
    if (vikingRunRightStatus == false) {
        if (vikingJumped == false) {
            characterY = 4725.42;
            viking.style.backgroundPositionY = characterY + "px";
            viking.style.transform = "scale(0.6)";
            vikingRightRun();
            vikingRunRightStatus = true;
        }
    }
}

function vikingRightRun() {
    clearInterval(vikingRunLeftAnimationId);
    if (rightEnd == false) {
        vikingRunRightAnimationId = setInterval(function() {
            vikingMarginLeft = vikingMarginLeft + 1;
            viking.style.marginLeft = vikingMarginLeft + "px";

        }, 0.1);
    }
}


function vikingRunAnimationLeft() {
    if (vikingRunLeftStatus == false) {
        if (vikingJumped == false) {
            characterY = 4725.42;
            viking.style.backgroundPositionY = characterY + "px";
            viking.style.transform = "scale(-0.6,0.6)";
            vikingLeftRun();
            vikingRunLeftStatus = true;
        }
    }

}

function vikingLeftRun() {
    clearInterval(vikingRunRightAnimationId);
    vikingRunLeftAnimationId = setInterval(function() {
        vikingMarginLeft = vikingMarginLeft - 1;
        viking.style.marginLeft = vikingMarginLeft + "px";

    }, 0.1);

}

function vikingAttackAnimation() {
    if (vikingJumped == false) {
        vikingAttacked = true;
        characterY = 1575.14;
        viking.style.backgroundPositionY = characterY + "px";
        if (zombieWithViking == true) {
            zombieHealth = zombieHealth - 1;
            zombieHealthTag.style.width = zombieHealth + "px";
        }
    }
}

document.body.addEventListener("keydown", function(e) {
    var x = e.which;

    if (x == 88) {
        vikingAttackAnimation();
    }

    if (x == 68) {
        vikingRunAnimationRight();
        rightKeyIsPressing = true;
    }
    if (x == 65) {
        vikingRunAnimationLeft();
        leftKeyIsPressing = true;
    }

})

document.body.addEventListener("keyup", function(e) {
    var x = e.which;

    if (x == 68) {
        characterY = 0;
        viking.style.backgroundPositionY = "0px";
        clearInterval(vikingRunRightAnimationId);
        vikingRunRightStatus = false;
        rightKeyIsPressing = false;
        if (scoreStatus == false) {
            scoreStart();
        }
        if (zombieWalkStatus == false) {
            zombieWalk();
        }


    }

    if (x == 65) {
        characterY = 0;
        viking.style.backgroundPositionY = "0px";
        clearInterval(vikingRunLeftAnimationId);
        vikingRunLeftStatus = false;
        leftKeyIsPressing = false;
    }
    if (x == 88) {
        characterY = 0;
        viking.style.backgroundPositionY = "0px";
    }

})

setInterval(function() {
    if (window.innerWidth - 400 <= vikingMarginLeft + 500) {
        if (rightKeyIsPressing == true) {
            rightEnd = true;
            backgroundPosition = backgroundPosition - 0.2;
            background.style.backgroundPositionX = backgroundPosition + "px";
            clearInterval(vikingRunRightAnimationId);
            vikingRunRightStatus = false;
        }
    } else {
        rightEnd = false;
    }
}, 0.1)

setInterval(function() {
    if (window.innerWidth - 1650 >= vikingMarginLeft + 500) {
        if (leftKeyIsPressing == true) {
            clearInterval(scoreId1);
            scoreStatus = false;
            clearInterval(zombie1WalkAnimationId);
            zombieWalkStatus = false;
            leftEnd = true;
            backgroundPosition = backgroundPosition + 0.2;
            background.style.backgroundPositionX = backgroundPosition + "px";
            clearInterval(vikingRunLeftAnimationId);
            vikingRunLeftStatus = false;
        }
    } else {
        leftEnd = false;
    }
}, 0.1)

function zombieAttackAnimation() {

    zombieIdleY = 0;
    zombie1.style.backgroundPositionY = zombieIdleY + "px";
    zombieIdleX = 0;
    zombie1.style.backgroundPositionX = zombieIdleX + "px";
    clearInterval(attackStatus);
    clearInterval(zombie1WalkAnimationId);
    zombieUrl = "url('sprite/warrior 2/Attack0" + zombieAttack + ".png')";
    zombie1.style.backgroundImage = zombieUrl;
    var f = document.getElementById("marginViking");

    decreasingVikingHealth = setInterval(function() {

        vikingHealth = vikingHealth - 30;
        f.style.width = vikingHealth + "px";
    }, 1500);
    zombieHealthCheck();
}


function zombieWalk() {
    zombieWalkStatus = true;
    zombie1WalkAnimationId = setInterval(function() {
        zombie1.style.transform = "scaleX(-1)";
        zombie1MarginLeft = zombie1MarginLeft - 0.3;
        zombie1.style.marginLeft = zombie1MarginLeft + "px";
    }, 0.1);
    clearInterval(zombieDeadCompleteCheck);
}


function scoreStart() {
    scoreStatus = true;
    scoreId1 = setInterval(function() {
        score = score + 10;
        scoreTag.innerHTML = "Score:" + score;
    }, 500);
}

function zombieDeadAnimation() {

    if (musicStatus == false) {
        music.play();
        musicStatus = true;
    }




    zombieWithViking = false;
    clearInterval(checkingHealthZombie);
    zombieIdleY = 0;
    zombieIdleX = 0;
    zombieUrl = "url('sprite/warrior 2/Die.png')";
    zombie1.style.backgroundImage = zombieUrl;
    zombieDeadForSure = true;


    zombieDeadCompleteCheck = setInterval(function() {

        if (zombieIdleX >= -2998 && zombieIdleY >= -3198) {
            zombieWalk();
            zombie1WalkAnimation();
            zombie1MarginLeft = 1400;
            zombie1.style.marginLeft = zombie1MarginLeft;
        }
    }, 10)
    clearInterval(decreasingVikingHealth);

}

function vikingDeadAnimation() {
    dieMan.play();
    clearInterval(checkingHealthViking);
    characterX = 0;
    characterY = 0;
    characterY = -4725.42;
    viking.style.backgroundPositionY = characterY + "px";
    removeId = setInterval(function() {
        if (characterX <= -14999) {
            dieMan.pause();
            remove();
        }
    }, 1);


}


function zombie1WalkAnimation() {
    zombieUrl = "url('sprite/warrior 2/walk.png')";
    zombie1.style.backgroundImage = zombieUrl;
    zombieHealth = 150;
    zombieHealthTag.style.width = zombieHealth + "px";
    attackStatusCheck();
}


function attackStatusCheck() {
    if (zombieAttack == 4) {
        zombieAttack = 0;
    }
    zombieAttack = zombieAttack + 1;

    attackStatus = setInterval(function() {
        if (parseInt(zombie1MarginLeft - vikingMarginLeft) <= 600) {
            zombieWithViking = true;
            zombieAttackAnimation();
        }
    }, 0.1)
}


function zombieHealthCheck() {
    checkingHealthZombie = setInterval(function() {
        if (zombieHealth <= 0) {
            zombieDeadAnimation();
        }
    }, 100);
}


function remove() {
    clearInterval(removeId);
    viking.remove();
    zombie1.remove();
    zombieHealthTag.remove();
    background.style.filter = "blur(3px)";
    outerMarginZombie.remove();
    outerMarginViking.remove();
    clearInterval(scoreId1);
    scoreTag.remove();

    n = document.createElement("div");
    big.appendChild(n);
    n.className = "n";


    var span = document.createElement('span');
    span.style.fontSize = "50px";
    n.appendChild(span);
    span.innerHTML = "score: " + score;

    var a = document.createElement('a');
    a.innerHTML = "Retry";
    a.setAttribute('href', 'G:\java project final\my project\game\index.html');
    n.appendChild(a);
}


var n;
var f;