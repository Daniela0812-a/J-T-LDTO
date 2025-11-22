/*Lyly Tenorio */
/*apodo*/
let nickname = prompt("Escribe tu apodo:");

// Si no escribe nada → se usa un nombre por defecto
if (!nickname || nickname.trim() === "") {
    nickname = "Jugador";
}

document.addEventListener('DOMContentLoaded', () => {

    const nicknameTablero = document.getElementById("nombre-jugador");

    // Mostrar el apodo en el tablero
    if (nicknameTablero) {
        nicknameTablero.textContent = "Jugador: " + nickname;
    }


    const nicknameSpan = document.getElementById("nickname");
    if (nicknameSpan) {
        // Mostrar el apodo en pantalla
        nicknameSpan.textContent = nickname;
    }

    const pixelBot = document.getElementById("pixel-bot");
    const juegoContenedor = document.getElementById("juego-contenedor");
    const mensajeJuego = document.getElementById("mensaje-juego");
    const puntuacionDisplay = document.getElementById("puntuacion");
    const nivelDisplay = document.getElementById("nivel");
    const suelo = document.getElementById("suelo");

    let isJumping = false;
    let botBottom = 30;
    let score = 0;
    let nivel = 1;
    let gameOver = true;
    let obstacleInterval;

    // Velocidad base del obstáculo
    let velocidadObstaculo = 15;


    /*Fondo del juego*/
    const fondos = [
        "img/olas.jpg",
        "img/noche.jpg",
        "img/cielo.jpg",
        "img/hifi.png"
    ];

    let indiceFondo = 0;


    function jump() {
        if (isJumping) return;
        isJumping = true;

        let jumpHeight = 150;
        let jumpSpeed = 10;
        let currentJumpHeight = 0;

        const upTimerId = setInterval(() => {

            if (currentJumpHeight >= jumpHeight) {
                clearInterval(upTimerId);

                const downTimerId = setInterval(() => {

                    if (botBottom <= 30) {
                        clearInterval(downTimerId);
                        botBottom = 30;
                        pixelBot.style.bottom = botBottom + "px";
                        isJumping = false;
                    }

                    botBottom -= jumpSpeed;
                    pixelBot.style.bottom = botBottom + "px";

                }, 20);
            }

            botBottom += jumpSpeed;
            currentJumpHeight += jumpSpeed;
            pixelBot.style.bottom = botBottom + "px";

        }, 20);
    }


    /*función para cambiar fondo*/
    function cambiarFondo() {

        indiceFondo++;

        // Si llega al final, vuelve al primer fondo
        if (indiceFondo >= fondos.length) {
            indiceFondo = 0;
        }

        // Cambia el fondo del juego
        juegoContenedor.style.backgroundImage = `url('${fondos[indiceFondo]}')`;
    }


    function generarObstaculo() {
        if (gameOver) return;

        let obstaclePosition = 900;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstaculo');
        juegoContenedor.appendChild(obstacle);

        const moverObstaculo = setInterval(() => {


            if (obstaclePosition < -30) {
                clearInterval(moverObstaculo);
                juegoContenedor.removeChild(obstacle);

                score++;
                puntuacionDisplay.textContent = "Puntuación: " + score;

                /* cada 5 puntos */
                if (score % 5 === 0) {

                    cambiarFondo();    // Cambiar fondo
                    nivel++;          // Subir nivel
                    velocidadObstaculo++; // Aumentar velocidad del obstáculo

                    nivelDisplay.textContent = "Nivel: " + nivel;
                }
            }



            if (
                obstaclePosition > 50 && obstaclePosition < 100 &&
                botBottom < 80
            ) {
                clearInterval(moverObstaculo);
                clearInterval(obstacleInterval);
                gameOver = true;

                mensajeJuego.textContent =
                    "GAME OVER " + nickname +
                    "! Puntuación final: " + score +
                    "\nPresiona ESPACIO para reiniciar";

                mensajeJuego.style.display = "block";
                suelo.style.animationPlayState = "pause";
            }

            // Movimiento del obstáculo 
            obstaclePosition -= velocidadObstaculo;
            obstacle.style.left = obstaclePosition + "px";

        }, 20);
    }


    function iniciarJuego() {

        document.querySelectorAll('.obstaculo').forEach(obs => obs.remove());

        score = 0;
        nivel = 1;
        velocidadObstaculo = 10; // Reinicia velocidad base

        puntuacionDisplay.textContent = "Puntuación: 0";
        nivelDisplay.textContent = "Nivel: 1";

        botBottom = 30;
        pixelBot.style.bottom = botBottom + "px";

        isJumping = false;
        gameOver = false;

        mensajeJuego.style.display = "none";
        suelo.style.animationPlayState = "running";

        obstacleInterval = setInterval(generarObstaculo, 2000);
    }


    document.addEventListener('keydown', (e) => {
        if (e.code === "Space") {
            iniciarJuego();
        } else {
            jump();
        }
    });

    mensajeJuego.style.display = "block";
    suelo.style.animationPlayState = "pause";
});
