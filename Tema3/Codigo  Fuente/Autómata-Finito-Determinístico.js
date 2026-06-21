/**
 * SIMULADOR DE AUTÓMATA FINITO DETERMINISTA PARA PGN BÁSICO
 * Sección estricta de código ejecutable.
 */

class AutomataPGN {
    constructor() {
        // Alfabetos categorizados para simplificar la validación de transiciones
        this.piezas = new Set(['K', 'Q', 'R', 'B', 'N']);
        this.columnas = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
        this.filas = new Set(['1', '2', '3', '4', '5', '6', '7', '8']);
        this.captura = 'x';
        this.jaques = new Set(['+', '#']);

        // Definición estricta de los estados de aceptación F
        this.estadosAceptacion = new Set(['q4', 'q5']);
    }

    /**
     * Función de transición Delta (δ: Q x Σ -> Q)
     * @param {string} estadoActual - El estado de origen
     * @param {string} caracter - El símbolo terminal leído
     * @returns {string} El estado de destino
     */
    transicionDelta(estadoActual, caracter) {
        switch (estadoActual) {
            case 'q0': // Estado Inicial
                if (this.piezas.has(caracter)) return 'q1';
                if (this.columnas.has(caracter)) return 'q3';
                break;
            case 'q1': // Leyó Pieza
                if (caracter === this.captura) return 'q2';
                if (this.columnas.has(caracter)) return 'q3';
                break;
            case 'q2': // Leyó Captura
                if (this.columnas.has(caracter)) return 'q3';
                break;
            case 'q3': // Leyó Columna (Coordenada X)
                if (this.filas.has(caracter)) return 'q4';
                break;
            case 'q4': // Leyó Fila (Coordenada Y) -> Aceptación
                if (this.jaques.has(caracter)) return 'q5';
                break;
            case 'q5': // Leyó Jaque/Mate -> Aceptación
                // q5 no tiene transiciones salientes válidas en este subconjunto
                break;
        }
        
        // Si no hay regla de transición para el caracter, cae en estado pozo
        return 'q_err';
    }

    /**
     * Ejecuta la cadena completa contra el AFD.
     * @param {string} cadena - Movimiento de ajedrez a evaluar.
     * @returns {Object} Informe del análisis léxico.
     */
    procesarCadena(cadena) {
        let estadoActual = 'q0';
        let ruta = [estadoActual];

        // Se procesa la cadena carácter por carácter
        for (let i = 0; i < cadena.length; i++) {
            estadoActual = this.transicionDelta(estadoActual, cadena[i]);
            ruta.push(estadoActual);
            
            // Si cae en el estado muerto, cortamos el procesamiento
            if (estadoActual === 'q_err') break;
        }

        // Verificamos si el estado final al terminar la cadena pertenece a F
        const aceptado = this.estadosAceptacion.has(estadoActual);

        return {
            cadena: cadena,
            valido: aceptado,
            estadoFinal: estadoActual,
            trazabilidad: ruta.join(' -> ')
        };
    }
}

// ==========================================
// EJECUCIÓN Y PRUEBAS DEL AUTÓMATA PGN
// ==========================================

const afdAjedrez = new AutomataPGN();

// Lotes de prueba basados en el modelo teórico
const casosPrueba = [
    "e4",      // Peón regular
    "Nf3",     // Pieza regular
    "Qxd5+",   // Pieza con captura y jaque
    "a8#",     // Peón con mate (asumiendo avance sin promoción para el ejemplo)
    "Rx",      // Inválido: Captura sin destino
    "k4",      // Inválido: Pieza no reconocida (k minúscula)
    "e9",      // Inválido: Fila fuera del tablero
    "Nf3x"     // Inválido: Sintaxis cruzada
];

console.log("--- RESULTADOS DEL AFD PGN (SUB-LENGUAJE) ---");
casosPrueba.forEach(movimiento => {
    const resultado = afdAjedrez.procesarCadena(movimiento);
    console.log(`Movimiento: ${resultado.cadena.padEnd(7)} | Válido: ${resultado.valido ? 'SÍ' : 'NO '} | Ruta: ${resultado.trazabilidad}`);
});