console.log("************** DELIVERABLE 02 *********************");
console.log("Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.");

let primero = [1, 2, 3, 4, 5];
var segundo = [6, 7, 8, 9];
var tercero = ['a', 'b', 'c', 'd'];
var cuarto = ['e', 'f', 'f', 'h'];

function concat(a, b) {
    return [...a, ...b];
}
function concatOtro(...arrays) {
    let resultado = [];
    for (const array of arrays) {
        resultado.push(...array);
      }
    return resultado;
}
console.log(concat(primero, segundo));
console.log(concatOtro(primero, segundo,tercero,cuarto));
