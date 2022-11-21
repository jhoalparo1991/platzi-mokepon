const botonMascotas = document.querySelector('#boton-mascota')
const seleccionarMascota = document.querySelector('#seleccionar-mascota')
const jugadorVida = document.querySelector('#jugador-vidas')
const jugadorNombre = document.getElementById('jugador-nombre')
const enemigoVida = document.querySelector('#enemigo-vidas')
const botonResetear = document.querySelector('#resetear')
const seleccionarAtaque = document.querySelector('#seleccionar-ataque')

let tarjetas = document.querySelector('#contenedor-tarjetas')
let botonesAtaques = document.querySelector('#botones-ataques')
let enemigoNombre = document.getElementById('enemigo-nombre')
let notificaciones = document.querySelector('#notificaciones')
let enemigoAtaque = document.querySelector('#enemigo-ataques')
let jugadorAtaques = document.querySelector('#jugador-ataques')

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

let htmlMokepones
let htmlBotones

class Mokepon {

    constructor(name, image, life) {
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

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


function numberRandom(min, max) {
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
    seleccionarAtaque.style.display = 'flex'
    obtenerAtaques(mascota)
    mostrarMascotaEnemigaSeleccionada()
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

function mostrarMascotaEnemigaSeleccionada() {
    let randomEnemy = numberRandom(1, (mokepones.length - 1));
    enemigoNombre.innerHTML = mokepones[randomEnemy].name

}

function obtenerAtaqueEnemigo() {

    let ataqueAleatorio = numberRandom(1, (mokepones.length - 1))

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
window.addEventListener('load', iniciarJuego)


