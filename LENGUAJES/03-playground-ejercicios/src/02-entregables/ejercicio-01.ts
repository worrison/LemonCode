console.log("************** DELIVERABLE 01 *********************");
console.log("Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring.");

const array= [1, 2, 3, 4, 5];

function head([elemento, ...resto]:any) {
    return elemento;
}

console.log(head(array));

console.log("Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator.");
function tail([, ...resto]:any) {
    return resto;
}
console.log(tail(array));

console.log("Implementa una función init (inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype.");
function init(array:any) {
    return array.slice(0, -1);
}
console.log(init(array));

console.log("Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento.");
function last(array:any) {
    return array.slice(-1);
}
console.log(last(array));