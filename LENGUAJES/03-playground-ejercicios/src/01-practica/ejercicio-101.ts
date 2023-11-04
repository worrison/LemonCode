console.log("************** PRACTICE 101 *********************");
console.log(
  "Introduce una frase y devuelve la palabra más larga si hay varias con la misma longitud devolver la primera"
);

function biggestWord(phrase) {
  let longestWord = "";
  let strSplit = phrase.split(" ");

  strSplit.map((word) => {
    word.length > longestWord.length
      ? (longestWord = word)
      : (longestWord = longestWord);
  });
  return longestWord;
}

console.log(biggestWord("Buenos dias que tal estas?"));
