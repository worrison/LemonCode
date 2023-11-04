console.log("************** PRACTICE 103 *********************");
console.log("Check Arguments");

 function f(input= "Unknown"){
  return input ?? "";
 }  
console.log(f("Hello"));
