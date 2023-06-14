// Definir los elementos del MDP
const estados = ["A", "B", "C"];
const acciones = ["Ir a la izquierda", "Ir a la derecha"];
const modeloTransicion = {
  A: {
    "Ir a la izquierda": { A: 0.5, B: 0.5 },
    "Ir a la derecha": { A: 1, C: 0 },
  },
  B: {
    "Ir a la izquierda": { A: 0.8, B: 0.2 },
    "Ir a la derecha": { B: 1 },
  },
  C: {
    "Ir a la izquierda": { B: 1 },
    "Ir a la derecha": { C: 1 },
  },
};
const funcionRecompensa = {
  A: { "Ir a la izquierda": -1, "Ir a la derecha": 10 },
  B: { "Ir a la izquierda": 5, "Ir a la derecha": -5 },
  C: { "Ir a la izquierda": 0, "Ir a la derecha": 0 },
};

// Función para seleccionar una acción basada en una política epsilon-greedy
function seleccionarAccion(policies, estado, epsilon) {
  if (Math.random() < epsilon || !policies[estado]) {
    // Exploración aleatoria con probabilidad epsilon
    return acciones[Math.floor(Math.random() * acciones.length)];
  } else {
    // Explotación basada en las políticas actuales
    return policies[estado];
  }
}

// Función para realizar un paso en el MDP
function pasoMDP(estado, accion) {
  const transiciones = modeloTransicion[estado][accion];
  const estadosDestino = Object.keys(transiciones);
  const probabilidades = Object.values(transiciones);

  // Realizar una selección estocástica del estado siguiente basada en las probabilidades
  let estadoSiguiente = estadosDestino[0];
  for (let i = 0; i < probabilidades.length; i++) {
    if (Math.random() < probabilidades[i]) {
      estadoSiguiente = estadosDestino[i];
      break;
    }
  }

  // Obtener la recompensa correspondiente a la transición actual
  const recompensa = funcionRecompensa[estado][accion];

  return { estadoSiguiente, recompensa };
}

// Ejemplo de iteración de valor para encontrar la política óptima
const politicas = {};
const valores = {};
const epsilon = 0.2;
const gamma = 0.8;
let delta;

do {
  delta = 0;

  for (let i = 0; i < estados.length; i++) {
    const estado = estados[i];
    const accion = seleccionarAccion(politicas, estado, epsilon);

    console.log({ estado, accion, i, politicas, epsilon });

    const { estadoSiguiente, recompensa } = pasoMDP(estado, accion);

    const valorAnterior = valores[estado] || 0;
    const valorSiguiente = valores[estadoSiguiente] || 0;
    const nuevoValor = recompensa + gamma * valorSiguiente;

    politicas[estado] = accion;
    valores[estado] = nuevoValor;

    delta = Math.max(delta, Math.abs(nuevoValor - valorAnterior));
  }
} while (delta > 0.001); // Criterio de convergencia

console.log("Política óptima:", politicas);
console.log("Valores de estado:", valores);
