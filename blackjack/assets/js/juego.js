const miModulo = (() => {
    'use strict'
    let deck = []
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K']
    let puntosJugadores = []

    //HTML references
    const btnPedir = document.querySelector('div>div>#btnPedir')//#btnPedir')
    const puntoshtml = document.querySelectorAll('small')
    const divCartasJugador = document.querySelectorAll('.divCartas')
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')

    const iniciarJuego = (numJugadores = 2) => {
        deck = createDeck()
        puntosJugadores = []
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        }
        puntoshtml.forEach(elem => elem.innerText = 0)
        divCartasJugador.forEach(elem => elem.innerHTML = '')
        btnPedir.disabled = false
        btnDetener.disabled = false
    }

    const createDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`)
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(`${especial}${tipo}`)
            }
        }
        return _.shuffle(deck)
    }

    const pedirCarta = () => {
        if(deck.length === 0){
            throw "No hay cartas en el deck"
        }
        return deck.pop()
        
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length -1)
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }
    //Turno 0 primer jugador, ultimo es computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta) 
        puntoshtml[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno]
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador[turno].append(imgCarta)
    }

    const determinaGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores
        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nadie gana')
                btnPedir.disabled = true
                btnDetener.disabled = true
            } else if(puntosMinimos > 21){
                alert('Computadora gana')
                btnPedir.disabled = true
                btnDetener.disabled = true
            } else if(puntosComputadora > 21){
                alert('Jugador gana')
                btnPedir.disabled = true
                btnDetener.disabled = true
            } else{
                alert('computadora gana')
                btnPedir.disabled = true
                btnDetener.disabled = true
            }
        }, 500)
    }
    //Turno de computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0
        do {
            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1)
            crearCarta(carta, puntosJugadores.length -1)
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))
        determinaGanador()
    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0)
        if(puntosJugador > 21){
            puntoshtml[0].innerText = 'You lost'
            btnPedir.disabled = true
            turnoComputadora(puntosJugador)
        }else if (puntosJugador === 21){
            btnPedir.disabled = true
            puntoshtml[0].innerText = 'You win'
            turnoComputadora(puntosJugador)
        }
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugadores[0])
    })

    btnNuevo.addEventListener('click', () => {
        iniciarJuego()
    })
    //return 'HOLAMUNDO'
    return {
        nuevoJuego: iniciarJuego
    }
})();



