const botonMascotas = document.querySelector('#boton-mascota')
const botonResetear = document.querySelector('#resetear')
const seleccionarMascota = document.querySelector('#seleccionar-mascota')
const seleccionarAtaque = document.querySelector('#seleccionar-ataque')

const jugadorVida = document.querySelector('#jugador-vidas')
const jugadorNombre = document.getElementById('jugador-nombre')
let jugadorAtaques = document.querySelector('#jugador-ataques')

let enemigoNombre = document.getElementById('enemigo-nombre')
const enemigoVida = document.querySelector('#enemigo-vidas')
let enemigoAtaque = document.querySelector('#enemigo-ataques')

let tarjetas = document.querySelector('#contenedor-tarjetas')
let botonesAtaques = document.querySelector('#botones-ataques')
let notificaciones = document.querySelector('#notificaciones')

// Canvas
let mapaCanvas = document.querySelector('#mapa-canvas')
let mapa = document.querySelector('#mapa')
let lienzo = mapa.getContext('2d')
let intervalo
let mascotaJugadorObjeto;
let alturaBuscada
const anchoMaximoMapa = 350
let anchoPantalla = window.innerWidth - 30

if (anchoPantalla > anchoMaximoMapa) {
    anchoPantalla = anchoMaximoMapa - 30
}

alturaBuscada = anchoPantalla * 600 / 800
console.log(anchoPantalla);

mapa.width = anchoPantalla
mapa.height = alturaBuscada

let mascotaHipodoge
let mascotaCapipepo
let mascotaRatigueya

let mokepones = []
let arregloBotonesAtaques = []
let arregloAtaquesJugador = []
let arregloAtaquesEnemigo = []
let indexJugador
let indexEnemigo

let nombreMascota = ''
let nombreMascotaEnemigo = ''
let tipoAtaqueJugador = ''
let tipoAtaqueEnemigo = ''
let victoriasJugador = 0
let victoriasEnemigo = 0
let mapaFondo = new Image()
mapaFondo.src = './assets/mokemap.png'

let htmlMokepones
let htmlBotones

class Mokepon {

    constructor(name, image, life, fotoMapa) {
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
        this.x = numeroAleatorio(0, mapa.width)
        this.y = numeroAleatorio(0, mapa.height)
        this.alto = 50
        this.ancho = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )

    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

hipodoge.attacks.push(
    { name: '🌊', id: 'boton-agua' },
    { name: '🌊', id: 'boton-agua' },
    { name: '🌊', id: 'boton-agua' },
    { name: '🔥', id: 'boton-fuego' },
    { name: '🌴', id: 'boton-tierra' },
)

capipepo.attacks.push(
    { name: '🔥', id: 'boton-fuego' },
    { name: '🔥', id: 'boton-fuego' },
    { name: '🔥', id: 'boton-fuego' },
    { name: '🌊', id: 'boton-agua' },
    { name: '🌴', id: 'boton-tierra' },
)

ratigueya.attacks.push(
    { name: '🌴', id: 'boton-tierra' },
    { name: '🌴', id: 'boton-tierra' },
    { name: '🌴', id: 'boton-tierra' },
    { name: '🌊', id: 'boton-agua' },
    { name: '🔥', id: 'boton-fuego' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    seleccionarAtaque.style.display = 'none'
    botonResetear.style.display = 'none'

    mapaCanvas.style.display = 'none'



    mokepones.forEach(mokepon => {
        htmlMokepones = `
        <input type="radio" name="mascota" id="${mokepon.name}">
            <label for="${mokepon.name}">
                <p>${mokepon.name}</p>
                <img src="${mokepon.image}" alt="">
            </label>
        `
        tarjetas.innerHTML += htmlMokepones


    })


    mascotaHipodoge = document.querySelector('#Hipodoge')
    mascotaCapipepo = document.querySelector('#Capipepo')
    mascotaRatigueya = document.querySelector('#Ratigueya')

    botonMascotas.addEventListener('click', obtenerMascota)

    botonResetear.addEventListener('click', resetGame)

}


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function obtenerMascota() {
    if (mascotaHipodoge.checked) {
        nombreMascota = mascotaHipodoge.id;
        mostrarMascotaSeleccionada(nombreMascota);
        return;
    }
    if (mascotaCapipepo.checked) {
        nombreMascota = mascotaCapipepo.id;
        mostrarMascotaSeleccionada(nombreMascota);
        return;
    }
    if (mascotaRatigueya.checked) {
        nombreMascota = mascotaRatigueya.id;

        mostrarMascotaSeleccionada(nombreMascota);
        return;
    }
    if (nombreMascota == '') {
        alert('Elije una mascota');
        return
    }


}

function mostrarMascotaSeleccionada(mascota) {
    jugadorNombre.innerHTML = mascota
    seleccionarMascota.style.display = 'none'
    seleccionarAtaque.style.display = 'none'
    mapaCanvas.style.display = 'flex'
    obtenerAtaques(mascota)
    iniciarMapa()
    // Mostrar mascota enemiga seleccionada

}

function obtenerAtaques(mascota) {
    let ataques
    moke = mokepones.filter(mokepon => mokepon.name === mascota);
    ataques = moke[0].attacks;
    mostrarAtaqueMascota(ataques)
}

function mostrarAtaqueMascota(ataques) {
    ataques.forEach(ataque => {
        htmlBotones = `
        <button class="boton-ataque btn-ataque" id="${ataque.id}">${ataque.name}</button>
        `
        botonesAtaques.innerHTML += htmlBotones
    })
    arregloBotonesAtaques = document.querySelectorAll('.btn-ataque')

    asignarEventosBotonesAtaques()


}

function asignarEventosBotonesAtaques() {
    arregloBotonesAtaques.forEach(boton => {
        boton.addEventListener('click', () => {
            if (boton.innerText === '🔥') {
                boton.classList.add('disabled')
                arregloAtaquesJugador.push('FUEGO')
            } else if (boton.innerText === '🌊') {
                boton.classList.add('disabled')
                arregloAtaquesJugador.push('AGUA')
            } else {
                boton.classList.add('disabled')
                arregloAtaquesJugador.push('TIERRA')
            }
            obtenerAtaqueEnemigo()
        })
    })

}

function mostrarMascotaEnemigaSeleccionada(enemigo) {
    enemigoNombre.innerHTML = enemigo.name
}

function obtenerAtaqueEnemigo() {

    let ataqueAleatorio = numeroAleatorio(1, (mokepones.length - 1))

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        arregloAtaquesEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        arregloAtaquesEnemigo.push('AGUA')
    } else {
        arregloAtaquesEnemigo.push('TIERRA')
    }
    iniciarCombate()
}

function iniciarCombate() {
    if (arregloAtaquesJugador.length == 5) {
        mostrarResultadosCombate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexJugador = arregloAtaquesJugador[jugador]
    indexEnemigo = arregloAtaquesEnemigo[enemigo]
}
function mostrarResultadosCombate() {
    for (let index = 0; index < arregloAtaquesJugador.length; index++) {
        if (arregloAtaquesJugador[index] === arregloAtaquesEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATE')
        }
        else if (arregloAtaquesJugador[index] === 'AGUA'
            && arregloAtaquesEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            victoriasJugador += 1
            crearMensaje('GANASTE')
        }
        else if (arregloAtaquesJugador[index] === 'TIERRA'
            && arregloAtaquesEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            victoriasJugador += 1
            crearMensaje('GANASTE')
        }
        else if (arregloAtaquesJugador[index] === 'FUEGO'
            && arregloAtaquesEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            victoriasJugador += 1
            crearMensaje('GANASTE')
        } else {
            indexAmbosOponentes(index, index)
            victoriasEnemigo += 1
            crearMensaje('PERDISTE')
        }
    }
}

function crearMensaje(mensaje) {
    jugadorVida.innerHTML = victoriasJugador
    enemigoVida.innerHTML = victoriasEnemigo
    if (victoriasJugador === victoriasEnemigo) {
        notificaciones.innerHTML = 'La partida quedo empatada'
    } else if (victoriasJugador > victoriasEnemigo) {
        notificaciones.innerHTML = 'Felicitaciones, GANASTE 👍'
    } else {
        notificaciones.innerHTML = 'Te ganó una maquina, PERDISTE 👎'
    }
    imprimirAtaques()
    botonResetear.style.display = 'block'
}
function imprimirAtaques() {
    let elementoJugador = document.createElement('p')
    elementoJugador.innerHTML = indexJugador
    jugadorAtaques.appendChild(elementoJugador)

    let elementoEnemigo = document.createElement('p')
    elementoEnemigo.innerHTML = indexEnemigo
    enemigoAtaque.appendChild(elementoEnemigo)
}

function resetGame() {
    location.reload()
}

function dibujarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0, mapa.width, mapa.height)

