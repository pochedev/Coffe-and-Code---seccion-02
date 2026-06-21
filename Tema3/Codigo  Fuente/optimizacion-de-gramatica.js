/**
 * OPTIMIZADOR DE GRAMÁTICAS (NORMA APA EVALUACIÓN)
 * Implementa la higiene gramatical descrita en la teoría.
 */

class GrammarOptimizer {
    
    /**
     * Algoritmo para eliminar la recursividad por la izquierda inmediata.
     * @param {string} nonTerminal - El no terminal a optimizar (ej. 'E').
     * @param {Array<string>} recursiveSuffixes - Los alfa (ej. ['+T']).
     * @param {Array<string>} baseCases - Los beta (ej. ['T']).
     * @returns {Object} Un objeto con las nuevas reglas gramaticales de producción.
     */
    static eliminateLeftRecursion(nonTerminal, recursiveSuffixes, baseCases) {
        const newNonTerminal = `${nonTerminal}'`;
        const optimizedRules = {};

        // Paso 1 y 2: A -> beta A'
        optimizedRules[nonTerminal] = baseCases.map(beta => `${beta}${newNonTerminal}`);

        // Paso 3: A' -> alpha A' | epsilon
        optimizedRules[newNonTerminal] = recursiveSuffixes.map(alpha => `${alpha}${newNonTerminal}`);
        optimizedRules[newNonTerminal].push('ε'); // Cierre de la recursión

        return optimizedRules;
    }

    /**
     * Algoritmo para factorizar por la izquierda un conjunto de producciones.
     * @param {string} nonTerminal - El no terminal a optimizar (ej. 'S').
     * @param {string} commonPrefix - La secuencia compartida (ej. 'iEtS').
     * @param {Array<string>} suffixes - Los finales distintos y reglas puras (ej. [{suffix: 'eS'}, {suffix: ''}, {pure: 'a'}]).
     * @returns {Object} Un objeto con las reglas factorizadas.
     */
    static leftFactorize(nonTerminal, commonPrefix, suffixes, otherRules = []) {
        const newNonTerminal = `${nonTerminal}'`;
        const optimizedRules = {};

        // Regla original factorizada: A -> prefix A' | otrasReglas
        optimizedRules[nonTerminal] = [`${commonPrefix}${newNonTerminal}`, ...otherRules];

        // Regla del nuevo no terminal: A' -> suffix1 | suffix2
        optimizedRules[newNonTerminal] = suffixes.map(suffix => suffix === '' ? 'ε' : suffix);

        return optimizedRules;
    }
}

// ==========================================
// SECCIÓN DE PRUEBAS DE LA HIGIENE GRAMATICAL
// ==========================================

console.log("--- CASO B: ELIMINACIÓN DE RECURSIVIDAD POR LA IZQUIERDA ---");
// Gramática original: E -> E + T | T
const noTerminalRecursivo = "E";
const alfas = ["+T"]; // Lo que sigue al no terminal recursivo
const betas = ["T"];  // Los casos base

const resultadoRecursion = GrammarOptimizer.eliminateLeftRecursion(noTerminalRecursivo, alfas, betas);
console.log(`Original: ${noTerminalRecursivo} -> ${noTerminalRecursivo}${alfas.join('')} | ${betas.join(' | ')}`);
console.log("Optimizada:");
for (const [nt, rules] of Object.entries(resultadoRecursion)) {
    console.log(`  ${nt} -> ${rules.join(' | ')}`);
}


console.log("\n--- CASO C: FACTORIZACIÓN POR LA IZQUIERDA ---");
// Gramática original: S -> iEtS | iEtSeS | a
const noTerminalFactorizar = "S";
const prefijoComun = "iEtS";
// Suffix1: '' (vacío para iEtS), Suffix2: 'eS' (para iEtSeS)
const sufijos = ["", "eS"]; 
const otrasReglas = ["a"];

const resultadoFactorizacion = GrammarOptimizer.leftFactorize(noTerminalFactorizar, prefijoComun, sufijos, otrasReglas);
console.log(`Original: ${noTerminalFactorizar} -> iEtS | iEtSeS | a`);
console.log("Optimizada:");
for (const [nt, rules] of Object.entries(resultadoFactorizacion)) {
    console.log(`  ${nt} -> ${rules.join(' | ')}`);
}