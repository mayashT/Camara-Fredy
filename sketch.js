var PLAY = 1;
var END = 0;
var gameState = PLAY;
var rex;
var terodac;
var piso;
var pisoInv;
var nube;
var cactuss;
var cactusGroup;
var nubeGroup;
var escore = 0;
var gameover;
var reiniciar;
var teroGroup;
var jump;
var crash;
var score;
var tierra;


function preload() {
    trex = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    suelo = loadImage("ground2.png");
    nubee = loadImage("cloud.png");
    cactus1 = loadImage("obstacle1.png");
    cactus2 = loadImage("obstacle2.png");
    cactus3 = loadImage("obstacle3.png");
    cactus4 = loadImage("obstacle4.png");
    cactus5 = loadImage("obstacle5.png");
    cactus6 = loadImage("obstacle6.png");
    rexx = loadAnimation("trex_collided.png");
    over = loadImage("gameOver.png");
    iniciar = loadImage("restart.png");
    tero1 = loadAnimation("tero1.png", "tero2.png");
    jump = loadSound("jump.mp3");
    crash = loadSound("die.mp3");
    score = loadSound("checkPoint.mp3");
    tierra2 = loadImage("tierra2.png");


}


function setup() {
    createCanvas(displayWidth, displayHeight);
    edges = createEdgeSprites();

    rex = createSprite(50, height / 2, 10, 10);
    rex.addAnimation("run", trex);
    rex.scale = 0.6;
    rex.addAnimation("die", rexx);

    piso = createSprite(200, height / 2, 400, 10);
    piso.addImage("ground,", suelo);
    piso.x = piso.width / 2;

    pisoInv = createSprite(200, height / 2, 400, 10);
    pisoInv.visible = false;

    tierra = createSprite(width - 200, 230, 10, 10);
    tierra.addImage("tierra", tierra2)
    tierra.scale = 0.3

    var rand = Math.round(random(1, 100));
    console.log(rand);
    var cadena = "hola";
    var cadena2 = "mundo";
    var cadena3 = " ";
    console.log(cadena + cadena3 + cadena2);

    cactusGroup = new Group();
    nubeGroup = new Group();

    rex.debug = false;
    rex.setCollider("circle", 0, 0, 40);
    gameover = createSprite(300, 100, 30, 30);
    gameover.addImage("fin", over);
    reiniciar = createSprite(300, 150, 30, 30);
    reiniciar.addImage("reinicio", iniciar);

    teroGroup = new Group();


}

function draw() {
    background("black");
    drawSprites();
    console.log(rex.y);
    rex.collide([pisoInv]);
    text("ecore" + escore, 20, 20);



    if (gameState === PLAY) {
        cloud();
        cactus();

        piso.velocityX = -(4 + 3 * escore / 100);

        camera.position.x = displayWidth / 2; // piso.x; 
        camera.position.y = rex.y; //displayHeight / 2

        reiniciar.visible = false;
        gameover.visible = false;

        if (escore > 0 && escore % 250 === 0) {
            score.play();
        }

        if (keyDown("space") && rex.y >= 150) {
            rex.velocityY = -15;
            jump.play();
        }

        if (frameCount % 150 === 0) {
            tero();
        }


        rex.velocityY = rex.velocityY + 0.5;

        if (piso.x < 0) {
            piso.x = piso.width / 2;
        }

        escore = escore + Math.round(getFrameRate() / 30);

        if (cactusGroup.isTouching(rex)) {
            gameState = END;
            crash.play();
        }
    } else if (gameState === END) {
        piso.velocityX = 0;
        cactusGroup.setVelocityXEach(0);
        nubeGroup.setVelocityXEach(0);
        rex.changeAnimation("die", rexx);
        rex.velocityY = 0;
        nubeGroup.setLifetimeEach(-1);
        cactusGroup.setLifetimeEach(-1);
        reiniciar.visible = true;
        gameover.visible = true;
        teroGroup.setVelocityXEach(0);
        teroGroup.setVelocityYEach(0);
        teroGroup.setLifetimeEach(-1)


        if (mousePressedOver(reiniciar)) {
            console.log("vaca")
            reset();
        }
    }
}

function cloud() {

    if (frameCount % 80 === 0) {
        nube = createSprite(width, random(130, 220), 30, 20);
        nubeGroup.add(nube);
        nube.addImage(nubee);
        nube.velocityX = -3;
        nube.lifetime = 500;
        nube.depth = rex.depth;
        rex.depth = rex.depth + 1;
    }
}

function cactus() {
    if (frameCount % 80 === 0) {
        cactuss = createSprite(width, height / 2, 10, 32);
        cactusGroup.add(cactuss);
        cactuss.velocityX = -(5 + 3 * escore / 100);
        var asar = Math.round(random(1, 6));
        switch (asar) {
            case 1:
                cactuss.addImage(cactus1);
                break;
            case 2:
                cactuss.addImage(cactus2);
                break;
            case 3:
                cactuss.addImage(cactus3);
                break;
            case 4:
                cactuss.addImage(cactus4);
                break;
            case 5:
                cactuss.addImage(cactus5);
                break;
            case 6:
                cactuss.addImage(cactus6);
                break;
            default:
                break;
        }
        cactuss.scale = 0.8;
        cactuss.lifetime = 220;
        cactuss.depth = rex.depth;
        rex.depth = rex.depth + 1;

    }
}

function reset() {
    gameState = PLAY;
    gameover.visible = false
    reiniciar.visible = false
    cactusGroup.destroyEach();
    nubeGroup.destroyEach();
    escore = 0
    rex.changeAnimation("run", trex)
    teroGroup.destroyEach();
}

function tero() {
    terodac = createSprite(width, random(210, 230), 10, 30);
    terodac.velocityX = -8
    terodac.velocityY = 0.2
    terodac.addAnimation("fly dino", tero1)
    teroGroup.add(terodac);
    terodac.lifetime = 220;
}