    mascotaJugadorObjeto.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
    revisarColision(hipodogeEnemigo)

}

function revisarColision(enemigo) {
    let arribaEnemigo = enemigo.y
    let abajoEnemigo = enemigo.y + enemigo.alto
    let izquierdaEnemigo = enemigo.x
    let derechaEnemigo = enemigo.x + enemigo.ancho

    let arribaJugador = mascotaJugadorObjeto.y
    let abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    let izquierdaJugador = mascotaJugadorObjeto.x
    let derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (abajoJugador < arribaEnemigo
        || arribaJugador > abajoEnemigo
        || derechaJugador < izquierdaEnemigo
        || izquierdaJugador > derechaEnemigo
    ) {
        return;
    } else {
        detenerMovimiento()
        mapaCanvas.style.display = 'none'
        seleccionarAtaque.style.display = 'flex'
        mostrarMascotaEnemigaSeleccionada(enemigo)

    }


}

function moverPersonajesArriba() {
    mascotaJugadorObjeto.velocidadY -= 5
}

function moverPersonajesAbajo() {
    mascotaJugadorObjeto.velocidadY += 5
}

function moverPersonajesIzquierda() {
    mascotaJugadorObjeto.velocidadX -= 5
}

function moverPersonajesDerecha() {
    mascotaJugadorObjeto.velocidadX += 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerMokepon()
    intervalo = setInterval(dibujarCanvas, 50)
    window.addEventListener('keydown', e => teclaPresionada(e))
    window.addEventListener('keyup', detenerMovimiento)
}
function teclaPresionada(e) {
    let tecla = e.key

    if (tecla === 'ArrowDown') {
        moverPersonajesAbajo()
    } else if (tecla === 'ArrowRight') {
        moverPersonajesDerecha()
    } else if (tecla === 'ArrowLeft') {
        moverPersonajesIzquierda()
    } else if (tecla === 'ArrowUp') {
        moverPersonajesArriba()
    }

}

function obtenerMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].name === nombreMascota) {
            return mokepones[i]
        }
    }
    // return mokepones.filter(mokepon => mokepon.name === nombreMascota)
}

window.addEventListener('load', iniciarJuego)


