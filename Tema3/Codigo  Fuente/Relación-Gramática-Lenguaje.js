
/**
 * SISTEMA COMPILADOR DE GRAMÁTICAS Y VALIDACIÓN DE JERARQUÍAS (NORMA APA EVALUACIÓN)
 * Sección separada de código fuente puro.
 */

// ==========================================
// COMPONENTE 1: MECANISMO DE GENERACIÓN (Pregunta 1)
// ==========================================

class GramaticaGenerativa {
    /**
     * Define una gramática formal por medio de su 4-tupla.
     * @param {Set<string>} variables - Conjunto V
     * @param {Set<string>} terminales - Conjunto Sigma
     * @param {Object} producciones - Conjunto P (Reglas de mapeo)
     * @param {string} simboloInicial - Símbolo S
     */
    constructor(variables, terminales, producciones, simboloInicial) {
        this.V = variables;
        this.Sigma = terminales;
        this.P = producciones;
        this.S = simboloInicial;
    }

    /**
     * Genera una cadena aleatoria válida del lenguaje aplicando el mecanismo de derivación paso a paso.
     * @param {number} limitePasos - Control de seguridad para evitar recursión infinita.
     * @returns {Object} Historial detallado del proceso secuencial de derivación.
     */
    generarCadena(limitePasos = 20) {
        let cadenaActual = this.S;
        const pasosDerivacion = [cadenaActual];
        let paso = 0;

        while (paso < limitePasos) {
            let elementoCambiado = false;

            // Buscar el primer símbolo no terminal (Variable) presente en la cadena actual
            for (let i = 0; i < cadenaActual.length; i++) {
                const caracter = cadenaActual[i];
                
                if (this.V.has(caracter)) {
                    const opcionesOpciones = this.P[caracter];
                    // Selección aleatoria de una regla de producción disponible para el no terminal
                    const reglaSeleccionada = opcionesOpciones[Math.floor(Math.random() * opcionesOpciones.length)];
                    
                    // Mecanismo de sustitución: Reemplazar el no terminal por su regla
                    cadenaActual = cadenaActual.substring(0, i) + reglaSeleccionada + cadenaActual.substring(i + 1);
                    pasosDerivacion.push(cadenaActual);
                    elementoCambiado = true;
                    break;
                }
            }

            // Si ya no quedan variables (No terminales), la derivación ha concluido con éxito
            if (!elementoCambiado) {
                break;
            }
            paso++;
        }

        // Limpieza de símbolos vacíos (epsilon representados por '')
        const resultadoFinal = cadenaActual.replace(/ε/g, '');
        
        return {
            exito: [...resultadoFinal].every(char => this.Sigma.has(char)),
            derivacionCompleta: pasosDerivacion.join(' => '),
            cadenaResultante: resultadoFinal
        };
    }
}

// ==========================================
// COMPONENTE 2: VALIDADOR LÉXICO TIPO 3 (Pregunta 2)
// ==========================================

class AnalizadorLexicoRegular {
    /**
     * Modela un analizador diseñado bajo las restricciones de una gramática regular (Tipo 3).
     */
    constructor() {
        // Expresión regular que simula el autómata de la regla: <id_sistema> ::= "id_" <digitos>
        this.patronRegular = /^id_[01]+$/;
    }

    /**
     * Evalúa si una cadena pertenece al lenguaje regular definido.
     * @param {string} token - Cadena de caracteres a analizar.
     * @returns {boolean} True si cumple estrictamente con el formato gramatical regular.
     */
    validarTokenRegular(token) {
        return this.patronRegular.test(token);
    }
}

// ==========================================
// SECCIÓN DE EJECUCIÓN Y PRUEBAS DEL SISTEMA
// ==========================================

// 1. Instanciación del Ejemplo Práctico de la Pregunta 1 (Palíndromos binarios simétricos)
const variablesPalindromo = new Set(['S']);
const terminalesPalindromo = new Set(['0', '1']);
const reglasPalindromo = {
    'S': ['0S0', '1S1', 'ε'] // Reglas que conservan la estructura centralizada
};

const gramaticaBinaria = new GramaticaGenerativa(
    variablesPalindromo, 
    terminalesPalindromo, 
    reglasPalindromo, 
    'S'
);

console.log("--- EJECUCIÓN PREGUNTA 1: Mecanismo de Derivación ---");
const simulacionDerivacion = gramaticaBinaria.generarCadena();
console.log(`Trayectoria de derivación: ${simulacionDerivacion.derivacionCompleta}`);
console.log(`Cadena final generada en el lenguaje L(G): "${simulacionDerivacion.cadenaResultante}"\n`);


// 2. Instanciación del Ejemplo Práctico de la Pregunta 2 (Evaluación gramática lineal regular)
const lexer = new AnalizadorLexicoRegular();

console.log("--- EJECUCIÓN PREGUNTA 2: Validación Gramática Regular (Tipo 3) ---");
const tokenValido = "id_10101";
const tokenInvalido = "id_10201"; // Contiene '2', fuera del alfabeto {0,1}

console.log(`¿El token "${tokenValido}" es generado por la gramática Tipo 3?: ${lexer.validarTokenRegular(tokenValido)}`);
console.log(`¿El token "${tokenInvalido}" es generado por la gramática Tipo 3?: ${lexer.validarTokenRegular(tokenInvalido)}`);