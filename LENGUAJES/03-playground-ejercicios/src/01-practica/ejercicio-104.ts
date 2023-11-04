console.log("************** PRACTICE 104 *********************");
console.log("Apartado A - Implementa una función clone que devuelva un objeto clonado a partir de otro:");
console.log("Apartado B - Dados dos objetos cualesquiera, implementa una función merge que mezcle uno sobre otro. El objeto resultante debe ser la mezcla de las propiedades del objeto source sobre las del objeto target");

var c = { name: "Maria", surname: "Ibañez", country: "SPA" };
  var d = { name: "Luisa", age: 31, married: true };
function clone2(source1,source2) {
    let clone = {...source1,...source2}
    return clone;
  }

  function merge2(c,d) {
    let merge = clone2(c,d);
    return merge;
  }
  console.log(clone2(c,d));
  console.log(merge2(c,d));