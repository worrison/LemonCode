console.log("************** DELIVERABLE 04 *********************");
console.log("Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false");
const books: { title: string; isRead: boolean; }[] = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
];

function isBookRead(books: { title: string; isRead: boolean; }[], titleToSearch: string) {
    return books.some((book) => book.title === titleToSearch && book.isRead === true);
}

console.log(isBookRead(books, "Devastación")); 
console.log(isBookRead(books, "Canción de hielo y fuego"));
console.log(isBookRead(books, "Los Pilares de la Tierra")); 
