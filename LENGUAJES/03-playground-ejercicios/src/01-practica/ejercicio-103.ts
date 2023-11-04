console.log("************** PRACTICE 103 *********************");
console.log("Check Arguments");

function f(input= "Unknown") {
  var result;
  return result = input ?? "";
}
console.log(f("Hello"));
