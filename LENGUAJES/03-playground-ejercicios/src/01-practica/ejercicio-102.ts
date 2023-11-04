console.log("************** PRACTICE 102 *********************");
console.log(
  "Dada la calificación de alumnos de una clase en forma de objeto Implementa una función que muestre la media de la clase de forma textual:"
);

const eso2o = {
  David: 8.25,
  Maria: 9.5,
  Jose: 6.75,
  Juan: 5.5,
  Blanca: 7.75,
  Carmen: 8,
};

function getAverage(eso2onotes) {
  //obtenemos las notas del objeto
  let notes: number[] = Object.values(eso2onotes);
  let sum: number = notes.reduce(
    (acumulator, current) => acumulator + current,
    0
  );
  let avg: number = sum / notes.length;;
  printAverage(avg);
}

function printAverage(classResults) {
  console.log("La media de la clase es: " + classResults);
  if (classResults < 4) {
    console.log("Muy deficiente");
  } else if (classResults >= 4 && classResults < 5) {
    console.log("Insuficiente");
  } else if (classResults >= 5 && classResults < 6) {
    console.log("Suficiente");
  } else if (classResults >= 6 && classResults < 7) {
    console.log("Bien");
  } else if (classResults >= 7 && classResults < 9) {
    console.log("Notable");
  } else if (classResults >= 9 && classResults < 10) {
    console.log("Sobresaliente");
  } else if (classResults == 10) {
    console.log("Matrícula de Honor");
  } else {
    console.log("No has introducido un valor válido");
  }
}
getAverage(eso2o);
