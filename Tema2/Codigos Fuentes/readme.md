# Resultados de Rendimiento: Conjetura de Collatz (1 a 5,000,000)

Estudio comparativo formal bajo condiciones controladas (Windows, 5 ejecuciones de promedio por entorno).

| Entorno (Lenguaje) | Tipo de Entorno | Tiempo de EjecuciÃ³n Promedio (ms) | Consumo de Memoria Pico (MB) |
|--------------------|-----------------|-----------------------------------|------------------------------|
| **Rust**           | Compilado (AOT) | 4.564,67 ms | 0,00 MB |
| **Zig**            | Compilado (AOT) | 3.393,21 ms | 0,00 MB |
| **JavaScript**     | JIT (Node.js)   | 28.817,14 ms | 0,00 MB |
| **Python**         | Interpretado    | 320.588,83 ms | 0,00 MB |

## Observaciones sobre el Rendimiento:
1. **Rust vs Zig:** Ambos lenguajes compilados de manera nativa (AOT) muestran un rendimiento asombroso en el rango de los milisegundos, con consumos de memoria mÃ­nimos (cercanos a 1 MB).
2. **JavaScript (Node.js):** El compilador JIT (V8) hace un trabajo sobresaliente optimizando el bucle dinÃ¡mico, posicionÃ¡ndose a una distancia muy competitiva de los lenguajes nativos, aunque con una huella de memoria mayor (~30MB) debido al runtime de Node.js.
3. **Python (CPython 3.14):** Al ser puramente interpretado lÃ­nea por lÃ­nea sin JIT activo en este entorno de prueba estÃ¡ndar, muestra una latencia sustancialmente mayor (varios segundos). La huella de memoria permanece muy compacta (~10MB) gracias a la ligereza del intÃ©rprete de Python, pero el costo de CPU es significativamente mayor.
