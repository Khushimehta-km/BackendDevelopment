// ================================
// Experiment 05
// JavaScript Arrays, Objects & Functions
// ================================

// 1. Arrays
const fruits = ['Apple', 'Banana', 'Mango'];

console.log('--- Array Demonstration ---');
console.log('Fruits array:', fruits);

fruits.push('Orange');
console.log('After push:', fruits);


// 2. Objects
const student = {
    name: 'John Doe',
    age: 20,
    course: 'Backend Development'
};

console.log('\n--- Object Demonstration ---');
console.log('Student object:', student);
console.log('Student Name:', student.name);


// 3. Functions
function greet(name) {
    return `Hello, ${name}! Welcome to Backend Development Lab.`;
}

console.log('\n--- Function Demonstration ---');
console.log(greet('Student'));


// ================================
// PBL Activity - Library Management
// ================================

const library = [];

function addBook(title, author) {
    const book = {
        title: title,
        author: author
    };

    library.push(book);
}

function findBook(title) {
    return library.find(book => book.title === title);
}


// Testing PBL functions
console.log('\n--- Library Management ---');

addBook('The Alchemist', 'Paulo Coelho');
addBook('Atomic Habits', 'James Clear');
addBook('Clean Code', 'Robert C. Martin');

console.log('Library:', library);

console.log('Finding Atomic Habits:');
console.log(findBook('Atomic Habits'));

console.log('Finding JavaScript:');
console.log(findBook('JavaScript'));