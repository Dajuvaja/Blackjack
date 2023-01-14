const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // Referencias del HTML
  const btnNuevo = document.querySelector("#btn-nuevo"),
    btnPedir = document.querySelector("#btn-pedir"),
    btnDetener = document.querySelector("#btn-detener");

  const divCartasJugadores = document.querySelectorAll(".div-cartas"),
    puntosHTML = document.querySelectorAll("small");

  //* Esta función inicia el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  //* Esta función crea una nueva baraja
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let especial of especiales) {
      for (let tipo of tipos) {
        deck.push(especial + tipo);
      }
    }
    //

    return _.shuffle(deck);
  };

  //* Esta función me permite tomar una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay más cartas en la baraja";
    }
    return deck.pop();
  };

  //* Esta función sirve para obtener el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor)
      ? valor === "A"
        ? 11
        : valor === "J"
        ? 10
        : valor === "Q"
        ? 10
        : valor === "K"
        ? 10
        : "Carta no válida"
      : valor * 1;
  };

  // Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (
        (puntosComputadora <= 21 && puntosComputadora > puntosMinimos) ||
        puntosMinimos > 21
      ) {
        alert("Usted ha perdido");
      } else if (puntosComputadora === puntosMinimos) {
        alert("El juego ha terminado en empate");
      } else if (puntosComputadora > 21 && puntosComputadora > puntosMinimos) {
        alert("Felicidades, usted ha ganado");
      }
    }, 500);
  };

  //* Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  //* Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Usted ha perdido");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, ¡muy bien!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    console.clear();
    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego,
  };
})();
