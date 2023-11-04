console.log("************** DELIVERABLE 03 *********************");
console.log("Implementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source");


const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

function clone(s1,s2) {
    let clone = {...s1,...s2}
    return clone;
  }

function merge(source,target) {
    return clone(target,source);
}

  console.log(clone(a,b));
  console.log("Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target.");
  console.log(merge(a,b));

  