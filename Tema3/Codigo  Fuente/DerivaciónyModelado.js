/**
 * MOTOR DE INTERPRETACIÓN GEOMÉTRICA PARA GRAMÁTICAS GENÓMICAS (GLC)
 * Sección de código fuente puro.
 */

class GenomaDrawingEngine {
    constructor() {
        // Diccionario formal de las reglas de producción definidas en la GLC
        this.gramatica = {
            'S': ['Cuadrado', 'Rectangulo', 'Escalera', 'Arbol', 'Cubo'],
            'Cuadrado': 'acacacac',
            'Rectangulo': 'aacacaacac',
            'Escalera': 'acagacaga', // Cadena ya derivada para 3 peldaños
            'Arbol': 'agatcatt',       // Cadena ya derivada para árbol básico
            'Cubo': 'acacacactacacacac' // Cuadrado + Conector t + Cuadrado
        };
    }

    /**
     * Valida de manera estricta si la cadena pertenece al alfabeto formal del genoma.
     * @param {string} cadena - Cadena a evaluar.
     * @returns {boolean}
     */
    validarAlfabeto(cadena) {
        return [...cadena].every(nucleotido => ['a', 'c', 'g', 't'].includes(nucleotido));
    }

    /**
     * Traduce los nucleótidos en vectores de movimiento espacial (Gráficos de Tortuga).
     * @param {string} figura - Nombre del patrón a recuperar de la gramática.
     * @returns {Object} Informe técnico del trazo y coordenadas generadas.
     */
    interpretarYDibujar(figura) {
        const cadenaGenomica = this.gramatica[figura];
        
        if (!cadenaGenomica || !this.validarAlfabeto(cadenaGenomica)) {
            throw new Error(`Error Sintáctico: Cadena inválida o fuera del alfabeto Σ para la figura: ${figura}`);
        }

        // Estado inicial del sistema cartesiano de dibujo
        let x = 0;
        let y = 0;
        let angulo = 0; // 0 grados = Mirando hacia la derecha (Eje X positivo)
        const pasoEstandar = 10;
        
        const historialCoordenadas = [[x, y]];
        const pilaDeEstado = []; // Soporte formal para el operador libre de contexto 't'

        // Procesamiento secuencial de la cadena terminal
        for (let i = 0; i < cadenaGenomica.length; i++) {
            const nucleotido = cadenaGenomica[i];

            switch (nucleotido) {
                case 'a': // Avanzar pintando la línea
                    x += Math.round(pasoEstandar * Math.cos((angulo * Math.PI) / 180));
                    y += Math.round(pasoEstandar * Math.sin((angulo * Math.PI) / 180));
                    historialCoordenadas.push([x, y]);
                    break;

                case 'c': // Rotar 90 grados a la derecha (horario)
                    angulo = (angulo + 90) % 360;
                    break;

                case 'g': // Rotar 90 grados a la izquierda (antihorario)
                    angulo = (angulo - 90 + 360) % 360;
                    break;

                case 't': // Transformación tridimensional / Bifurcación
                    // Almacena el estado actual en la pila
                    pilaDeEstado.push({ cx: x, cy: y, ca: angulo });
                    // Ejecuta un desfase oblicuo isométrica (45 grados con trazo de profundidad)
                    x += Math.round(pasoEstandar * Math.cos((45 * Math.PI) / 180));
                    y += Math.round(pasoEstandar * Math.sin((45 * Math.PI) / 180));
                    historialCoordenadas.push([x, y]);
                    
                    // Restaura el puntero al origen de la bifurcación
                    const estadoRetornado = pilaDeEstado.pop();
                    x = estadoRetornado.cx;
                    y = estadoRetornado.cy;
                    angulo = estadoRetornado.ca;
                    historialCoordenadas.push([x, y]);
                    break;
            }
        }

        return {
            figura: figura,
            secuenciaADN: cadenaGenomica,
            totalPuntos: historialCoordenadas.length,
            vectorRuta: historialCoordenadas
        };
    }
}

// ==========================================
// CONTROL DE EJECUCIÓN DEL CASO PRÁCTICO
// ==========================================

const motorGrafico = new GenomaDrawingEngine();
const figurasAProcesar = ['Cuadrado', 'Rectangulo', 'Escalera', 'Arbol', 'Cubo'];

console.log("--- PROCESAMIENTO GRAMATICAL Y MODELADO GRÁFICO ---");

figurasAProcesar.forEach(figura => {
    try {
        const resultadoDibujo = motorGrafico.interpretarYDibujar(figura);
        console.log(`\n[Figura]: ${resultadoDibujo.figura}`);
        console.log(` -> Expresión Genómica Terminal L(G): "${resultadoDibujo.secuenciaADN}"`);
        console.log(` -> Matriz de Coordenadas de Trazo (X, Y):`, JSON.stringify(resultadoDibujo.vectorRuta));
    } catch (error) {
        console.error(error.message);
    }
});